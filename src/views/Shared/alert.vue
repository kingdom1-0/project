<template>
    <transition name="fade" >
        <div class="alt_content" v-if="sh">
            <div class="alt_bgImg" @click="closeAlert"></div>
            <div class="alt_conBlock">
                <div class="alt_clear" @click="closeAlert"></div>
                <div class="alt_block">
                    <div class="alt_teBlock">
                        <div class="alt_tiBl">
                            <div class="alt_log"><img :src="store.logo" /></div>
                            <div class="alt_tBl">
                                <div class="alt_ti">{{store.ti}}</div>
                                <a href="/business/?lo=2" class="alt_aBl">{{store.lo}}</a>
                                <div class="alt_t">类别：{{store.sort}}</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="alt_te" v-html="store.text">
                        </div>
                    </div>
                    <div class="alt_imgBlock">                        
                        <div class="alt_swiperBl">                            
                            <swiper class="swiper vertical" :options="swiperOptionv">
                                <swiper-slide v-for="img in store.imgUl" :key="img.id">
                                    <div class="alt_img"><img :src="img" /></div>
                                </swiper-slide>                                                  
                                <div class="pa05" slot="pagination"></div>         
                              </swiper>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </transition>
    
</template>
<script>
    import bus from "../event/index" //事件总线
    export default {        
        props: {
            show:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                sh:false,
                swiperOptionv: {       
                    speed:800,
                    autoplay : {
                        delay:3000
                    },
                    pagination: {
                        el: '.pa05',
                        clickable: true
                    }
                },
                store:{
                    logo:require("../../images/4_4.jpg"),
                    ti:"阿迪达斯",
                    lo:"B1c-001",
                    sort:"体育用品",
                    text:'<p>作为全球领先的体育用品公司，阿迪达斯集团于1997年在苏州注册成立了中国全资子公司阿迪达斯体育（中国）有限公司。在过去的17年中，随着中国消费者变得日益富裕以及年轻人开始崇尚运动和时尚，阿迪达斯在中国取得了长足的发展。同时，公司通过坚持不渝的投资和承诺，使中国成为了阿迪达斯全球第二大市场！</p><p>阿迪达斯集团中国区总部现位于上海，并且在北京、广州和成都设有分公司。阿迪达斯于2008年在北京开设了在中国的第一家品牌中心，它至今仍然是阿迪达斯全球最大的零售店。2012年，阿迪达斯在中国的第二家品牌中心在上海开业，中国也由此成为唯一拥有两家阿迪达斯品牌中心的国家。</p><p>阿迪达斯集团中国区总部现位于上海，并且在北京、广州和成都设有分公司。阿迪达斯于2008年在北京开设了在中国的第一家品牌中心，它至今仍然是阿迪达斯全球最大的零售店。2012年，阿迪达斯在中国的第二家品牌中心在上海开业，中国也由此成为唯一拥有两家阿迪达斯品牌中心的国家。</p>',
                    imgUl:[require("../../images/5_3.jpg"),require("../../images/5_3.jpg"),require("../../images/5_3.jpg"),require("../../images/5_3.jpg"),require("../../images/5_3.jpg")]
                }           
            }
        },
        mounted () {
            //事件总线数据调用
            bus.$on("showDa",val =>{
                this.sh = val;
            })
            this.sh = this.$store.state.showDa;            
        },
        methods: {
            closeAlert:function(){
                this.$store.state.showDa = false;
                this.sh = false;
            }
        },
        watch:{
            '$store.state.showDa':function(){ //监听vuex数据
                this.sh = this.$store.state.showDa;
            }
        }        
    }

</script>
