import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth-store', () => {
  console.log('auth store start')
  const userToken = ref<{ accessToken?: string; refreshToken?: string }>({
    accessToken: undefined,
    refreshToken: undefined
  })
  const isAuth = computed(() => !!(userToken.value.refreshToken || userToken.value.accessToken))

  setTimeout(() => {
    console.log('useAuthStore userToken')
    userToken.value = { accessToken: '123', refreshToken: '435' }
  }, 2000)

  return {
    userToken,
    isAuth
  }
})
