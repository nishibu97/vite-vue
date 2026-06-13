// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(),  // URL: /todos のようなパス形式
  routes: [
    { path: '/', redirect: '/todos' },
    { path: '/todos', name: 'todos', component: TodoView },
  ],
})

export default router
