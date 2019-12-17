import Vue from 'vue'
import 'lib-flexible'

import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import store from './vuex/store'
import './validate'

//注册全局标签
Vue.component('Header',Header)


new Vue({
  render: h => h(App),
  router,//所有组件都能看到 $router <router-link>he <router-view>
  store,//所欲组件都能看到：$store
}).$mount('#app')
