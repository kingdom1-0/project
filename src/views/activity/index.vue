<template>
    <div class="bus_content">
      <div class="bus_conBlock">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="li in newList" :key="li.id">
            <a href="javascript:;" class="act_block Inn_button" @click="showBlock()">
              <div class="act_img"> <img :src="li.img"> </div>
              <div class="act_teBlock">
                <div class="act_date">
                  <div class="act_year">{{li.year}}</div>
                  <div class="act_day">{{li.date}}</div>
                </div>
                <div class="act_teBl">
                  <div class="act_ti">{{li.ti}}</div>
                  <div class="act_bu"></div>
                  <div class="act_te">{{li.te}}</div>
                </div>
                <div class="clear"></div>
              </div>
            </a>
          </swiper-slide>
        </swiper>
        <div class="sw_button">
          <div class="sw_leBu"></div>
          <div class="sw_riBu"></div>
        </div>          
      </div>
  </div>
  </template>
  <script>   
    //import  bus from "../event/index"
    export default {    
      data() {
        return {
          swiperOption: {
            slidesPerView: 4,
            navigation: {
              nextEl: '.sw_riBu',
              prevEl: '.sw_leBu'
            }
          },
          info: null,          
          newList:[],
        }
      },
      methods: {
        backData:function(){
            //事件总线发送数据
            //bus.$emit("showDa",true)
        },
        showBlock() {
          this.$store.commit('showBlock')
        }
      },     
      mounted () {
        let _this = this;
        this.$http.get('ajax/activity.json')  //axios
        .then(function (response) {
             _this.newList = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  </script>
  