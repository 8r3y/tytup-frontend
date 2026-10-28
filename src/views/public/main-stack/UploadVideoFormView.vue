<script setup lang="ts">
import MainLayout from '@/components/main-layout/MainLayout.vue'
import router from '@/router'
import { useVideoStore } from '@/stores'
import { computed, ref } from 'vue'

const file = ref<File | null>()

const fileName = ref('')
const description = ref('')

const form = ref<HTMLFormElement>()

const videoStore = useVideoStore()

function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement
  if (target && target.files) {
    file.value = target.files[0]
  }
}

async function clearForm() {
  form.value?.reset()
  file.value = null
}

const onSubmitForm = async () => {
  if (file.value) {
    const { size, name } = file.value

    if (size > 50 * 1024 * 1024) {
      alert('You can not upload video large than 50MB')
      return
    }

    const formData = new FormData()
    formData.append('video', file.value)
    formData.append('description', description.value)
    formData.append('name', fileName.value?.length > 0 ? fileName.value : name)

    const result = await videoStore.uploadVideo(formData)

    if (result.error) {
      alert('ERROR OCCURED: ' + result.error)
    } else {
      alert(result.result)
      router.replace('/recomendations')
    }
    clearForm()
  }
}

const isUploadDisabled = computed(() => {
  return !(file.value?.size && file.value.size > 0)
})
</script>

<template>
  <MainLayout>
    <div class="upload-video-form__content">
      <form @submit.prevent ref="form">
        <input
          placeholder="Название"
          name="name"
          type="text"
          v-bind:value="fileName"
          @input="fileName = ($event?.target as any)?.value"
        />
        <textarea
          placeholder="Описание"
          name="description"
          rows="5"
          style="width: 100%"
          v-bind:value="description"
          @input="description = ($event?.target as any)?.value"
        ></textarea>
        <input type="file" @change="onFileChanged($event)" accept="video/*" capture />
        <button type="submit" @click="onSubmitForm" v-bind:disabled="isUploadDisabled">
          Загрузить
        </button>
        <button type="submit" @click="clearForm">Сбросить</button>
      </form>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.upload-video-form {
  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    padding: 5% 5%;
  }
}
input {
  width: 100%;
}
form * {
  margin-bottom: 20px;
}

button:first-of-type {
  margin-right: 20px;
} 
</style>
