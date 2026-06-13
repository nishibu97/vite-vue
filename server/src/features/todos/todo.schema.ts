import { z, createRoute } from "@hono/zod-openapi";

export const TodoSchema = z.object({
  id: z.string().openapi({ example: "1" }),
  title: z.string().openapi({ example: "Vue.jsを学ぶ" }),
  completed: z.boolean().openapi({ example: false }),
  createdAt: z.string().openapi({ example: "2024-01-01T10:00:00Z" }),
});

export const ErrorResponseSchema = z.object({
  success: z.boolean().openapi({ example: false }),
  message: z.string().openapi({ example: "Todo not found" }),
});

export const TodoListResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  count: z.number().openapi({ example: 3 }),
  todos: z.array(TodoSchema),
});

export const CreateTodoRequestSchema = z.object({
  title: z.string().min(1).openapi({ example: "新しいタスク" }),
});

export const CreateTodoResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  todo: TodoSchema,
});

export const UpdateTodoRequestSchema = z.object({
  title: z.string().min(1).optional().openapi({ example: "更新後タイトル" }),
  completed: z.boolean().optional().openapi({ example: true }),
});

export const UpdateTodoResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  todo: TodoSchema,
});

export const DeleteTodoResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  message: z.string().openapi({ example: "Todo deleted" }),
});

export const TodoIdParamSchema = z.object({
  id: z.string().openapi({ param: { name: "id", in: "path" }, example: "1" }),
});

export const listTodosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Todos"],
  summary: "TODO一覧取得",
  description: "ハードコードされたモックデータのTODO一覧を返します",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TodoListResponseSchema,
        },
      },
      description: "一覧取得成功",
    },
  },
});

export const createTodoRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Todos"],
  summary: "TODO追加",
  description: "新しいTODOを作成します（モックのため永続化されません）",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateTodoRequestSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: CreateTodoResponseSchema,
        },
      },
      description: "作成成功",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "バリデーションエラー",
    },
  },
});

export const updateTodoRoute = createRoute({
  method: "put",
  path: "/{id}",
  tags: ["Todos"],
  summary: "TODO更新",
  description: "指定IDのTODOを更新します（モックのため永続化されません）",
  request: {
    params: TodoIdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateTodoRequestSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UpdateTodoResponseSchema,
        },
      },
      description: "更新成功",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "TODOが見つかりません",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "バリデーションエラー",
    },
  },
});

export const deleteTodoRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["Todos"],
  summary: "TODO削除",
  description: "指定IDのTODOを削除します（モックのため永続化されません）",
  request: {
    params: TodoIdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteTodoResponseSchema,
        },
      },
      description: "削除成功",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "TODOが見つかりません",
    },
  },
});
