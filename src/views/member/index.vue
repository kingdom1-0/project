<template>
    <div class="bus_content me_top">
      <div class="bus_conBlock">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="li in newList" :key="li.id">
              <div class="mem_conBlock Inn_button"  @click="showBlock()">
                <div class="mem_img"><img :src="li.img" /></div>
                <div class="mem_ti">{{li.te}}</div>
                <div class="mem_date">{{li.date}}</div>
                <div class="mem_ico"></div>
            </div>
          </swiper-slide>          
        </swiper>        
        <div class="sw_button mem_button">
          <div class="sw_leBu"></div>
          <div class="sw_riBu"></div>
          <div class="sw_wi"></div>
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
            navigation: {
              nextEl: '.sw_riBu',
              prevEl: '.sw_leBu'
            }
          },
          newList:[
            {img:require("../../images/c2_8.jpg"),te:"新停车优惠政策",date:"2020-09-10"},
            {img:require("../../images/c2_8.jpg"),te:"新停车优惠政策1",date:"2020-09-10"},
            {img:require("../../images/c2_8.jpg"),te:"新停车优惠政策2",date:"2020-09-10"},
            {img:require("../../images/c2_8.jpg"),te:"新停车优惠政策3",date:"2020-09-10"},
            {img:require("../../images/c2_8.jpg"),te:"新停车优惠政策4",date:"2020-09-10"}
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
  