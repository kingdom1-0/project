<template>    
        <div :class="{ind_conBlock:true,shFooter:foBo}">           
            <swiper class="swiper" :options="swiperOptionh">
                <swiper-slide>
                  <swiper class="swiper vertical" :options="swiperOptionv">
                    <swiper-slide v-for="img in banner" :key="img.id">
                        <div class="ind_banner">
                            <div class="ind_baImg"  :style="{backgroundImage:'url('+img+')'}">
                            </div>
                        </div>
                    </swiper-slide>                             
                    <div class="pa02" slot="pagination"></div>         
                  </swiper>
                </swiper-slide>
                <swiper-slide>
                    <div class="ind_page">
                        <div class="indB_content">
                            <div class="indB_ulBl">
                                <div class="indB_liBl" v-for="b in brand" :key="b.id">
                                    <div class="indB_bgImg" :style="{backgroundImage:'url('+b.bgImg+')'}"><div class="after"></div></div>
                                    <div class="indHo_block">
                                        <div class="indHo_ulBl">
                                            <div class="indHo_liBl" v-for="li in b.ul" :key="li.id">
                                                <div class="indHo_img"><img :src="li.img"/></div>
                                                <div class="indHo_teBl">
                                                    <div class="indHo_teTi">{{li.ti}}</div>
                                                    <router-link :to="li.moHref" class="indHo_more">查看详情</router-link>
                                                </div>
                                                <div class="clear"></div>
                                            </div>              
                                        </div>
                                        <div class="indHo_ti">
                                            <div class="indHo_tCh">{{b.ti}}</div>
                                            <div class="indHo_tEn">{{b.eTi}}</div>
                                        </div>
                                        <router-link :to="b.moHref" class="indHo_aBl">{{b.more}}</router-link>
                                    </div>
                                </div>                                
                               <div class="indB_liBl">
                                   <div class="indB_block bgCol1">
                                       <div class="indB_tiBl">
                                           <div class="indB_ti">品牌索引</div>
                                           <div class="indB_en">Brand index</div>
                                       </div>
                                        <div class="b2_5"><img class="layer" data-depth="3" src="../../images/c2_5.png" /></div>
                                        <div class="b2_51"><img class="layer" data-depth="1" src="../../images/c2_51.png" /></div>
                                        <div class="b2_52"><img class="layer" data-depth="3" src="../../images/c2_52.png" /></div>
                                        <div class="b2_53"><img class="layer" data-depth="1" src="../../images/c2_53.png" /></div>
                                        <div class="b2_54"><img class="layer" data-depth="3" src="../../images/c2_54.png" /></div>
                                        <div class="b2_55"><img class="layer" data-depth="1" src="../../images/c2_55.png" /></div>
                                   </div>
                               </div>
                               <div class="clear"></div>
                            </div>
                        </div>
                   </div>
                </swiper-slide>  
                <swiper-slide>
                    <div class="ind_page" @mousemove="touMove">
                        <div class="indC_content">
                            <div class="indC_ulBl bgCol2">
                                <div class="indC_tiBl">
                                    <div class="indB_block scene">
                                        <div class="indB_tiBl">
                                            <div class="indB_ti">主力店铺</div>
                                            <div class="indB_en">THE MAIN STORE</div>
                                        </div>
                                        <div class="b2_4"><img class="layer" data-depth="2" src="../../images/c2_4.png" /></div>
                                        <div class="b2_41"><img class="layer" data-depth="1" src="../../images/c2_41.png" /></div>
                                        <div class="b2_42"><img class="layer" data-depth="1" src="../../images/c2_42.png" /></div>
                                        <div class="b2_43"><img class="layer" data-depth="2" src="../../images/c2_43.png" /></div>
                                    </div>
                                </div>
                                <div class="indC1_ulBl">
                                    <div class="indC1_InBl">
                                    <div class="indC_liBl" v-for="st in store" :key="st.id" :data="{'marginTop':moNum}">
                                            <div class="indC_InBlock">
                                                <a href="/business/merchant?on=2" class="indC_top" v-for="s in st" :key="s.id">
                                                    <div class="indC_bg" :style="{backgroundImage:'url('+s.bgImg+')'}"></div>
                                                    <div class="indC_InBl">
                                                        <div class="indC_logo"><img :src="s.logo" /></div>
                                                        <div class="indC1_teBl">
                                                            <div class="indC1_name">{{s.ti+moNum}}</div>
                                                            <div class="indC1_num">店铺号：{{s.num}} </div>
                                                        </div>
                                                        <div class="clear"></div>
                                                    </div>
                                                    <div class="indC1_bl">
                                                        <div class="indC1_logoBl">
                                                            <img :src="s.logo" />
                                                        </div>
                                                    </div>
                                                </a>                                               
                                            </div>
                                        </div>                                       
                                        <div class="clear"></div>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>  
                <swiper-slide>
                    <div class="ind_page">
                        <div class="indD_content" @wheel.prevent="showFooter($event)">
                            <div class="indD_conBlock" :style="{marginTop:-marginTop+'px'}">
                                <div class="indD_tiBl">
                                    <div class="indD_tCh">最新资讯</div>
                                    <div class="indD_tEn">news</div>
                                </div>
                                <div class="indD_ulBl" v-images-loaded:on.progress="imageProgress">
                                    <a :href="n.href" class="indD_liBl" v-for="n in news" :key="n.id">
                                        <div class="indD_InBl">
                                            <div class="indD_img"><img :src="n.img"/></div>
                                            <div class="indD_ti">{{n.ti}}</div>
                                            <div class="indD_te" v-html="n.te"></div>
                                            <div class="indD_more">查看详情</div>
                                        </div>
                                    </a>                                    
                                    <div class="clear"></div>
                                </div>
                            </div>                            
                        </div>                        
                    </div>
                </swiper-slide>               
                <div class="swiper-pagination swiper-pagination-h" slot="pagination"></div>
              </swiper>
            <div class="pa01"></div>     
            <transition name="fade" mode="">
                <div class="fo_bgBlock" v-show="foBo" @wheel.prevent="showFooter($event)"></div>   
            </transition>             
        </div>
