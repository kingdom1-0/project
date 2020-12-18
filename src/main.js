import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import "./style/common.css"  //全局样式
import "./font/iconfont.css"  //阿里图标库
import "./style/animate.min.css"  //预设css3库

import ElementUI from 'element-ui';   //elementUi组件库
import 'element-ui/lib/theme-chalk/index.css';

import vueSwiper from "vue-awesome-swiper"//swiper组件库
import 'swiper/css/swiper.css' //npm i swiper@^5.2.0 -s   

Vue.use(vueSwiper);
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
