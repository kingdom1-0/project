<template>
    <div id="Footer" :class="{shFooter:da}" @wheel="hideFotter($event)">
        <div class="fo_content">
            <div class="fo_conBlock">
                <div class="fo_leftBl">
                    <a href="javascript:;" class="fo_logo"><img src="/images/3_6.png"></a>
                    <div class="fo_te">
                        <p>电话：0760-88227266</p>
                        <p>地址：中山市东区中山六路1号天奕星河COCO City</p>
                    </div>

                </div>
                <div class="fo_rightBl">
                    <div class="fo_ulBl">
                        <div class="fo_liBl">
                            <router-link to="../" class="fo_ti">首 页</router-link>
                        </div>
                        <div class="fo_liBl">
                            <router-link to="/business/" class="fo_ti">品牌指引</router-link>
                            <div class="fo_ul">
                                <router-link to="/business/" class="fo_li">楼层导视</router-link>
                                <router-link to="/business/brand" class="fo_li">品牌展示</router-link>
                                <router-link to="/business/merchant" class="fo_li">商家介绍</router-link>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <router-link to="/activity/" class="fo_ti">活动精选</router-link>
                            <div class="fo_ul">
                                <router-link to="/activity/" class="fo_li">活动资讯</router-link>
                                <router-link to="/activity/review" class="fo_li">活动回顾</router-link>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <router-link to="/member/" class="fo_ti"><span>会员天地</span></router-link>
                            <div class="fo_ul">
                                <router-link to="/member/" class="fo_li">会员活动</router-link>
                                <router-link to="/member/join" class="fo_li">加入会员</router-link>
                                <router-link to="/member/notice" class="fo_li">会员须知</router-link>
                                <router-link to="/member/conversion" class="fo_li">积分兑换</router-link>
                                <router-link to="/member/message" class="fo_li">留言板</router-link>
                            </div>
                        </div>
                        <div class="fo_liBl">
                            <router-link to="/contentUs/" class="fo_ti"><span>关于我们</span></router-link>
                            <div class="fo_ul">
                                <router-link to="/contentUs/" class="fo_li">项目简介</router-link>
                                <router-link to="/contentUs/traffic" class="fo_li">交通指南</router-link>
                                <router-link to="/contentUs/attract" class="fo_li">招商租赁</router-link>
                                <router-link to="/contentUs/site" class="fo_li">场地合作</router-link>
                                <router-link to="/contentUs/contactUs" class="fo_li">联系我们</router-link>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="fo_wxBl">
                    <div class="fo_wxTe">
                        微信扫一扫<br>
                        关注
                    </div>
                    <div class="fo_wxImg"><img src="/images/wx.png"></div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="fo_boBlock">
                <div class="fo_boLe">
                    <span class="fo_t1">深圳市星河商用置业股份有限公司所有</span>
                </div>
                <div class="fo_boRi">
                    <router-link to="/contentUs/contactUs">联系我们</router-link> <span>/</span>
                    <a href="http://beian.miit.gov.cn" target="_blank">备案号</a> <span>/</span>
                    <div href="javascript:;" class="foa_bl">
                        友情链接
                        <div class="outNav">
                            <a href="http://www.g-cre.com/" target="_blank">星河商置</a>
                            <a href="http://ft.cocopark.cn/" target="_blank">深圳福田星河COCO Park</a>
                            <a href="http://lg.cocopark.cn/" target="_blank">深圳龙岗星河COCO Park</a>
                            <a href="http://szworld.cocopark.cn/" target="_blank">星河WORLD·COCO Park</a>
                            <a href="http://szlh.xhcococity.com/" target="_blank">深圳龙华星河COCO City</a>
                            <a href="http://cz.xhcococity.com/" target="_blank">常州星河COCO City</a>
                            <a href="http://pn.xhcococity.com/" target="_blank">普宁星河COCO City</a>
                            <a href="http://www.icosz.com/Operation/Default.aspx" target="_blank">龙华星河iCO</a>
                            <a href="http://www.topliving.cn/" target="_blank">星河第三空间</a>
                            <div class="foa_null"></div>
                        </div>
                    </div> <span>/</span>
                    <a href="http://aty.cn" target="_blank">技术支持</a>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: 0
            }
        },
        props: { // 父组件传值
            da: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            hideFotter: function (e) {
                if (new Date().getTime() - this.time > 300) { // 滚轮操作判断
                    this.time = new Date().getTime()
                    var delta = -e.wheelDelta || e.detail // firefox使用detail:下3上-3,其他浏览器使用wheelDelta:下-120上120//下滚
                    if (delta < 0) {
                        this.$emit('closeDa', false) // 传递关闭参数
                    }
                }
            }
        }
    }

</script>
