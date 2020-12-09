import Vue from 'vue'   //引入vue
import VueRouter from 'vue-router'  //引入router
 
Vue.use(VueRouter)  //挂载router

  const routes = [
    {
      path: '/',
      component: () => import("../views/Home/Home.vue"), //路由懒加载
      beforeEnter: (to, from, next) => {  //导航守卫
        document.getElementsByTagName("html")[0].className = "ind_body";//给html加类名     
        next();
      }
    },
    {
      path: '/business',
      component: () => import("../views/business/business.vue"),
      children: [ //嵌套路由
        {
          path: '',
          component: () => import("../views/business/index.vue")
        },
        {
          path: 'brand', //path: 'brand/:on',
          name:"brand",
          component: () => import("../views/business/brand.vue")          
        },
        {
          path: 'merchant', //动态路由 (带参调用：/business/merchant/2)
          component: () => import("../views/business/merchant.vue")         
        }
      ]
    },
    {
      path: '/activity',
      component: () => import("../views/activity/common.vue"),
      children: [ //嵌套路由
        {
          path: '',
          component: () => import("../views/activity/index.vue")
        },
        {
          path: 'review', //path: 'brand/:on',
          component: () => import("../views/activity/review.vue")          
        }       
      ]
    }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => { //导航守卫
  var href = to.path;  
  var brand = new RegExp("business/brand");
  var merchant = new RegExp("business/merchant");
  var business = new RegExp("business");
  var activity = new RegExp("activity");
  var _libl = document.getElementsByClassName("he_liBl")
  for (var i = 0; i < _libl.length; i++){
    _libl[i].classList.remove("current");
  }
  if (merchant.test(href)) {
    document.title = "星河-商家介绍 ";    
  }else if (brand.test(href)) {
    document.title = "星河-品牌展示 ";
  }else if (business.test(href)) {
    document.title = "星河-楼层导视 ";    
    //document.getElementsByClassName("he_liBl")[1].classList.add("current");
  } else if (activity.test(href)) {
    document.title = "星河-活动资讯 ";
    //document.getElementsByClassName("he_liBl")[2].classList.add("current");
  } else {
    document.title = "星河-COCO City ";
    //document.getElementsByClassName("he_liBl")[0].classList.add("current");
  }  
  document.getElementsByTagName("html")[0].classList.remove("ind_body");//给html删除类名(该类名只在首页需要)
  window.scrollTo(0, 0);  //切换路由，默认返回顶部
  next()      
})

export default router
