import Vue from 'vue'
import App from './App.vue'
//路由
import router from './router'
//vuex
import store from './store'
//定义全局组件
import typeNav from "@/components/TypeNav"
import Pagination from "@/components/Pagination"
//注册全局组件
Vue.component(typeNav.name, typeNav)
Vue.component(Pagination.name, Pagination)
//引入MockServer.js----mock数据
import '@/mock/mockServe'
Vue.config.productionTip = false
//引入swiper样式
import 'swiper/css/swiper.css'



new Vue({
  render: h => h(App),
  //注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
