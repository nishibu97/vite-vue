import type { Todo } from "../../domain/models/todo.model";

const MOCK_TODOS: Todo[] = [
  {
    id: "1",
    title: "Vue.jsを学ぶ",
    completed: false,
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Piniaで状態管理",
    completed: true,
    createdAt: "2024-01-02T10:00:00Z",
  },
  {
    id: "3",
    title: "Hono APIと通信",
    completed: false,
    createdAt: "2024-01-03T10:00:00Z",
  },
];

export const todoRepository = {
  findAll: async (): Promise<Todo[]> => {
    return MOCK_TODOS;
  },

  findById: async (id: string): Promise<Todo | undefined> => {
    return MOCK_TODOS.find((todo) => todo.id === id);
  },
};
