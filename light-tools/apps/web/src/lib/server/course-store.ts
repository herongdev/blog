import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { courseProducts, getCourseBySlug } from "@/lib/course-catalog";

export interface CourseUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

export interface CourseEntitlement {
  id: string;
  userId: string;
  courseSlug: string;
  source: "manual" | "order" | "system";
  orderId?: string;
  note?: string;
  grantedAt: string;
  expiresAt?: string;
}

export interface CourseOrder {
  id: string;
  userId: string;
  courseSlug: string;
  amountCents: number;
  currency: "CNY";
  status: "pending" | "paid" | "cancelled";
  provider: "manual" | "wechat" | "alipay" | "stripe";
  wechatCodeUrl?: string;
  wechatCodeUrlCreatedAt?: string;
  wechatPrepayId?: string;
  transactionId?: string;
  paidAt?: string;
  paymentError?: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseDatabase {
  users: CourseUser[];
  entitlements: CourseEntitlement[];
  orders: CourseOrder[];
}

export interface CourseAdminSummary {
  users: Array<Pick<CourseUser, "id" | "email" | "name" | "createdAt">>;
  entitlements: CourseEntitlement[];
  orders: CourseOrder[];
}

function getDataDir(): string {
  return process.env.LIGHT_TOOLS_DATA_DIR || path.join("/tmp", "light-tools-data");
}

function getDatabaseFile(): string {
  return path.join(getDataDir(), "course-access.json");
}

function emptyDatabase(): CourseDatabase {
  return {
    users: [],
    entitlements: [],
    orders: []
  };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")): { hash: string; salt: string } {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  const { hash } = hashPassword(password, salt);
  const left = Buffer.from(hash, "hex");
  const right = Buffer.from(expectedHash, "hex");

  return left.length === right.length && timingSafeEqual(left, right);
}

async function readDatabase(): Promise<CourseDatabase> {
  try {
    const raw = await readFile(getDatabaseFile(), "utf-8");
    const parsed = JSON.parse(raw) as Partial<CourseDatabase>;

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      entitlements: Array.isArray(parsed.entitlements) ? parsed.entitlements : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : []
    };
  } catch {
    return emptyDatabase();
  }
}

async function writeDatabase(database: CourseDatabase): Promise<void> {
  await mkdir(getDataDir(), { recursive: true });
  await writeFile(getDatabaseFile(), JSON.stringify(database, null, 2), "utf-8");
}

function publicUser(user: CourseUser): Pick<CourseUser, "id" | "email" | "name" | "createdAt"> {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  };
}

export async function registerCourseUser(input: {
  email: string;
  name?: string;
  password: string;
}): Promise<{ ok: true; user: CourseUser } | { ok: false; reason: "invalid" | "exists" }> {
  const email = normalizeEmail(input.email);
  const password = input.password.trim();
  if (!email.includes("@") || password.length < 8) return { ok: false, reason: "invalid" };

  const database = await readDatabase();
  if (database.users.some((user) => user.email === email)) return { ok: false, reason: "exists" };

  const { hash, salt } = hashPassword(password);
  const now = new Date().toISOString();
  const user: CourseUser = {
    id: crypto.randomUUID(),
    email,
    name: input.name?.trim() || email.split("@")[0] || "课程学员",
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: now
  };

  database.users.push(user);
  await writeDatabase(database);

  return { ok: true, user };
}

export async function verifyCourseUser(emailInput: string, password: string): Promise<CourseUser | undefined> {
  const email = normalizeEmail(emailInput);
  const database = await readDatabase();
  const user = database.users.find((entry) => entry.email === email);
  if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) return undefined;
  return user;
}

export async function getCourseUserById(userId: string | undefined): Promise<CourseUser | undefined> {
  if (!userId) return undefined;
  const database = await readDatabase();
  return database.users.find((user) => user.id === userId);
}

export async function hasCourseAccess(userId: string | undefined, courseSlug: string): Promise<boolean> {
  const course = getCourseBySlug(courseSlug);
  if (!course) return false;
  if (course.access === "free") return true;
  if (!userId) return false;

  const database = await readDatabase();
  const now = Date.now();
  return database.entitlements.some((entitlement) => {
    if (entitlement.userId !== userId || entitlement.courseSlug !== courseSlug) return false;
    if (!entitlement.expiresAt) return true;
    return new Date(entitlement.expiresAt).getTime() > now;
  });
}

