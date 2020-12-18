<template>
    <div class="bus_content me_top">
      <div class="bus_conBlock">
          <div class="join_context">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="li in newList" :key="li.id">
                  <div class="join_block">
                      <div class="join_img"><img class="img_node" src="../../images/9_7.png"></div>
                      <div class="join_teBl">
                          <div class="join_ti">{{li.ti}}</div>
                          <div class="join_vip"><img :src="li.img"></div>
                          <div class="join_te" v-html="li.te">
                              
                          </div>
                      </div>
                  </div>
                </swiper-slide>          
              </swiper>        
              <div class="join_leBu"></div>
              <div class="join_riBu"></div> 
          </div>               
      </div>
  </div>
  </template>
  <script>   
    export default {    
      data() {
        return {
          swiperOption: {
            loop:true,
            slidesPerView: 3,
            centeredSlides: true,
            navigation: {
              nextEl: '.join_riBu',
              prevEl: '.join_leBu'
            }
          },
          newList:[
            {img:require("../../images/c2_9.png"),ti:"COCO CLUB  V卡专享",te:"<p>生日特权：生日当日享免费停车2小时</p><p>生日当日消费享2倍积分（如遇多倍积分活动，二选其一，不可叠加）</p><p>出行特权：（V卡每车每日每项目限享一次停车优惠）</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;积分可兑换停车券</p><p>积分特权：会员积分兑礼</p>"},
            {img:require("../../images/c2_9.png"),ti:"COCO CLUB  V卡专享",te:"<p>生日特权：生日当日享免费停车2小时</p><p>生日当日消费享2倍积分（如遇多倍积分活动，二选其一，不可叠加）</p><p>出行特权：（V卡每车每日每项目限享一次停车优惠）</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;积分可兑换停车券</p><p>积分特权：会员积分兑礼</p>"},
            {img:require("../../images/c2_9.png"),ti:"COCO CLUB  V卡专享",te:"<p>生日特权：生日当日享免费停车2小时</p><p>生日当日消费享2倍积分（如遇多倍积分活动，二选其一，不可叠加）</p><p>出行特权：（V卡每车每日每项目限享一次停车优惠）</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;积分可兑换停车券</p><p>积分特权：会员积分兑礼</p>"},
            {img:require("../../images/c2_9.png"),ti:"COCO CLUB  V卡专享",te:"<p>生日特权：生日当日享免费停车2小时</p><p>生日当日消费享2倍积分（如遇多倍积分活动，二选其一，不可叠加）</p><p>出行特权：（V卡每车每日每项目限享一次停车优惠）</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;积分可兑换停车券</p><p>积分特权：会员积分兑礼</p>"},
            {img:require("../../images/c2_9.png"),ti:"COCO CLUB  V卡专享",te:"<p>生日特权：生日当日享免费停车2小时</p><p>生日当日消费享2倍积分（如遇多倍积分活动，二选其一，不可叠加）</p><p>出行特权：（V卡每车每日每项目限享一次停车优惠）</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;积分可兑换停车券</p><p>积分特权：会员积分兑礼</p>"}
          ]
        }
      },
      methods: {       
        showBlock() { //显示新闻组件
          this.$store.commit('showBlock')
        }
      }
    }
  </script>