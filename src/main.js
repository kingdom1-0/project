import Vue from 'vue'
import App from './App.vue'
import "./style/common.css"
import "./font/iconfont.css"
import "./style/animate.min.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import vueSwiper from "vue-awesome-swiper"
import 'swiper/css/swiper.css' //npm i swiper@^5.2.0 -s   
import axios from 'axios'
import VueAxios from 'vue-axios'


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
