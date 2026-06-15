import { withBasePath } from "@/lib/base-path";
import { verifyCourseUser } from "@/lib/server/course-store";
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
  const user = await verifyCourseUser(
    String(formData.get("email") ?? ""),
    String(formData.get("password") ?? "")
  );

  if (!user) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: withBasePath(`/courses/login?error=invalid&redirectTo=${encodeURIComponent(redirectTo)}`)
      }
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: withBasePath(redirectTo),
      "Set-Cookie": buildMemberSessionCookie(user.id)
    }
  });
}
