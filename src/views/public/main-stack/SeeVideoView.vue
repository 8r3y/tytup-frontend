<script setup lang="ts">
import Hls from 'hls.js'
import router from '@/router'
import { useVideoStore } from '@/stores/video-store'

defineOptions({
  name: 'hls-video',
  async mounted() {
    const { videoId } = router.currentRoute.value.params as { videoId: string }
    const videoStore = useVideoStore()
    console.log('Router', router.currentRoute.value)

    const videoInfo =
      videoStore.videosList.find((x) => x.id === videoId) ||
      (await videoStore.getVideoInfo(videoId))
    if (!videoInfo) {
      return
    }

    const video = document.getElementById('video') as HTMLVideoElement
    const videoSrc = videoInfo.url

    console.log('localHls', Hls)

    if (Hls.isSupported()) {
      const hls = new Hls({
        // maxBufferSize: 2 * 1000 * 1000,
        maxBufferLength: 10,
        backBufferLength: 0
      })

      hls.loadSource(videoSrc)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
    }
  }
})
</script>

<template>
  <div class="video-view__wrapper">
    <a
      @click="
        () => {
          router.back()
        }
      "
      >Назад</a
    >
    <div>Lets see video</div>
    <video id="video" width="1280" height="720" controls></video>
  </div>
</template>

<style lang="scss" scoped>
.video-view {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
}
</style>