</template>


<script>
    import imagesLoaded from 'vue-images-loaded'  //调用vue-images-loaded
    import $ from "jquery"

    export default {
        data () {
            return {
                info:null,
                banner:[//banner图
                    require("../../images/1.jpg"),
                    require("../../images/1.jpg"),
                    require("../../images/1.jpg"),
                ],
                brand:[
                    {bgImg:require("../../images/2_1.png"),ti:"时尚购物",eTi:"shopping",more:"更多购物",moHref:"/business",
                        ul:[
                            {img:require("../../images/3_5.png"),ti:"H&M1",moHref:"/business/brand?on=2"},
                            {img:require("../../images/3_5.png"),ti:"H&M2",moHref:"/business/brand?on=2"},
                            {img:require("../../images/3_5.png"),ti:"H&M3",moHref:"/business/brand?on=2"}
                        ]
                    },
                    {bgImg:require("../../images/2_2.jpg"),ti:"美食荟萃",eTi:"Food",more:"更多美食",moHref:"/business",
                        ul:[
                            {img:require("../../images/3_5.png"),ti:"H&M1",moHref:"/business/brand?on=2"},
                            {img:require("../../images/3_5.png"),ti:"H&M2",moHref:"/business/brand?on=2"},
                            {img:require("../../images/3_5.png"),ti:"H&M3",moHref:"/business/brand?on=2"}
                        ]
                    },
                    {bgImg:require("../../images/2_3.jpg"),ti:"电影娱乐",eTi:"movie",more:"更多娱乐",moHref:"/business",
                        ul:[
                            {img:require("../../images/3_5.png"),ti:"H&M1",moHref:"/business/brand?on=2"},
                            {img:require("../../images/3_5.png"),ti:"H&M2",moHref:"/business/brand?on=2"},
                            {img:require("../../images/3_5.png"),ti:"H&M3",moHref:"/business/brand?on=2"}
                        ]
                    }
                ],
                store:[                    
                   [
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"}                       
                   ],
                   [
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},                      
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"}                       
                   ],
                   [
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"}                       
                   ],
                   [
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"},                       
                       {bgImg:require("../../images/c2_3.jpg"),logo:require("../../images/c2_2.jpg"),ti:"阿迪达斯",num:"B1C-001"}                       
                   ]
                ],
                news:[
                    {href:"javascript:;",img:require("../../images/3_4.jpg"),ti:"双11立减111元，快来普宁...",te:'<p>双11就快到啦！</p><p>你们的购物车是不是已经塞得满满的了~~</p>'},
                    {href:"javascript:;",img:require("../../images/3_4.jpg"),ti:"双11立减111元，快来普宁...",te:'<p>双11就快到啦！</p><p>你们的购物车是不是已经塞得满满的了~~</p>'},
                    {href:"javascript:;",img:require("../../images/3_4.jpg"),ti:"双11立减111元，快来普宁...",te:'<p>双11就快到啦！</p><p>你们的购物车是不是已经塞得满满的了~~</p>'}
                ],
                swiperOptionh: {},
                swiperOptionv: {       
                    effect: 'slide',     
                    speed:800,
                    autoplay : {
                        delay:3000
                    },
                    pagination: {
                        el: '.pa02',
                        clickable: true
                    }
                },
                marginTop:250,
                da:0,
                foBo:false,   
                moNum:0     //上下移动的值            
            }
        },
        props: {
            clDa:{
                type:Boolean,
                default:true
            }
        },
        directives: {
          imagesLoaded  
        },
        watch: {
            clDa:function(){ //关闭页尾
                this.foBo = this.clDa
            }
        },
        methods:{
            newsCenter:function(){//新闻居中
                this.marginTop = document.getElementsByClassName("indD_conBlock")[0].clientHeight/2; 
            },
            imageProgress(instance, image ) {   //判断images加载完成
                image.isLoaded ? 'loaded' : 'broken';
                //const result = image.isLoaded ? 'loaded' : 'broken';
                //console.log( 'image is ' + result + ' for ' + image.img.src );
                this.newsCenter()
            },            
            showFooter:function(e){
                if(new Date().getTime() - this.da > 500){  //滚轮操作判断
                    this.da = new Date().getTime();     
                    var delta = -e.wheelDelta || e.detail;//firefox使用detail:下3上-3,其他浏览器使用wheelDelta:下-120上120//下滚
                    if(delta>0){
                        this.foBo = true;                        
                    }else{
                        this.foBo = false;
                    }               
                   
                    this.$emit("footerDa",this.foBo); //页尾显示参数
                }     
            },
            touMove:function(e){
                this.moNum = e.clientY - window.outerHeight;
                console.log(this.moNum)                
            }
        },
        created () {
            const _this = this;
            this.swiperOptionh = {//把swiper放入created中,解决this冲突
                direction: 'vertical',
                mousewheel: true,
                pagination: {
                    el: '.pa01',
                    clickable: true
                },
                on:{
                    transitionStart: function(){
                        let m = this.activeIndex; //返回swiper索引
                        if(m != 3){
                            _this.foBo = false;                            
                        }  
                    },
                },
            }            
        },
        mounted(){        
            const _this = this;
            window.onresize = function(){//窗口自适应
                _this.newsCenter(); 
            }
            $("body").on("click",function(){
                //alert(0)
            })

            this.axios
            .get('../../data/home.json')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });            
           
        }
    }
</script>
<style>
    .swiper-container {
      width: 100%;
      height: 100%;
    }

    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0px 12px;
        outline: none;
    }

    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 30px;
    }

    .ind_body {
        position: relative;
        height: 100%;
        overflow: hidden;
    }

    .ind_body #Footer {top:0px;}

    .ind_body .ind_conBlock.shFooter,.ind_body div#Footer.shFooter {
        top: -310px;
    }  
 
</style>
