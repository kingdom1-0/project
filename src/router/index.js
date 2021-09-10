import Vue from 'vue' // 引入vue
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 挂载vueRouter插件

const activity = () => import( /* webpackChunkName: "activity-news-review"*/ '../views/activity/common.vue') //注释部分指定分组打包
const news = () => import( /* webpackChunkName: "activity-news-review"*/ '../views/activity/index.vue')
const review = () => import( /* webpackChunkName: "activity-news-review"*/ '../views/activity/review.vue')

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
    component: activity,
    children: [ //嵌套路由
      {
        path: '/',
        component: news
      },
      {
        path: 'review',
        component: review,
        name: 'review' //命名路由
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
        path: 'joinUs',
        component: () => import("../views/member/joinUs.vue")
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
    path: '/manage/',
    component:()=> import('../views/manage/home.vue'),       
    children: [{
        path: '/',
        redirect: 'common', //路由重定向
      },
      {
        path: 'login',
        component: () => import('../views/manage/login.vue'),
      },
      {
        path: 'common',
        component: () => import('../views/manage/common.vue'),
        children:[
          {
            path:'/',
            redirect: 'index'
          },
          {
            path: 'index',
            component: () => import('../views/manage/index.vue'),
          },
          {
            path: 'content/:id',
            component: () => import('../views/manage/content.vue'),
            props: router => ({ //props传参
              id: router.params.id //动态参数
            })
          },
          {
            path: 'message',
            component: () => import('../views/manage/message.vue'),
          },
          {
            path: 'logInfo',
            component: () => import('../views/manage/logInfo.vue'),
          },
          {
            path: 'opLog',
            component: () => import('../views/manage/opLog.vue'),
          },
          {
            path: 'explain',
            component: () => import('../views/manage/explain.vue'),
          },
          {
            path: 'role',
            component: () => import('../views/manage/role.vue'),
          }  
        ]
      }          
    ],
    beforeEnter: (to, from, next) => {
      document.getElementsByTagName("html")[0].className = "manage";
      if(to.path === '/manage/login'){return next()}
      const token = sessionStorage.getItem('token');
      if(!token){
        return next('/manage/login');
      }
      next()
    }
  },
  {
    path: '*', //404页面
    component: () => import("../views/N404/index.vue")
  }
]

const router = new VueRouter({
  linkActiveClass: "active", //定义路由激活类名
  base: process.env.BASE_URL,
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