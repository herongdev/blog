# Pin the multi-platform index; update deliberately and rerun container acceptance.
ARG NODE_IMAGE=node:22-bookworm-slim@sha256:83f487e0a63425e5b4d146fb5e5be574bcbe1b7b843d3ebafdd95eaf7767a7e5
FROM ${NODE_IMAGE} AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build && npm prune --omit=dev --no-audit --no-fund

FROM ${NODE_IMAGE} AS runtime
WORKDIR /app
ENV NODE_ENV=production PORT=3001 APP_BIND_ADDRESS=0.0.0.0
ARG APP_REVISION=unknown
LABEL org.opencontainers.image.title="Zhixu AI Chat" \
      org.opencontainers.image.revision=$APP_REVISION
COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY third_party/README.md ./licenses/README.md
COPY third_party/eventsource-parser/LICENSE ./licenses/eventsource-parser/LICENSE
COPY third_party/remend/LICENSE third_party/remend/LICENSE-2.0.txt ./licenses/remend/
COPY third_party/use-stick-to-bottom/LICENSE.txt ./licenses/use-stick-to-bottom/LICENSE.txt
USER node
EXPOSE 3001
HEALTHCHECK --interval=15s --timeout=3s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/healthz',{signal:AbortSignal.timeout(2000)}).then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "dist/server/index.js", "--production"]
