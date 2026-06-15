import { withBasePath } from "@/lib/base-path";
import { registerCourseUser } from "@/lib/server/course-store";
import { buildMemberSessionCookie } from "@/lib/server/member-auth";

export const runtime = "nodejs";

function safeRedirectTo(value: FormDataEntryValue | null): string {
  const text = String(value ?? "");
  if (!text || !text.startsWith("/") || text.startsWith("//")) return "/courses/me";
  return text;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const redirectTo = safeRedirectTo(formData.get("redirectTo"));
  const result = await registerCourseUser({
    email: String(formData.get("email") ?? ""),
    name: String(formData.get("name") ?? ""),
    password: String(formData.get("password") ?? "")
  });

  if (!result.ok) {
    const error = result.reason === "exists" ? "exists" : "weak";
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/login?error=${error}&redirectTo=${encodeURIComponent(redirectTo)}`)
      }
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: withBasePath(redirectTo),
      "Set-Cookie": buildMemberSessionCookie(result.user.id)
    }
  });
}
