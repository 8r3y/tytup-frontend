<script setup lang="ts">
import MainLayout from '@/components/main-layout/MainLayout.vue'

// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { ref } from 'vue'

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType)

const myFiles = ref([])

const handleFilePondInit = () => {
  console.log('FilePond has initialized')
}
</script>

<template>
  <MainLayout>
    <form @submit.prevent>
      <input placeholder="Описание" />
      <input placeholder="Название" />
      <file-pond
        name="video"
        ref="pond"
        label-idle="Drop files here..."
        accepted-file-types="video/mp4"
        server="https://prayers.nsstms.ru/upload-video"
        :allow-multiple="false"
        :files="myFiles"
        v-on:init="handleFilePondInit"
      />
      <button type="submit">Загрузить</button>
    </form>
  </MainLayout>
</template>

<style lang="scss" scoped></style>
