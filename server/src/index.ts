import { OpenAPIHono } from "@hono/zod-openapi";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import userController from "./interface/user.controller";
import authController from "./interface/auth.controller";

const app = new OpenAPIHono();

// ミドルウェア設定
app.use("*", prettyJSON());
app.use("/*", cors({ origin: "http://localhost:5173" }));

// OpenAPI仕様書エンドポイント
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Hono REST API",
    version: "1.0.0",
    description: "レイヤードアーキテクチャを採用したREST API",
  },
});

// Swagger UIエンドポイント
app.get("/ui", swaggerUI({ url: "/doc" }));

// ヘルスチェックエンドポイント
app.get("/health", (c) => {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    version: "1.0.0",
    checks: {
      api: "ok",
    },
  };

  return c.json(healthCheck, 200);
});

// APIルート
app.route("/auth", authController);
app.route("/users", userController);

const port = process.env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};

console.log(`Server is running on http://localhost:${port}`);
console.log(`API Docs (Swagger UI): http://localhost:${port}/ui`);
console.log(`OpenAPI Spec (JSON): http://localhost:${port}/doc`);
console.log(`Health Check: http://localhost:${port}/health`);
