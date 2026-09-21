import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { resolve } from "node:path";
import { AppModule } from "./app.module";
import type { ChatModuleOptions } from "./chat/chat.module";
import { ApiExceptionFilter } from "./http/api-exception.filter";
import { apiBoundary } from "./http/api.middleware";
import { readRuntimeConfig } from "./common/runtime-config";
import {
  requestDiagnostics,
  type RequestLogger,
} from "./http/request-diagnostics";

export interface AppOptions extends ChatModuleOptions {
  staticRoot?: string;
  requestLogger?: RequestLogger;
}

export async function createApp(options: AppOptions = {}) {
  const runtime = readRuntimeConfig(options.env);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register({
      ...options,
      chatTimeoutMs: options.chatTimeoutMs ?? runtime.chatTimeoutMs,
      maxActiveGenerations:
        options.maxActiveGenerations ?? runtime.maxActiveGenerations,
    }),
    {
      bodyParser: false,
      logger: false,
      abortOnError: false,
      forceCloseConnections: true,
    },
  );
  app.disable("x-powered-by");
  app.setGlobalPrefix("/api");
  app.use("/api", requestDiagnostics(options.requestLogger));
  app.use("/api", apiBoundary(runtime.origin));
  app.use(express.json({ limit: "20mb" }));
  app.useGlobalFilters(new ApiExceptionFilter());
  if (options.staticRoot) {
    const staticRoot = resolve(options.staticRoot);
    app.useStaticAssets(staticRoot);
    app.use((request: Request, response: Response, next: NextFunction) => {
      if (
        request.method === "GET" &&
        request.path !== "/api" &&
        !request.path.startsWith("/api/")
      ) {
        response.sendFile(resolve(staticRoot, "index.html"));
        return;
      }
      next();
    });
  }
  await app.init();
  return app;
}
