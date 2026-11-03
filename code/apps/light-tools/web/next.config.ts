import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  basePath,
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../../"),
  serverExternalPackages: ["ffmpeg-static"],
  transpilePackages: ["@light-tools/shared", "@herong/site-chrome"],
  async headers() {
    return process.env.PUBLIC_NOINDEX === "true"
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }]
      : [];
  }
};

export default nextConfig;
