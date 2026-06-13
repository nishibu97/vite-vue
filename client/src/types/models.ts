// src/types/models.ts
import type { components } from './api'

export type Todo = components['schemas']['TodoSchema']
export type TodoListResponse = components['schemas']['TodoListResponseSchema']
export type User = components['schemas']['UserSchema']