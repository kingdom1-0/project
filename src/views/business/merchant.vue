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
          loop:true,
          slidesPerView: 4,
          navigation: {
            nextEl: '.sw_riBu',
            prevEl: '.sw_leBu'
          }
        },
        store:[                  
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯1",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯2",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯3",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯4",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯5",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯1",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯2",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯3",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯4",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯5",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯1",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯2",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯3",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯4",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯5",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯1",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯2",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯3",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯4",lo:"B1c-001",href:"/business?on=2"},
                {logo:require("../../images/4_4.jpg"),name:"阿迪达斯5",lo:"B1c-001",href:"/business?on=2"}
        ]
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
      
    }
  }
</script>

