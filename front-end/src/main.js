import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import moment from 'moment'

Vue.prototype.moment = moment
Vue.use(Vuetify, {
  iconfont: 'md'
})
const opts = {}
Vue.config.productionTip = false
new Vue({
  vuetify: new Vuetify(opts),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
