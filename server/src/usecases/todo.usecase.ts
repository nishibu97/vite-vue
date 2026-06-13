import { todoRepository } from "../infrastructure/repositories/todo.repository";
import type { Todo } from "../domain/models/todo.model";

export class TodoNotFoundError extends Error {
  constructor(id: string) {
    super(`Todo not found: ${id}`);
    this.name = "TodoNotFoundError";
  }
}

export const todoUseCase = {
  getTodos: async (): Promise<Todo[]> => {
    return todoRepository.findAll();
  },

  createTodo: async (title: string): Promise<Todo> => {
    return {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
  },

  updateTodo: async (
    id: string,
    input: { title?: string; completed?: boolean },
  ): Promise<Todo> => {
    const existing = await todoRepository.findById(id);
    if (!existing) {
      throw new TodoNotFoundError(id);
    }

    return {
      ...existing,
      ...(input.title !== undefined && { title: input.title }),
      ...(input.completed !== undefined && { completed: input.completed }),
    };
  },

  deleteTodo: async (id: string): Promise<void> => {
    const existing = await todoRepository.findById(id);
    if (!existing) {
      throw new TodoNotFoundError(id);
    }
  },
};
