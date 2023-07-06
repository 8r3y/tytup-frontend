<script setup lang="ts">
import router from '@/router'
import { routesList } from '@/router/routes-list'
import { computed } from 'vue'

const props = defineProps<{ video: AppTypes.VideoCard }>()

const onClickHandler = () => {
  router.push(`/video/` + props.video.id)
}

const isPreviewAvailable = computed(() => {
  return props.video.preview && props.video.preview.startsWith('https://')
})
</script>

<template>
  <div @click="onClickHandler" class="video-card__wrapper">
    <div class="video-card__preview">
      <img v-if="isPreviewAvailable" :src="video.preview" />
      <img v-else src="/images/no-preview-available.png" />
      <div class="video-card__preview__duration__wrapper">
        <div class="video-card__preview__duration__content">{{ video.duration }}</div>
      </div>
    </div>
    <div class="video-card__title">
      {{ video.name }}
    </div>
    <div class="video-card__owner">{{ video.author }}</div>
    <div class="video-card__views">{{ video.views }}</div>
  </div>
</template>

<style scoped lang="scss">
.video-card {
  &__wrapper {
    display: flex;
    flex: 1;
    height: 25vh;
    border: 1px solid lightseagreen;
    border-radius: 1vw;
    flex-direction: column;
    margin-bottom: 20px;

    &:hover {
      cursor: pointer;
    }
  }
  &__title {
    width: 100%;
    text-align: center;
  }
  &__preview {
    width: 100%;
    object-fit: contain;
    height: 84px;

    &__duration {
      &__wrapper {
        position: relative;
        top: -30px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
      }
      &__content {
        padding: 0 5px;
        background-color: black;
        color: white;
        border-radius: 5px;
      }
    }
  }
}
img {
  width: 100%;
  height: 84px;
  object-fit: cover;
  border-top-left-radius: 1vw;
  border-top-right-radius: 1vw;
}
</style>
