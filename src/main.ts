import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import Hls from './Hls.vue'
import router from './router'
// import MainLayout from './components/MainLayout.vue';

const app = createApp(App)

const store = createPinia();

app.use(router)
app.use(store);
// app.component(MainLayout.name, MainLayout);

app.mount('#app')
