import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth-store', () => {
  const userToken = ref<{ accessToken?: string; refreshToken?: string }>({
    accessToken: undefined,
    refreshToken: undefined
  })
  const isAuth = computed(() => !!(userToken.value.refreshToken || userToken.value.accessToken))

  // Заглушка авторизации: настоящего логина пока нет, поэтому через 2 секунды
  // выставляем фейковый токен, чтобы стали доступны разделы для авторизованных.
  setTimeout(() => {
    userToken.value = { accessToken: 'fake-access-token', refreshToken: 'fake-refresh-token' }
  }, 2000)

  return {
    userToken,
    isAuth
  }
})
