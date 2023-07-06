<script setup lang="ts">
import router from '@/router'
import { useAuthStore, useCounterStore } from '@/stores'

const authStore = useAuthStore()
const counterStore = useCounterStore()

const onTopClickHandler = () => {
  router.push('/')
}
</script>

<template>
  <div class="top-nav-bar__wrapper">
    <div @click="onTopClickHandler" class="navbar-navigator">
      TopNavBar Counter {{ counterStore.counter }}
    </div>
    <div v-if="authStore.isAuth">
      <RouterLink to="/upload-video">Загрузить видео</RouterLink>
    </div>
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
.navbar-navigator {
  cursor: pointer;
}
</style>
