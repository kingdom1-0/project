<template>
  <div class="bus_content">
    <div class="bus_conBlock">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="s in store" :key="s.id">
          <div class="bus_block" @click="showBlock(s)">
            <a href="javascript:;" class="bus_img"><img :src="s.img" /></a>
            <div class="bus_teBl">
              <a href="javascript:;" class="bus_ti">{{s.ti}}</a>
              <router-link :to="{path:'/business/',query:{sid:s.id}}" class="bus_aBl">店铺号:<span>{{s.store}}</span>
              </router-link>
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
  import bus from "../event/index" //事件总线
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
        store: []
      }
    },
    methods: {
      showBlock(s) { //弹出店铺详情
        bus.$emit('data', {
          showDa: true,
          id: s.id,
          logo: s.img,
          ti: s.ti,
          lo: s.store,
          sort: s.sort,
          text: s.text,
          imgUl: s.imgul.split(",")
        })
      }
    },
    created() {
      let _this = this;
      this.$http.get("business").then(function (re) {
        _this.store = re.data.store;
        //console.log(re.data.store)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }

</script>
