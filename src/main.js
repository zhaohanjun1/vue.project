import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'lib-flexible'


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
