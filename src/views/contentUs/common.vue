<template>
  <div class="com_content">
    <div class="com_bgImg bgImg_6">
      <img class="b5_6" src="../../images/b5_6.png">
  </div>
      <div class="com_conBlock">              
          <div class="bus_ul">                
              <router-link to="/contentUs" class="bus_li">项目简介</router-link>
              <router-link to="/contentUs/traffic" class="bus_li">交通指南</router-link>
              <router-link to="/contentUs/attract" class="bus_li">招商租赁</router-link>
              <router-link to="/contentUs/site" class="bus_li">场地合作</router-link>
              <router-link to="/contentUs/contactUs" class="bus_li">联系我们</router-link>
              <div class="clear"></div>
          </div>
          <transition name="fad">
            <router-view @showDa="showDa" ref="child"></router-view>  
          </transition>          
      </div>
      {{shNum}}
      <Alert :show="shNum"></Alert>
</div>
</template>

<script>
  import Alert from "../Shared/news.vue"  //引入新闻弹出组件
  export default {
      data () {
          return {
              shNum:false      
          }
      },
      methods: {           
          showDa:function(val){   //显示弹出层
              this.shNum = val;     
          }
      },
      components: {   //调用组件
          Alert
      }
  }
</script>