<template>
    <div class="com_content">
        <div class="com_bgImg bgImg_6">
            <img class="b5_6" src="../../images/b5_6.png">
        </div>
        <div class="com_conBlock">
            <div class="bus_ul">
                <router-link :to="item.href" :class="{bus_li:true,current:n==active}" v-for="(item,n) in nav"
                    :key="item.id">{{item.name}}</router-link>
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
    import newsContent from "../components/news.vue" //引入新闻弹出组件
    export default {
        data() {
            return {
                shNum: false,
                nav: [{
                    id: 1,
                    name: '项目简介',
                    href: '/contentUs/'
                }, {
                    id: 2,
                    name: '交通指南',
                    href: '/contentUs/traffic'
                }, {
                    id: 3,
                    name: '招商租赁',
                    href: '/contentUs/attract'
                }, {
                    id: 4,
                    name: '场地合作',
                    href: '/contentUs/site'
                }, {
                    id: 5,
                    name: '联系我们',
                    href: '/contentUs/contactUs'
                }]
            }
        },
        methods: {
            showDa: function (val) { //显示弹出层
                this.shNum = val;
            },
            navActive: function () {
                var href = location.href;
                if (href.includes("/contentUs/traffic")) {
                    this.active = 1;
                } else if (href.includes("/contentUs/attract")) {
                    this.active = 2;
                } else if (href.includes("/contentUs/site")) {
                    this.active = 3;
                } else if (href.includes("/contentUs/contactUs")) {
                    this.active = 4;
                } else {
                    this.active = 0;
                }
            }
        },
        components: { //调用组件
            newsContent
        },
        created() {
            this.navActive();
        },
        watch: {
            $route() {
                this.navActive();
            }
        }
    }

</script>
