import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import "./style/common.css"  //全局样式
import "./style/animate.min.css"  //预设css3库

//elementUi组件库
import ElementUI from 'element-ui';   
import 'element-ui/lib/theme-chalk/index.css';

//swiper组件库
import vueSwiper from "vue-awesome-swiper"
import 'swiper/css/swiper.css' //npm i swiper@^5.2.0 -s   
Vue.use(vueSwiper);

Vue.use(ElementUI);
Vue.use(VueAxios, axios)


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