export async function getUserCourseDashboard(userId: string): Promise<{
  user: Pick<CourseUser, "id" | "email" | "name" | "createdAt"> | undefined;
  entitlements: CourseEntitlement[];
  orders: CourseOrder[];
}> {
  const database = await readDatabase();
  const user = database.users.find((entry) => entry.id === userId);

  return {
    user: user ? publicUser(user) : undefined,
    entitlements: database.entitlements.filter((entry) => entry.userId === userId),
    orders: database.orders.filter((entry) => entry.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  };
}

export async function createCourseOrder(
  userId: string,
  courseSlug: string,
  provider: CourseOrder["provider"] = "manual"
): Promise<CourseOrder | undefined> {
  const course = getCourseBySlug(courseSlug);
  if (!course || course.access !== "paid") return undefined;

  const database = await readDatabase();
  if (!database.users.some((user) => user.id === userId)) return undefined;

  const now = new Date().toISOString();
  const order: CourseOrder = {
    id: crypto.randomUUID(),
    userId,
    courseSlug,
    amountCents: course.priceCents,
    currency: course.currency,
    status: "pending",
    provider,
    createdAt: now,
    updatedAt: now
  };

  database.orders.push(order);
  await writeDatabase(database);

  return order;
}

export async function getCourseOrder(userId: string, orderId: string): Promise<CourseOrder | undefined> {
  const database = await readDatabase();
  return database.orders.find((order) => order.id === orderId && order.userId === userId);
}

export async function getCourseOrderById(orderId: string): Promise<CourseOrder | undefined> {
  const database = await readDatabase();
  return database.orders.find((order) => order.id === orderId);
}

export async function attachWechatNativePayment(input: {
  orderId: string;
  codeUrl: string;
  prepayId?: string;
}): Promise<CourseOrder | undefined> {
  const database = await readDatabase();
  const order = database.orders.find((entry) => entry.id === input.orderId);
  if (!order || order.status !== "pending") return order;

  const now = new Date().toISOString();
  order.provider = "wechat";
  order.wechatCodeUrl = input.codeUrl;
  order.wechatCodeUrlCreatedAt = now;
  order.wechatPrepayId = input.prepayId;
  order.paymentError = undefined;
  order.updatedAt = now;

  await writeDatabase(database);
  return order;
}

export async function setCourseOrderPaymentError(orderId: string, message: string): Promise<void> {
  const database = await readDatabase();
  const order = database.orders.find((entry) => entry.id === orderId);
  if (!order) return;

  order.paymentError = message.slice(0, 240);
  order.updatedAt = new Date().toISOString();
  await writeDatabase(database);
}

export async function markCourseOrderPaid(input: {
  orderId: string;
  provider: CourseOrder["provider"];
  transactionId?: string;
}): Promise<{ ok: true; order: CourseOrder } | { ok: false; reason: "missing_order" | "missing_course" }> {
  const database = await readDatabase();
  const order = database.orders.find((entry) => entry.id === input.orderId);
  if (!order) return { ok: false, reason: "missing_order" };

  const course = getCourseBySlug(order.courseSlug);
  if (!course) return { ok: false, reason: "missing_course" };

  const now = new Date().toISOString();
  order.status = "paid";
  order.provider = input.provider;
  order.transactionId = input.transactionId || order.transactionId;
  order.paidAt = order.paidAt || now;
  order.paymentError = undefined;
  order.updatedAt = now;

  const existing = database.entitlements.find(
    (entry) => entry.userId === order.userId && entry.courseSlug === order.courseSlug
  );

  if (!existing) {
    database.entitlements.push({
      id: crypto.randomUUID(),
      userId: order.userId,
      courseSlug: order.courseSlug,
      source: "order",
      orderId: order.id,
      note: `${input.provider} paid`,
      grantedAt: now
    });
  }

  await writeDatabase(database);
  return { ok: true, order };
}

export async function grantCourseAccessByEmail(input: {
  email: string;
  courseSlug: string;
  note?: string;
  orderId?: string;
}): Promise<{ ok: true; entitlement: CourseEntitlement } | { ok: false; reason: "missing_user" | "missing_course" }> {
  const email = normalizeEmail(input.email);
  const course = getCourseBySlug(input.courseSlug);
  if (!course) return { ok: false, reason: "missing_course" };

  const database = await readDatabase();
  const user = database.users.find((entry) => entry.email === email);
  if (!user) return { ok: false, reason: "missing_user" };

  const existing = database.entitlements.find(
    (entry) => entry.userId === user.id && entry.courseSlug === input.courseSlug
  );

  if (existing) {
    existing.note = input.note?.trim() || existing.note;
    existing.orderId = input.orderId?.trim() || existing.orderId;
    if (input.orderId) {
      const order = database.orders.find((entry) => entry.id === input.orderId);
      if (order) {
        order.status = "paid";
        order.updatedAt = new Date().toISOString();
      }
    }
    await writeDatabase(database);
    return { ok: true, entitlement: existing };
  }

  const now = new Date().toISOString();
  const entitlement: CourseEntitlement = {
    id: crypto.randomUUID(),
    userId: user.id,
    courseSlug: input.courseSlug,
    source: "manual",
    orderId: input.orderId?.trim() || undefined,
    note: input.note?.trim() || undefined,
    grantedAt: now
  };

  database.entitlements.push(entitlement);

  if (input.orderId) {
    const order = database.orders.find((entry) => entry.id === input.orderId);
    if (order) {
      order.status = "paid";
      order.updatedAt = now;
    }
  }

  await writeDatabase(database);
  return { ok: true, entitlement };
}

export async function getCourseAdminSummary(): Promise<CourseAdminSummary> {
  const database = await readDatabase();

  return {
    users: database.users.map(publicUser).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    entitlements: database.entitlements.slice().sort((a, b) => b.grantedAt.localeCompare(a.grantedAt)),
    orders: database.orders.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  };
}

export function getCourseTitle(courseSlug: string): string {
  return getCourseBySlug(courseSlug)?.title || courseSlug;
}

export function getPaidCourses() {
  return courseProducts.filter((course) => course.access === "paid");
}
