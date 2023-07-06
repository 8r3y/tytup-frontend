<script lang="ts">
import Hls from 'hls.js'
import router from '@/router'
import { useVideoStore } from '@/stores/video-store'

export default {
  name: 'hls-video',
  async mounted() {
    const { videoId } = router.currentRoute.value.params as { videoId: string }
    const videoStore = useVideoStore()
    console.log('Router', router.currentRoute.value)

    let videoInfo = videoStore.videosList.find((x) => x.id === videoId)

    if (!videoInfo) {
      videoInfo = (await videoStore.getVideoInfo(videoId))?.result
    }

    if (!videoInfo) {
      return
    }

    this.description = videoInfo.description

    const video = document.getElementById('video') as HTMLVideoElement
    const videoSrc = videoInfo.url

    console.log('localHls', Hls, videoInfo)

    if (Hls.isSupported()) {
      const hls = new Hls({
        // maxBufferSize: 2 * 1000 * 1000,
        maxBufferLength: 10,
        backBufferLength: 0
      })

      hls.loadSource(videoSrc)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // video.play()
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
      video.addEventListener('loadedmetadata', () => {
        // video.play()
      })
    }
  },
  data() {
    return {
      description: ''
    }
  },
  methods: {
    onBackHandler: () => {
      // router.back()
      router.push('/')
    }
  }
}
</script>

<template>
  <div class="video-view__wrapper">
    <div class="video-view__content">
      <a @click="onBackHandler">На глагне</a>
      <div>Lets see video</div>
      <video id="video" width="1280" height="720" controls></video>
      <p class="video-view__description__container"><b>Описание: </b>{{ description }}</p>
    </div>
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
  &__content {
    min-width: 1280px;
    align-self: center;
  }
  &__description__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: start;
  }
}
</style>
