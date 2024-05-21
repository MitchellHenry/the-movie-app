import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.css'


loadFonts()


const app = createApp(App)
.use(router)
.use(vuetify)
app.config.globalProperties.$User = {};
app.mount('#app')