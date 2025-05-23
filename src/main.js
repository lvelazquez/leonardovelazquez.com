import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueScrollTo from 'vue-scrollto'

const app = createApp(App)

app.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease-in-out',
  offset: -80,
  cancelable: true,
  x: false,
  y: true,
})

app.mount('#app')
