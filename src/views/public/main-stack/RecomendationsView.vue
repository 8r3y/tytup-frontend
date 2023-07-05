<script setup lang="ts">
import MainLayout from '@/components/main-layout/MainLayout.vue'
import VideoCard from '../../../components/VideoCard.vue'
import { videos } from '@/mocks'
</script>

<template>
  <MainLayout>
    <div class="recomendations__wrapper">
      <VideoCard
        :video="videoElement"
        v-for="videoElement in videos"
        v-bind:key="videoElement.id"
      />
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.recomendations {
  &__wrapper {
    display: grid;
    grid-template-columns: 15% 15% 15% 15% 15% 15%;
    /* grid-template-rows: 220px; */
    padding: 5% 5%;
    justify-content: space-between;
  }
}
</style>
