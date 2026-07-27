#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const readArg = (name, fallback = null) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};

const codexHome = path.resolve(
  readArg("--codex-home", path.join(os.homedir(), ".codex")),
);
const sourceDir = path.resolve(readArg("--source-dir", codexHome));
const shouldApply = args.includes("--apply");
const targetPath = path.join(codexHome, ".codex-global-state.json");

const loadJson = (filePath) => {
  try { 
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
};

const countProjects = (state) =>
  Object.keys(state?.["local-projects"] ?? {}).length;
const countAssignments = (state) =>
  Object.keys(state?.["thread-project-assignments"] ?? {}).length;
const normalizeRoot = (project) =>
  path.resolve(project?.rootPaths?.[0] ?? "");

const collectCandidates = (directory) => {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter(
      (name) =>
        name === ".codex-global-state.json" ||
        name === ".codex-global-state.json.bak" ||
        name.includes("codex-global-state") ||
        name.includes("global-state"),
    )
    .map((name) => path.join(directory, name))
    .filter((filePath) => fs.statSync(filePath).isFile())
    .map((filePath) => ({
      filePath,
      state: loadJson(filePath),
      mtimeMs: fs.statSync(filePath).mtimeMs,
    }))
    .filter(({ state }) => state && typeof state === "object");
};

const candidates = [
  ...collectCandidates(codexHome),
  ...(sourceDir === codexHome ? [] : collectCandidates(sourceDir)),
].sort(
  (a, b) =>
    countProjects(b.state) - countProjects(a.state) ||
    countAssignments(b.state) - countAssignments(a.state) ||
    b.mtimeMs - a.mtimeMs,
);

const current = loadJson(targetPath);
if (!current) {
  throw new Error(`无法读取当前状态文件：${targetPath}`);
}
if (candidates.length === 0) {
  throw new Error("没有找到可读取的全局状态快照。");
}

const source = candidates[0];
const sourceProjects = source.state["local-projects"] ?? {};
const currentProjects = current["local-projects"] ?? {};

if (
  countProjects(source.state) <= countProjects(current) &&
  countAssignments(source.state) <= countAssignments(current)
) {
  console.log(
    JSON.stringify(
      {
        applied: false,
        message: "当前项目数量不少于最佳快照，没有执行写入。",
        currentProjects: countProjects(current),
        bestSnapshotProjects: countProjects(source.state),
        bestSnapshot: source.filePath,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const currentIdByRoot = new Map(
  Object.entries(currentProjects).map(([id, project]) => [
    normalizeRoot(project),
    id,
  ]),
);
const idAliases = new Map();
const mergedProjects = {};
const mergedOrder = [];

for (const sourceId of source.state["project-order"] ??
  Object.keys(sourceProjects)) {
  const project = sourceProjects[sourceId];
  if (!project) continue;

  const currentId = currentIdByRoot.get(normalizeRoot(project));
  const canonicalId = currentId ?? sourceId;
  idAliases.set(sourceId, canonicalId);

  mergedProjects[canonicalId] = currentId
    ? { ...project, ...currentProjects[currentId], id: canonicalId }
    : project;
  if (!mergedOrder.includes(canonicalId)) mergedOrder.push(canonicalId);
}

for (const [currentId, project] of Object.entries(currentProjects)) {
  const alreadyPresent = mergedOrder.some(
    (id) => normalizeRoot(mergedProjects[id]) === normalizeRoot(project),
  );
  if (alreadyPresent) continue;
  mergedProjects[currentId] = project;
  mergedOrder.push(currentId);
}

const rewriteAssignment = (assignment) => {
  if (!assignment || assignment.projectKind !== "local") return assignment;
  const canonicalId = idAliases.get(assignment.projectId);
  return canonicalId ? { ...assignment, projectId: canonicalId } : assignment;
};

const mergedAssignments = {};
for (const [threadId, assignment] of Object.entries(
  source.state["thread-project-assignments"] ?? {},
)) {
  mergedAssignments[threadId] = rewriteAssignment(assignment);
}
for (const [threadId, assignment] of Object.entries(
  current["thread-project-assignments"] ?? {},
)) {
  mergedAssignments[threadId] = rewriteAssignment(assignment);
}

const mergeObject = (oldValue, newValue) => ({
  ...(oldValue ?? {}),
  ...(newValue ?? {}),
});
const mergeUnique = (oldValue, newValue) => [
  ...new Set([...(oldValue ?? []), ...(newValue ?? [])]),
];

const merged = {
  ...current,
  "local-projects": mergedProjects,
  "project-order": mergedOrder,
  "thread-project-assignments": mergedAssignments,
  "thread-writable-roots": mergeObject(
    source.state["thread-writable-roots"],
    current["thread-writable-roots"],
  ),
  "thread-workspace-root-hints": mergeObject(
    source.state["thread-workspace-root-hints"],
    current["thread-workspace-root-hints"],
  ),
  "thread-projectless-output-directories": mergeObject(
    source.state["thread-projectless-output-directories"],
    current["thread-projectless-output-directories"],
  ),
  "projectless-thread-ids": mergeUnique(
    source.state["projectless-thread-ids"],
    current["projectless-thread-ids"],
  ),
};

const report = {
  applied: false,
  codexHome,
  sourceSnapshot: source.filePath,
  before: {
    projects: countProjects(current),
    assignments: countAssignments(current),
  },
  after: {
    projects: countProjects(merged),
    assignments: countAssignments(merged),
  },
  projects: mergedOrder.map((id) => {
    const project = mergedProjects[id];
    const rootPath = project.rootPaths?.[0] ?? null;
    return {
      name: project.name,
      rootPath,
      directoryExists: rootPath ? fs.existsSync(rootPath) : false,
    };
  }),
};

if (!shouldApply) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const appNames = ["ChatGPT", "Codex"];
for (const appName of appNames) {
  try {
    execFileSync("/usr/bin/pgrep", ["-x", appName], { stdio: "ignore" });
    throw new Error(
      `${appName} 仍在运行。请先按 Command+Q 完全退出应用，再执行 --apply。`,
    );
  } catch (error) {
    if (error?.status === 0 || !("status" in error)) throw error;
  }
}

const stamp = new Date().toISOString().replaceAll(/[:.]/g, "-");
const backupDir = path.join(
  os.homedir(),
  "codex-recovery-backups",
  stamp,
);
fs.mkdirSync(backupDir, { recursive: true, mode: 0o700 });
fs.copyFileSync(
  targetPath,
  path.join(backupDir, ".codex-global-state.before-restore.json"),
);

const previewPath = path.join(backupDir, "merged-global-state.preview.json");
fs.writeFileSync(previewPath, `${JSON.stringify(merged)}\n`, { mode: 0o600 });

const temporaryTarget = `${targetPath}.recovery-${process.pid}.tmp`;
fs.writeFileSync(temporaryTarget, `${JSON.stringify(merged)}\n`, {
  mode: 0o600,
});
fs.renameSync(temporaryTarget, targetPath);
fs.copyFileSync(targetPath, `${targetPath}.bak`);

report.applied = true;
report.backupDir = backupDir;
console.log(JSON.stringify(report, null, 2));
