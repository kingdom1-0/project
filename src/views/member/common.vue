<template>
  <div class="com_content">
    <div class="com_bgImg bgImg_1">
      <img
        class="b9_2"
        src="/images/c9_2.png"
      >
      <img
        class="b9_4"
        src="/images/c9_4.png"
      >
    </div>
    <div class="com_conBlock">
      <div class="bus_ul">
        <router-link
          v-for="(item,n) in nav"
          :key="item.id"
          :to="item.href"
          :class="{bus_li:true,current:active==n}"
        >
          {{ item.name }}
        </router-link>
        <div class="clear" />
      </div>
      <transition name="fad">
        <router-view
          ref="child"
          @showDa="showDa"
        />
      </transition>
    </div>
    {{ shNum }}
    <news-content :show="shNum" />
  </div>
</template>

<script>
    import newsContent from '../components/news.vue' // 引入新闻弹出组件
    export default {
        components: { // 调用组件
            newsContent
        },
        data() {
            return {
                shNum: false,
                nav: [{
                    id: 1,
                    name: '会员活动',
                    href: '/member/'
                }, {
                    id: 2,
                    name: '加入会员',
                    href: '/member/joinUs'
                }, {
                    id: 3,
                    name: '会员须知',
                    href: '/member/notice'
                }, {
                    id: 4,
                    name: '积分兑换',
                    href: '/member/conversion'
                }, {
                    id: 5,
                    name: '留言板',
                    href: '/member/message'
                }]
            }
        },
        watch: {
            $route() {
                this.navActive()
            }
        },
        created() {
            this.navActive()
        },
        methods: {
            showDa: function (val) { // 显示弹出层
                this.shNum = val
            },
            navActive: function () {
                var href = location.href
                if (href.includes('/member/joinUs')) {
                    this.active = 1
                } else if (href.includes('/member/notice')) {
                    this.active = 2
                } else if (href.includes('/member/conversion')) {
                    this.active = 3
                } else if (href.includes('/member/message')) {
                    this.active = 4
                } else {
                    this.active = 0
                }
            }
        }
    }

</script>
