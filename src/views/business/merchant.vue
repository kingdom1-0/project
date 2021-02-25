<template>
  <div class="bus_content">
    <div class="bus_conBlock">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide  v-for="s in store" :key="s.id">
          <div class="bus_block" @click="showBlock">
              <a href="javascript:;" class="bus_img"><img :src="s.logo" /></a>
              <div class="bus_teBl">
                  <a href="javascript:;" class="bus_ti">{{s.name}}</a>                  
                  <router-link :to="s.href" class="bus_aBl">店铺号:<span>{{s.lo}}</span></router-link>
              </div>
          </div>
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
        store:[]
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
    created () {
      let _this = this;
      this.$http.get("ajax/merchant.json").then(function(re){
         _this.store = re.data;
      }).catch(function(err){
        console.log(err)
      })
    }
  }
</script>

