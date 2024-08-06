import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from "pinia-plugin-persistedstate";
import "element-plus/dist/index.css";
import "./assets/main.scss";
import "./main.css"

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
pinia.use(persist)
app.use(pinia)
app.use(router)

app.mount('#app')
