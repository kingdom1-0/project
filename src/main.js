import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//import VueAxios from 'vue-axios'

import "./style/common.css" //全局样式
import "./style/animate.min.css" //预设css3库
import "./style/font/iconfont.css" //阿里巴巴图标库

//elementUi组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//加载显示
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

//swiper组件库
import vueSwiper from "vue-awesome-swiper"
import 'swiper/css/swiper.css' //npm i swiper@^5.2.0 -s   
Vue.use(vueSwiper);
Vue.use(ElementUI, {
  zIndex: 1000
});

//配置Neditor图片上传路径
Vue.prototype.ueditorURL = "http://127.0.0.1:2101/api/v1/ueditor"
//配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:2101/api/v1/";
Vue.prototype.$http = axios //方便所有组件直接使用 this.$http.get().then()

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  NProgress.start();
  return config;
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  NProgress.done();
  return response;
});

Vue.config.productionTip = false
new Vue({
  router,
  store, //把 store 的实例注入所有的子组件(this.$store)
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
}).$mount('#app')