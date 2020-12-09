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
          <div v-show="false">{{text}}</div>
          <input type="text" v-pin="200" v-show="false">
        </div>          
      </div>
  </div>
  </template>
  <script>
    //import  bus from "../event/index"
    var mixin = { //自定义混入对象
      data:function(){
        return {
          text:"文件文本"
        }
      }
    }
    export default {    
      mixins: [mixin],  //混入
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
          ],
          newList:[
          {ti:'睦邻社区悠乐计划',te:'100余社区，超180场主题活动，天奕星河COCO City将爱与惊喜送到千家万户。',img:require("../../images/9_1.jpg"),year:'2020',date:'09-17'},
          {ti:'睦邻社区悠乐计划',te:'100余社区，超180场主题活动，天奕星河COCO City将爱与惊喜送到千家万户。',img:require("../../images/9_1.jpg"),year:'2020',date:'09-17'},
          {ti:'睦邻社区悠乐计划',te:'100余社区，超180场主题活动，天奕星河COCO City将爱与惊喜送到千家万户。',img:require("../../images/9_1.jpg"),year:'2020',date:'09-17'},
          {ti:'睦邻社区悠乐计划',te:'100余社区，超180场主题活动，天奕星河COCO City将爱与惊喜送到千家万户。',img:require("../../images/9_1.jpg"),year:'2020',date:'09-17'}
        ],
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
      directives:{  //指令  v-focus        
        pin:{
          bind:function(el,binding){
            el.style.position = "absolute";
            el.style.top = binding.value + "px"
          }
        }
      }
    }
  </script>
  