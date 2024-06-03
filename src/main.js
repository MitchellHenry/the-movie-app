import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.css'


loadFonts()

const electricColor = "#0096FF";

const app = createApp(App)
app.directive('electric-text', 
{
    mounted: (el) => el.style.color = electricColor
})
app.directive('electric-bg', 
{
    mounted: (el) => el.style.background = electricColor
})
app.directive('electric-border', 
{
    mounted: (el) => el.style.border = '1px solid ' + electricColor
})
app.directive('glow-electric-border', 
{
    mounted: (el) => el.style.boxShadow = "0px 0px 5px 5px " + electricColor
})
.use(router)
.use(vuetify)
app.config.globalProperties.$User = {};
app.mount('#app')