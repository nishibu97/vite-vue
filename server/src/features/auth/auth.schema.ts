import { z, createRoute } from "@hono/zod-openapi";

// 1. 入力パラメータのスキーマ (Zod)
export const LoginRequestSchema = z.object({
  email: z.string().email().openapi({ example: "taro@example.com" }),
  password: z.string().min(8).openapi({ example: "password123" }),
});

// 2. 成功レスポンスのスキーマ
export const LoginResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  token: z.string().openapi({
    description: "JWT Access Token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  }),
});

// 3. エラーレスポンスのスキーマ
export const ErrorResponseSchema = z.object({
  success: z.boolean().openapi({ example: false }),
  message: z.string().openapi({ example: "Authentication failed" }),
});

// 4. ルート定義 (これがSwaggerドキュメントになる)
export const loginRoute = createRoute({
  method: "post",
  path: "/login",
  tags: ["Auth"],
  summary: "ユーザーログイン",
  description: "Emailとパスワードでログインし、JWTトークンを発行します",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginRequestSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LoginResponseSchema,
        },
      },
      description: "ログイン成功",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "認証失敗 - メールアドレスまたはパスワードが間違っています",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "バリデーションエラー - 入力形式が正しくありません",
    },
  },
});
