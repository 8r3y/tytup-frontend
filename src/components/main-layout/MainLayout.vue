<script setup lang="ts">
import LeftNavBar from './LeftNavBar.vue'
import TopNavBar from './TopNavBar.vue'
</script>

<template>
  <div class="main-layout__wrapper">
    <TopNavBar />

    <div class="main-layout__vertical-wrapper">
      <LeftNavBar />
      <div class="main-layout__content-wrapper">
        <slot></slot>
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
    min-height: calc(100vh - 40px);
  }
  &__content-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
}
</style>
