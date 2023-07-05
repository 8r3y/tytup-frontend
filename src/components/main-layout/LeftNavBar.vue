<template>
  <div class="left-nav-bar__wrapper">
    <nav>
      <RouterLink to="/recomendations">Рекомендованные видео</RouterLink>
      <RouterLink to="/my-videos">Мои видео</RouterLink>
      <RouterLink v-if="!authStore.isAuth" to="/login">Авторизоваться</RouterLink>
      <RouterLink v-else to="/my-profile">Мой профиль</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
.left-nav-bar {
  &__wrapper {
    width: 200px;
    background-color: lightgreen;
    display: flex;
    height: 100%;
  }
}
</style>
