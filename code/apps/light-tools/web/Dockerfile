ARG NODE_IMAGE=docker.m.daocloud.io/library/node:20-bookworm-slim

FROM ${NODE_IMAGE} AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/light-tools/web/package.json apps/light-tools/web/package.json
COPY apps/light-tools/worker/package.json apps/light-tools/worker/package.json
COPY packages/light-tools/file-core/package.json packages/light-tools/file-core/package.json
COPY packages/light-tools/shared/package.json packages/light-tools/shared/package.json

RUN pnpm install --frozen-lockfile --filter @light-tools/web...

FROM deps AS build

ARG NEXT_PUBLIC_BASE_PATH=
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000

ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY . .

RUN pnpm --filter @light-tools/web build

FROM ${NODE_IMAGE} AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV LIGHT_TOOLS_FFMPEG_PATH=/usr/bin/ffmpeg

WORKDIR /app

RUN if [ -f /etc/apt/sources.list.d/debian.sources ]; then \
    sed -i \
      -e 's|http://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
      -e 's|https://mirrors.aliyun.com/debian|http://mirrors.aliyun.com/debian|g' \
      -e 's|http://deb.debian.org/debian-security|http://mirrors.aliyun.com/debian-security|g' \
      /etc/apt/sources.list.d/debian.sources; \
  fi \
  && apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates ffmpeg \
  && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/apps/light-tools/web/.next/standalone ./
COPY --from=build /app/apps/light-tools/web/.next/static ./apps/light-tools/web/.next/static

EXPOSE 3000

CMD ["node", "apps/light-tools/web/server.js"]
