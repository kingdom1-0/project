<template>
    <div class="he_body">
        <div id="Header">
            <a href="/" class="he_logo"><img src="/images/2.png" /></a>
            <div class="he_ulBl">

                <div :class="{he_liBl:true,active:n==active}" v-for="(nav,n) in navData" @mouseenter="showNav(n)"
                    @mouseleave="hideNav" :key="n">
                    <router-link :to="nav.location" class="he_a"><span>{{nav.title}}</span></router-link>
                    <transition name="fade">
                        <div class="heN_ul" v-show="navBo == n">
                            <router-link :to="item.location" class="heN_li" v-for="(item,m) in nav.children" :key="m">
                                {{item.title}}
                            </router-link>
                        </div>
                    </transition>
                </div>
                <div class="clear"></div>
            </div>
            <div class="he_ul">
                <router-link to="/business/" class="he_li li_1"></router-link>
                <router-link to="/member/" class="he_li li_2"></router-link>
                <a href="javascript:;" class="he_li li_3">
                    <div class="he_seek">
                        <input type="text" v-model="seek" placeholder="请输入搜索内容" @keydown.enter="seekFun()" />
                    </div>
                </a>
                <a href="javascript:;" class="he_li li_5">
                    <div class="wx_img"><img src="/images/wx.png" /></div>
                </a>
                <a href="javascript:;" class="he_li li_6">
                    <div class="he_seek">
                        招商电话：0760-88227277
                    </div>
                </a>
                <div class="clear"></div>
            </div>
        </div>
        <transition name="fade">
            <div class="heN_bgBlock" v-show="navBg"></div>
        </transition>
    </div>
</template>
<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.6s ease;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

</style>
<script>
    export default {
        data: function () {
            return {
                seek: '',
                navBo: 20,
                navBg: false,
                active: 0,
                navData: [{
                    title: "首页",
                    location: "/"
                }, {
                    title: "品牌指引",
                    location: "/business/",
                    children: [{
                            title: "楼层导视",
                            location: "/business/"
                        },
                        {
                            title: "品牌展示",
                            location: "/business/brand"
                        },
                        {
                            title: "商家介绍",
                            location: "/business/merchant"
                        }
                    ]
                }, {
                    title: "活动精选",
                    location: "/activity/",
                    children: [{
                            title: "活动安排",
                            location: "/activity/"
                        },
                        {
                            title: "活动回顾",
                            location: "/activity/review"
                        }
                    ]
                }, {
                    title: "会员天地",
                    location: "/member/",
                    children: [{
                            title: "会员活动",
                            location: "/member/"
                        }, {
                            title: "加入会员",
                            location: "/member/join"
                        },
                        {
                            title: "会员须知",
                            location: "/member/notice"
                        },
                        {
                            title: "积分兑换",
                            location: "/member/conversion"
                        },
                        {
                            title: "留言板",
                            location: "/member/message"
                        }
                    ]
                }, {
                    title: "关于我们",
                    location: "/contentUs/",
                    children: [{
                            title: "项目简介",
                            location: "/contentUs/"
                        }, {
                            title: "交通指南",
                            location: "/contentUs/traffic"
                        },
                        {
                            title: "招商租赁",
                            location: "/contentUs/attract"
                        },
                        {
                            title: "场地合作",
                            location: "/contentUs/site"
                        },
                        {
                            title: "联系我们",
                            location: "/contentUs/contactUs"
                        }
                    ]
                }]
            }
        },
        created: function () {

        },
        methods: {
            showNav: function (n) {
                this.navBo = n;
                this.navBg = true;
            },
            hideNav: function () {
                this.navBo = 20;
                this.navBg = false;
            },
            navActive: function () {
                var _this = this;
                var href = location.href;
                //一级导航激活
                if (href.includes("/business/")) {
                    _this.active = 1;
                } else if (href.includes("/activity/")) {
                    _this.active = 2;
                } else if (href.includes("/member/")) {
                    _this.active = 3;
                } else if (href.includes("/contentUs/")) {
                    _this.active = 4;
                } else {
                    _this.active = 0;
                }
            },
            seekFun() { // 搜索
                if (this.seek.length > 0) {
                    this.$router.push("/activity/?t=" + this.seek)
                }
            }
        },
        watch: {
            $route() {
                this.navActive();
            }
        }
    }

</script>
