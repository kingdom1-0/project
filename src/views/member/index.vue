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
            slidesPerView: 3,
            navigation: {
              nextEl: '.sw_riBu',
              prevEl: '.sw_leBu'
            }
          },
          newList:[]
        }
      },
      methods: {       
        showBlock() { //显示新闻组件
          this.$store.commit('showBlock')
        }
      },
      created () {
        var _this = this;
        this.axios.get("ajax/member.json").then(function(re){
          _this.newList = re.data;
        }).catch(function(err){
          console.log(err);
        })
      }

    }
  </script>
  