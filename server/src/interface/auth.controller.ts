import { OpenAPIHono } from "@hono/zod-openapi";
import { authUseCase } from "../usecases/auth.usecase";
import { loginRoute } from "../features/auth/auth.schema";

const app = new OpenAPIHono();

// POST /auth/login
app.openapi(loginRoute, async (c) => {
  try {
    // スキーマで検証済みのデータを取得
    const { email, password } = c.req.valid("json");

    // ログイン処理を実行
    const token = await authUseCase.login(email, password);

    // 成功レスポンス（スキーマに準拠）
    return c.json(
      {
        success: true,
        token: token,
      },
      200,
    );
  } catch (e) {
    // 認証失敗レスポンス
    const errorMessage =
      e instanceof Error ? e.message : "Authentication failed";

    return c.json(
      {
        success: false,
        message: errorMessage,
      },
      401,
    );
  }
});

export default app;
