<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="p-8">
    <h1 class="text-2xl font-bold">Home</h1>
    <RouterLink
      to="/todos"
      class="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
    >
      TODO 画面へ
    </RouterLink>
  </main>
</template>