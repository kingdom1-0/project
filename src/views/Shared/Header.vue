<template>
    <div class="he_body">
        <div id="Header">        
            <a href="/" class="he_logo"><img src="../../images/2.png"/></a>
            <div class="he_ulBl">
                <div class="he_liBl">
                    <router-link to="/" class="he_a"><span>首页</span></router-link>  
                </div>                              
                <div class="he_liBl" @mouseenter="showNav(0)" @mouseleave="hideNav(0)">
                    <router-link to="/business" class="he_a"><span>时尚购物</span></router-link>
                    <transition name="fade">
                        <div class="heN_ul" v-show="navAr[0]">
                            <router-link to="/business" class="heN_li">楼层导视</router-link>
                            <router-link to="/business/brand" class="heN_li">品牌展示</router-link>
                            <router-link to="/business/merchant" class="heN_li">商家介绍</router-link>                    
                        </div>       
                    </transition>                         
                </div>  
                <div class="he_liBl" @mouseenter="showNav(1)" @mouseleave="hideNav(1)">                    
                    <router-link to="/activity" class="he_a"><span>活动精选</span></router-link>
                    <transition name="fade">
                        <div class="heN_ul" v-show="navAr[1]">
                            <router-link to="/activity" class="heN_li">活动安排</router-link>
                            <router-link to="/activity/review" class="heN_li">活动回顾</router-link>
                        </div>       
                    </transition> 
                </div>
                <div class="he_liBl" @mouseenter="showNav(2)" @mouseleave="hideNav(2)">
                    <a href="/member/" class="he_a"><span>会员天地</span></a>
                    <div class="heN_ul" v-show="navAr[2]">
                        <a href="/member/" class="heN_li">会员活动</a>
                        <a href="/member/join" class="heN_li">加入会员</a>
                        <a href="/member/notice" class="heN_li">会员须知</a>
                        <a href="/member/conversion" class="heN_li">积分兑换</a>
                        <a href="/member/message" class="heN_li">留言板</a>
                    </div>
                </div>
                <div class="he_liBl" @mouseenter="showNav(3)" @mouseleave="hideNav(3)">
                    <a href="/contentUs/" class="he_a"><span>关于我们</span></a>
                    <div class="heN_ul" v-show="navAr[3]">
                        <a href="/contentUs/" class="heN_li">项目简介</a>
                        <a href="/contentUs/traffic" class="heN_li">交通指南</a>
                        <a href="/contentUs/attract" class="heN_li">招商租赁</a>
                        <a href="/contentUs/site" class="heN_li">场地合作</a>
                        <a href="/contentUs/content" class="heN_li">联系我们</a>
                    </div>
                </div>      
                <div class="clear"></div>
            </div>
            <div class="he_ul">
                <a href="javascript:;" class="he_li li_1"></a>
                <a href="javascript:;" class="he_li li_2"></a>
                <a href="javascript:;" class="he_li li_3"></a>
                <a href="javascript:;" class="he_li li_4"></a>
                <a href="javascript:;" class="he_li li_5"></a>
                <div class="clear"></div>
            </div>        
        </div>
        <transition name="fade">
            <div class="heN_bgBlock" v-show="navBo"></div>
        </transition>
    </div>    
</template>
<style>
    .fade-enter-active,.fade-leave-active {transition:all 0.6s ease;}
    .fade-enter,.fade-leave-to {opacity: 0;}
</style>
<script>
    export default {
        data () {
            return {
                navBo:false,//二级导航背景
                navAr:[false,false,false,false,false]//二级导航
            }
        },
        methods: {
            showNav:function(val){ //显示二级导航
                this.navBo = true;
                this.navAr[val] = true;
            },
            hideNav:function(val){ //隐藏二级导航
                this.navBo = false;
                this.navAr[val] = false;
            }
        }
    }
</script>