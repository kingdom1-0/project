<template>
    <div class="com_content">
        <div class="com_bgImg bgImg_1">
            <img class="b9_2" src="/images/c9_2.png">
            <img class="b9_4" src="/images/c9_4.png">
        </div>
        <div class="com_conBlock">
            <div class="bus_ul">
                <router-link :to="item.href" :class="{bus_li:true,current:active==n}" v-for="(item,n) in nav"
                    :key="item.id">{{item.name}}
                </router-link>
                <div class="clear"></div>
            </div>
            <transition name="fad">
                <router-view @showDa="showDa" ref="child"></router-view>
            </transition>
        </div>
        {{shNum}}
        <news-content :show="shNum"></news-content>
    </div>
</template>

<script>
    import newsContent from '../components/news.vue' // 引入新闻弹出组件
    export default {
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
        },
        components: { // 调用组件
            newsContent
        },
        created() {
            this.navActive()
        },
        watch: {
            $route() {
                this.navActive()
            }
        }
    }

</script>
