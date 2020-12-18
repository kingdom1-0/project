<template>
    <div class="bus_content">
      <div class="bus_conBlock">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="li in newList" :key="li.id">
            <div class="site_img"><img :src="li.img"></div>
          </swiper-slide>
        </swiper>
        <div class="sw_button">
          <div class="sw_leBu"></div>
          <div class="sw_riBu"></div>
          <div v-show="false">{{text}}</div>
          <input type="text" v-pin="200" v-show="false">
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
            slidesPerView: 4,
            navigation: {
              nextEl: '.sw_riBu',
              prevEl: '.sw_leBu'
            }
          },
          newList:[
          {img:require("../../images/c3_8.jpg")},
          {img:require("../../images/c3_8.jpg")},
          {img:require("../../images/c3_8.jpg")},
          {img:require("../../images/c3_8.jpg")},
          {img:require("../../images/c3_8.jpg")}
        ],
        }
      },
      methods: {       
        showBlock() {
          this.$store.commit('showBlock')
        }
      }      
    }
  </script>
  