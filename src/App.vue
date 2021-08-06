<template>
  <div id="app">
    <header-content v-if="showOn"></header-content>
    <div class="ind_content" :style="{height:windHeight}">
      <transition name="fad">
        <router-view @footerDa="footerFun" :clDa="foBl"></router-view> <!-- da 向子组件传值 -->
      </transition>
    </div>
    <footer-content :da="foBl" @closeDa="closeFooter" v-if="showOn"></footer-content>
  </div>
</template>
<style>
</style>
<script>
  import headerContent from './views/components/Header.vue' // 引入页头
  import footerContent from './views/components/Footer.vue' // 引入页尾

  export default {
    data() {
      return {
        windHeight: 'auto', // 屏幕高度
        foBl: false,
        showOn: true
      }
    },
    methods: {
      footerFun: function (val) {
        this.foBl = val
      },
      closeFooter: function (val) {
        this.foBl = val
      }
    },
    mounted: function () {
      var _this = this
      window.addEventListener('resize', function () { // 全屏自适应
        return (() => {
          if (_this.showOn) {
            setTimeout(function () {
              _this.windHeight = window.innerHeight + 'px'
            }, 300)
          }
        })()
      })
    },
    components: { // 注册
      headerContent,
      footerContent
    },
    watch: {
      $route() { // 监控路由
        var _this = this
        var href = this.$route.path
        if (href.indexOf('/manage') > -1) { // 后台控制面版去掉头尾公共块和全屏
          _this.showOn = false
          _this.windHeight = 'auto'
        } else {
          _this.showOn = true
          this.windHeight = window.innerHeight + 'px'
        }
      }
    }
  }

</script>
