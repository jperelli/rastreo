import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import router from './router'
import Vuetify from 'vuetify'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  provide: createProvider().provide(),
  router,
  render: h => h(App)
}).$mount('#app')
