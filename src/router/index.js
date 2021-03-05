import Vue from 'vue' //引入vue
import VueRouter from 'vue-router'
Vue.use(VueRouter) //挂载vueRouter插件

const routes = [{
    path: '/',
    component: () => import("../views/Home/Home.vue"), //路由懒加载
    beforeEnter: (to, from, next) => { //导航守卫
      document.getElementsByTagName("html")[0].className = "ind_body";
      next();
    }
  },
  {
    path: '/activity',
    component: () => import("../views/activity/common.vue"),
    children: [ //嵌套路由
      {
        path: '/',
        component: () => import("../views/activity/index.vue")
      },
      {
        path: 'review',
        component: () => import("../views/activity/review.vue")
      }
    ]
  },
  {
    path: '/business',
    component: () => import("../views/business/common.vue"),
    children: [{
        path: '/',
        component: () => import("../views/business/index.vue")
      },
      {
        path: 'brand',
        component: () => import("../views/business/brand.vue")
      },
      {
        path: 'merchant',
        component: () => import("../views/business/merchant.vue")
      }
    ]
  },
  {
    path: '/member',
    component: () => import("../views/member/common.vue"),
    children: [{
        path: '/',
        component: () => import("../views/member/index.vue")
      },
      {
        path: 'join',
        component: () => import("../views/member/join.vue")
      },
      {
        path: 'notice',
        component: () => import("../views/member/notice.vue")
      },
      {
        path: 'conversion',
        component: () => import("../views/member/conversion.vue")
      },
      {
        path: 'message',
        component: () => import("../views/member/message.vue")
      }
    ]
  },
  {
    path: '/contentUs',
    component: () => import("../views/contentUs/common.vue"),
    children: [{
        path: '/',
        component: () => import("../views/contentUs/index.vue")
      },
      {
        path: 'traffic',
        component: () => import("../views/contentUs/traffic.vue")
      },
      {
        path: 'attract',
        component: () => import("../views/contentUs/attract.vue")
      },
      {
        path: 'site',
        component: () => import("../views/contentUs/site.vue")
      },
      {
        path: 'contactUs',
        component: () => import("../views/contentUs/contactUs.vue")
      }
    ]
  },
  {
    path: '/manage',
    component: () => import("../views/manage/common.vue"), //后台管理
    children: [{
      path: '/',
      component: () => import('../views/manage/index.vue')
    }, {
      path: 'content',
      component: () => import('../views/manage/content.vue')
    }],
    beforeEnter: (to, from, next) => {
      document.getElementsByTagName("html")[0].className = "manage";
      next()
    }
  }
]

const router = new VueRouter({
  linkActiveClass: "active", //定义路由激活类名
  routes,
  //  scrollBehavior (){//滚动行为
  //    return {x:0,y:0}     
  //  }
})

router.beforeEach((to, from, next) => { //导航守卫
  document.getElementsByTagName("html")[0].classList.remove("ind_body"); //给html删除类名(该类名只在首页需要)
  window.scrollTo(0, 0); //切换路由，默认返回顶部
  next();
})

export default router