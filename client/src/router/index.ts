// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(), // URL: /todos のようなパス形式
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/todos', name: 'todos', component: TodoView },
  ],
})

export default router
