<template>
    <div id="Footer" :class="{shFooter:da}" @wheel.prevent="hideFotter($event)">
        <div class="fo_content">
            <div class="fo_conBlock">
                <div class="fo_leftBl">
                    <a href="javascript:;" class="fo_logo"><img src="../../images/3_6.png"/></a>
                    <div class="fo_te">
                        <p>电话：</p>
                        <p>地址：</p>
                    </div>
                </div>
                <div class="fo_rightBl">
                    <div class="fo_ulBl">
                        <div class="fo_liBl">
                            <a href="javascript:;" class="fo_ti">首 页</a>                        
                        </div>
                        <div class="fo_liBl">
                            <a href="javascript:;" class="fo_ti"> 时尚购物</a>
                            <div class="fo_ul">
                                <a href="javascript:;" class="fo_li">楼层导视</a>
                                <a href="javascript:;" class="fo_li">品牌展示</a>
                                <a href="javascript:;" class="fo_li">商家介绍</a>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <a href="javascript:;" class="fo_ti">美食荟萃</a>
                            <div class="fo_ul">
                                <a href="javascript:;" class="fo_li">楼层导视</a>
                                <a href="javascript:;" class="fo_li">品牌展示</a>
                                <a href="javascript:;" class="fo_li">商家介绍</a>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <a href="javascript:;" class="fo_ti">电影娱乐</a>
                            <div class="fo_ul">
                                <a href="javascript:;" class="fo_li">楼层导视</a>
                                <a href="javascript:;" class="fo_li">商家介绍</a>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <a href="javascript:;" class="fo_ti">活动精选</a>
                            <div class="fo_ul">                            
                                <a href="javascript:;" class="fo_li">活动安排</a>
                                <a href="javascript:;" class="fo_li">活动回顾</a>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <a href="javascript:;" class="fo_ti">会员天地</a>
                            <div class="fo_ul">
                                <a href="javascript:;" class="fo_li">会员活动</a>
                                <a href="javascript:;" class="fo_li">加入会员</a>
                                <a href="javascript:;" class="fo_li">会员须知</a>
                                <a href="javascript:;" class="fo_li">积分兑换</a>
                                <a href="javascript:;" class="fo_li">留言板</a>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <a href="javascript:;" class="fo_ti">关于我们</a>
                            <div class="fo_ul">
                                <a href="javascript:;" class="fo_li">项目简介</a>
                                <a href="javascript:;" class="fo_li">交通指南</a>
                                <a href="javascript:;" class="fo_li">招商租赁</a>
                                <a href="javascript:;" class="fo_li">场地合作</a>
                                <a href="javascript:;" class="fo_li">联系我们</a>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>            
                <div class="clear"></div>
            </div>
            <div class="fo_boBlock">
                <div class="fo_boLe">
                    <span class="fo_t1">深圳市星河商用置业股份有限公司所有</span>
                    <a href="javascript:;">开放时间</a> <span>/</span>
                    <a href="javascript:;">广场定位器</a> <span>/</span>
                    <a href="javascript:;">泊车服务</a> <span>/</span>
                    <a href="javascript:;">意见反馈</a>
                </div>
                <div class="fo_boRi">
                    <a href="javascript:;">联系我们</a> <span>/</span>
                    <a href="javascript:;">开发商</a> <span>/</span>
                    <a href="javascript:;">备案号</a> <span>/</span>
                    <a href="javascript:;">法律声明</a> <span>/</span>
                    <a href="javascript:;">技术支持</a> 
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                time:0
            }
        },
        props: {
            da:{
                type:Boolean,
                default:false
            }
        },
        methods: {           
            hideFotter:function(e){
                if(new Date().getTime() - this.time > 300){  //滚轮操作判断
                    this.time = new Date().getTime();     
                    var delta = -e.wheelDelta || e.detail;//firefox使用detail:下3上-3,其他浏览器使用wheelDelta:下-120上120//下滚
                    if(delta<0){                        
                        this.$emit("closeDa",false); //传递关闭参数                       
                    }
                }     
            }
        }
    }
</script>

