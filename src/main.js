import App from './App.vue'
import { createApp } from 'vue'
import VueRouter from 'vue-router'
import router from "./router";


const app = createApp(App)

app.use(VueRouter)

app.use(router);
app.mount('#app');
