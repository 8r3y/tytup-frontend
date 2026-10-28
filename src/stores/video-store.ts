import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/constants'

export const useVideoStore = defineStore('video-store', () => {
  const videosList = ref<AppTypes.VideoCard[]>([])

  const getVideoInfo = async (videoId: string) => {
    try {
      const result = await axios.get(`${API_BASE_URL}/video-info/${videoId}`).catch()
      if (result && result.status === 200) {
        return result.data as { result: AppTypes.VideoCard }
      }
      return undefined
    } catch (e) {
      console.error('getVideoInfo error', e)
      return undefined
    }
  }

  const getVideoList = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/video-list`).catch()
      if (result && result.status === 200) {
        videosList.value = result.data.result?.items || []
      }
    } catch {
      return
    }
  }

  const uploadVideo = async (form: FormData) => {
    try {
      const result = await axios
        .request({
          method: 'POST',
          url: `${API_BASE_URL}/upload-video`,
          data: form
        })
        .catch()
      if (result && result.status === 200) {
        return result.data
      } else {
        return {
          error: 'Unknown error'
        }
      }
    } catch {
      return
    }
  }

  return {
    videosList,
    getVideoInfo,
    getVideoList,
    uploadVideo
  }
})
