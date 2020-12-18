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
            {img:require("../../images/c2_9.png"),ti:"申办",te:"<p><span>COCO Club &nbsp;V卡：关注官方微信，注册并验证成功，即可成为COCO Club V卡会员；</span></p><p><span>COCO Club &nbsp;金卡：当日累计消费满3000元，或有效期内累计消费满2万元，可升级为金卡会员。（团购除外）</span></p><p><span>COCO Club &nbsp;黑钻卡：当日消费累计3万元或有效期内累计消费满8万元，可升级为黑钻卡会员。（团购除外）</span></p>"},
            {img:require("../../images/c2_9.png"),ti:"申办",te:"<p><span>COCO Club &nbsp;V卡：关注官方微信，注册并验证成功，即可成为COCO Club V卡会员；</span></p><p><span>COCO Club &nbsp;金卡：当日累计消费满3000元，或有效期内累计消费满2万元，可升级为金卡会员。（团购除外）</span></p><p><span>COCO Club &nbsp;黑钻卡：当日消费累计3万元或有效期内累计消费满8万元，可升级为黑钻卡会员。（团购除外）</span></p>"},
            {img:require("../../images/c2_9.png"),ti:"申办",te:"<p><span>COCO Club &nbsp;V卡：关注官方微信，注册并验证成功，即可成为COCO Club V卡会员；</span></p><p><span>COCO Club &nbsp;金卡：当日累计消费满3000元，或有效期内累计消费满2万元，可升级为金卡会员。（团购除外）</span></p><p><span>COCO Club &nbsp;黑钻卡：当日消费累计3万元或有效期内累计消费满8万元，可升级为黑钻卡会员。（团购除外）</span></p>"},
            {img:require("../../images/c2_9.png"),ti:"申办",te:"<p><span>COCO Club &nbsp;V卡：关注官方微信，注册并验证成功，即可成为COCO Club V卡会员；</span></p><p><span>COCO Club &nbsp;金卡：当日累计消费满3000元，或有效期内累计消费满2万元，可升级为金卡会员。（团购除外）</span></p><p><span>COCO Club &nbsp;黑钻卡：当日消费累计3万元或有效期内累计消费满8万元，可升级为黑钻卡会员。（团购除外）</span></p>"},
            {img:require("../../images/c2_9.png"),ti:"申办",te:"<p><span>COCO Club &nbsp;V卡：关注官方微信，注册并验证成功，即可成为COCO Club V卡会员；</span></p><p><span>COCO Club &nbsp;金卡：当日累计消费满3000元，或有效期内累计消费满2万元，可升级为金卡会员。（团购除外）</span></p><p><span>COCO Club &nbsp;黑钻卡：当日消费累计3万元或有效期内累计消费满8万元，可升级为黑钻卡会员。（团购除外）</span></p>"}
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