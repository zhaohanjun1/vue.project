import Vue from 'vue'
import 'lib-flexible'

import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'

//注册全局标签
Vue.component('Header',Header)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
