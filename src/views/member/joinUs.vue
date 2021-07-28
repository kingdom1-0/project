<template>
  <div class="bus_content me_top">
    <div class="bus_conBlock">
      <div class="join_context">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="li in newList" :key="li.id">
            <div class="join_block">
              <div class="join_img"><img class="img_node" src="/images/9_7.png"></div>
              <div class="join_teBl">
                <div class="join_ti">{{li.ti}}</div>
                <div class="join_vip"><img :src="li.img"></div>
                <div class="join_te" v-html="li.value">

                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="join_leBu"></div>
        <div class="join_riBu"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        swiperOption: {
          loop: true,
          slidesPerView: 3,
          centeredSlides: true,
          navigation: {
            nextEl: '.join_riBu',
            prevEl: '.join_leBu'
          }
        },
        newList: []
      }
    },
    methods: {
      showBlock() { //显示新闻组件
        this.$store.commit('showBlock')
      }
    },
    created() {
      var _this = this;
      this.$http.get("joinUs").then(function (re) {
        _this.newList = re.data;
      }).catch(function (err) {
        console.log(err);
      })
    }
  }

</script>
