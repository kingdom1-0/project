<template>
  <div class="bus_content">
    <div class="site_ti">{{da.title}}</div>
    <div class="site_phone" v-html="da.value"></div>
    <div class="bus_conBlock">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(img,n) in da.images" :key="n">
          <div class="site_img"><img :src="img"></div>
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
        da: {}
      }
    },
    mounted() {
      this.$http.get("site").then((res) => {
        this.da = res.data[0];
        this.da.images = this.da.images.split(",")
        console.log(this.da)
      })
    }
  }

</script>
