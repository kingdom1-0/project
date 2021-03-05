<template>
  <div id="app">
    <header-content></header-content>
    <div class="ind_content" :style="{height:windHeight+'px'}">
      <transition name="fad">
        <router-view @footerDa="footerFun" :clDa="foBl"></router-view> <!-- da 向子组件传值 -->
      </transition>
    </div>
    <footer-content :da="foBl" @closeDa="closeFooter"></footer-content>
  </div>
</template>
<style>
</style>
<script>
  import headerContent from "./views/components/Header.vue" //引入页头
  import footerContent from "./views/components/Footer.vue" //引入页尾

  export default {
    data() {
      return {
        windHeight: window.innerHeight, //屏幕高度
        foBl: false
      }
    },
    methods: {
      footerFun: function (val) {
        this.foBl = val
      },
      closeFooter: function (val) {
        this.foBl = val;
      }
    },
    mounted() {
      const vmThis = this; //存储this指向
      window.onresize = function () { //自适应高度
        vmThis.windHeight = window.innerHeight
      }

    },
    components: { //注册
      headerContent,
      footerContent
    }
  }

</script>
