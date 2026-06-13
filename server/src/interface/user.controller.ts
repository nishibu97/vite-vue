import { OpenAPIHono } from "@hono/zod-openapi";
import { listUsersRoute } from "../features/users/user.schema";
import { userUseCase } from "../usecases/user.usecase";

const app = new OpenAPIHono();

// GET /users
app.openapi(listUsersRoute, async (c) => {
  const users = await userUseCase.getUsers();

  const safeUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    kana: user.kana,
    email: user.email,
    password: "**********",
    createdAt: user.createdAt.toISOString(),
  }));

  return c.json(
    {
      success: true,
      count: safeUsers.length,
      users: safeUsers,
    },
    200,
  );
});

export default app;
