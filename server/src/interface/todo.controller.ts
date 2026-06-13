import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createTodoRoute,
  deleteTodoRoute,
  listTodosRoute,
  updateTodoRoute,
} from "../features/todos/todo.schema";
import { TodoNotFoundError, todoUseCase } from "../usecases/todo.usecase";

const app = new OpenAPIHono();

// GET /todos
app.openapi(listTodosRoute, async (c) => {
  const todos = await todoUseCase.getTodos();

  return c.json(
    {
      success: true,
      count: todos.length,
      todos,
    },
    200,
  );
});

// POST /todos
app.openapi(createTodoRoute, async (c) => {
  const { title } = c.req.valid("json");
  const todo = await todoUseCase.createTodo(title);

  return c.json(
    {
      success: true,
      todo,
    },
    201,
  );
});

// PUT /todos/:id
app.openapi(updateTodoRoute, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const todo = await todoUseCase.updateTodo(id, body);

    return c.json(
      {
        success: true,
        todo,
      },
      200,
    );
  } catch (e) {
    if (e instanceof TodoNotFoundError) {
      return c.json({ success: false, message: "Todo not found" }, 404);
    }

    throw e;
  }
});

// DELETE /todos/:id
app.openapi(deleteTodoRoute, async (c) => {
  try {
    const { id } = c.req.valid("param");
    await todoUseCase.deleteTodo(id);

    return c.json(
      {
        success: true,
        message: "Todo deleted",
      },
      200,
    );
  } catch (e) {
    if (e instanceof TodoNotFoundError) {
      return c.json({ success: false, message: "Todo not found" }, 404);
    }

    throw e;
  }
});

export default app;
