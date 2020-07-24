import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import style from './assets/css/style.styl'
import 'babel-polyfill'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  style,
  render: h => h(App)
}).$mount('#app')
