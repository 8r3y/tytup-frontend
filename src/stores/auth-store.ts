import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth-store', () => {
  console.log('auth store start')
  const userToken = ref({ accessToken: undefined, refreshToken: undefined })
  const isAuth = computed(() => userToken.value.refreshToken)

  return {
    userToken,
    isAuth,
  }
})
