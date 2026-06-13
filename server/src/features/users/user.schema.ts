import { z, createRoute } from "@hono/zod-openapi";

export const UserSchema = z.object({
  id: z.string().openapi({ example: "1" }),
  name: z.string().openapi({ example: "山田 太郎" }),
  kana: z.string().openapi({ example: "ヤマダ タロウ" }),
  email: z.string().email().openapi({ example: "taro@example.com" }),
  password: z.string().openapi({ example: "**********" }),
  createdAt: z.string().openapi({ example: "2024-01-01T10:00:00.000Z" }),
});

export const UserListResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  count: z.number().openapi({ example: 2 }),
  users: z.array(UserSchema),
});

export const listUsersRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Users"],
  summary: "ユーザー一覧取得",
  description:
    "削除されていないユーザーの一覧を返します（パスワードはマスクされます）",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserListResponseSchema,
        },
      },
      description: "一覧取得成功",
    },
  },
});
