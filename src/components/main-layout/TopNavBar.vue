<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <div class="top-nav-bar__wrapper">
    <div v-if="authStore.isAuth">Пользователь авторизован</div>
    <div v-else><RouterLink to="/login">Авторизоваться</RouterLink></div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.top-nav-bar {
  &__wrapper {
    width: 100%;
    height: 40px;
    background-color: lightsalmon;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
  }
}
</style>
