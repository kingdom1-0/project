<template>
  <div class="bus_content me_top">
    <div class="bus_conBlock">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(li,i) in newList" :key="li.id">
          <div class="mem_conBlock Inn_button" @click="showBlock(i)">
            <div class="mem_img"><img :src="li.img" /></div>
            <div class="mem_ti">{{li.title}}</div>
            <div class="mem_date">{{li.date.slice(0,10)}}</div>
            <div class="mem_ico"></div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="sw_button mem_button">
        <div class="sw_leBu"></div>
        <div class="sw_riBu"></div>
        <div class="sw_wi"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          navigation: {
            nextEl: '.sw_riBu',
            prevEl: '.sw_leBu'
          }
        },
        newList: [{
          date: ""
        }]
      }
    },
    methods: {
      showBlock(i) { //显示新闻组件
        this.$store.commit("showNews", { //vuex
          on: true,
          data: this.newList[i]
        })
      }
    },
    created() {
      var _this = this;
      this.$http.get("http://127.0.0.1:2101/api/v1/active").then(function (re) {
        _this.newList = re.data.data;
        console.log(re.data)
      }).catch(function (err) {
        console.log(err);
      })
    }

  }

</script>
