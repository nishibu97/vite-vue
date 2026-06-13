import { Hono } from "hono";
import { userUseCase } from "../usecases/user.usecase";

const app = new Hono();

// GET /users
app.get("/", async (c) => {
  try {
    const users = await userUseCase.getUsers();

    // パスワードを ********** にマスク
    const safeUsers = users.map((user) => ({
      ...user,
      password: "**********",
    }));

    return c.json({
      success: true,
      count: users.length,
      users: safeUsers,
    });
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
});

export default app;
