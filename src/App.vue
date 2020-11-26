<template>
  <div id="app">
    <Header></Header>
    <div class="ind_content" :style="{height:windHeight+'px'}">
      <router-view @footerDa="footerFun" :clDa="foBl"></router-view> <!-- da 向子组件传值 -->
    </div>
    <Footer :da="foBl" @closeDa="closeFooter"></Footer>
  </div>
</template>

<style>
</style>
<script>
    import Header from "./views/Shared/Header.vue" //引入页头
    import Footer from "./views/Shared/Footer.vue" //引入页尾

    export default {      
      data () {
        return {
          windHeight:window.innerHeight,  //屏幕高度
          foBl:false
        }
      },
      methods: {
        footerFun:function(val){
          this.foBl = val
        },
        closeFooter:function(val){
          this.foBl = val;
        }
      },
      mounted () {                  
        const vmThis = this; //存储this指向
        window.onresize = function(){  //自适应高度
          vmThis.windHeight = window.innerHeight
        }

      },
      components: {  //注册
        Header,
        Footer
      }
    }
</script>