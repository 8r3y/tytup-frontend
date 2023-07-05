import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter-store', () => {
  console.log('counter store start')
  const counter = ref(0)
  // const doubleCount = computed(() => count.value * 2)

  const incrementCounter = () => {
    counter.value++
  }

  const startCounter = ref(() => {
    return setInterval(() => {
      incrementCounter()
    }, 1000)
  })

  const startCounterHandler = startCounter.value()

  function stopCounter() {
    clearInterval(startCounterHandler)
  }

  return {
    counter,
    stopCounter,
    incrementCounter
  }
})
