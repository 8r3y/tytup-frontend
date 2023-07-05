<script setup lang="ts">
import { useAuthStore, useCounterStore } from '@/stores'

const authStore = useAuthStore()
const counterStore = useCounterStore()
</script>

<template>
  <div class="top-nav-bar__wrapper">
    <div @click="counterStore.incrementCounter">TopNavBar {{ counterStore.counter }}</div>
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
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
