<script setup lang="ts">
// import { ref } from 'vue'
import LeftNavBar from './LeftNavBar.vue'
import TopNavBar from './TopNavBar.vue'

import { useCounterStore } from '@/stores'

// const count = ref(0)
// console.log('hello script setup')

// setInterval(() => {
//   count.value++
// }, 1000)

const store = useCounterStore()
</script>

<template>
  <div class="main-layout__wrapper">
    <TopNavBar />

    <div class="main-layout__vertical-wrapper">
      <LeftNavBar />
      <div class="main-layout__content-wrapper">
        <h1 @click="store.incrementCounter">Main Layout {{ store.counter }}</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  &__wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__vertical-wrapper {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 40px);
  }
  &__content-wrapper {
    display: flex;
    width: 100%;
  }
}
</style>
