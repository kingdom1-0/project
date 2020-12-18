<template>
    <div class="he_body">
        <div id="Header">        
            <a href="/" class="he_logo"><img src="../../images/2.png"/></a>
            <div class="he_ulBl">
                <div class="he_liBl">
                    <router-link to="/" class="he_a" exact><span>首页</span></router-link>  <!-- exact 用于 / 去掉 active -->
                </div>                              
                <div class="he_liBl" @mouseenter="showNav(0)" @mouseleave="hideNav(0)">
                    <router-link to="/business" class="he_a"><span>品牌指引</span></router-link>
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
                    <router-link to="/member/" class="he_a"><span>会员天地</span></router-link>
                    <div class="heN_ul" v-show="navAr[2]">
                        <router-link to="/member/" class="heN_li">会员活动</router-link>
                        <router-link to="/member/join" class="heN_li">加入会员</router-link>
                        <router-link to="/member/notice" class="heN_li">会员须知</router-link>
                        <router-link to="/member/conversion" class="heN_li">积分兑换</router-link>
                        <router-link to="/member/message" class="heN_li">留言板</router-link>                        
                    </div>
                </div>
                <div class="he_liBl" @mouseenter="showNav(3)" @mouseleave="hideNav(3)">
                    <router-link to="/contentUs/" class="he_a"><span>关于我们</span></router-link>
                    <div class="heN_ul" v-show="navAr[3]">
                        <router-link to="/contentUs/" class="heN_li">项目简介</router-link>
                        <router-link to="/contentUs/traffic" class="heN_li">交通指南</router-link>
                        <router-link to="/contentUs/attract" class="heN_li">招商租赁</router-link>
                        <router-link to="/contentUs/site" class="heN_li">场地合作</router-link>
                        <router-link to="/contentUs/contactUs" class="heN_li">联系我们</router-link>                        
                    </div>
                </div>      
                <div class="clear"></div>
            </div>
            <div class="he_ul">
                <router-link to="/business/" class="he_li li_1"></router-link>
                <router-link to="/member/" class="he_li li_2"></router-link>
                <a href="javascript:;" class="he_li li_3">
                    <div class="he_seek">
                        <input type="text" placeholder="请输入搜索内容" />
                    </div>
                </a>
                <a href="javascript:;" class="he_li li_5"><div class="wx_img"><img src="../../images/wx.png" /></div></a>
                <a href="javascript:;" class="he_li li_6">
                    <div class="he_seek">
                        招商电话：0760-88227277
                    </div>
                </a>
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
    import bus from "../../common/bus"
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
        },
        mounted:function(){
            bus.$emit("mag",val =>{                
                alert(val)
            })
        }
    }
</script>