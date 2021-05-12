<template>
  <div class="bus_content">
    <div class="bus_conBlock">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(li,i) in newList" :key="li.id">
          <a href="javascript:;" class="act_block Inn_button" @click="showBlock(i)">
            <div class="act_img"> <img :src="li.img"> </div>
            <div class="act_teBlock">
              <div class="act_date">
                <div class="act_year">{{li.date.slice(0,4)}}</div>
                <div class="act_day">{{li.date.slice(5,10)}}</div>
              </div>
              <div class="act_teBl">
                <div class="act_ti">{{li.title}}</div>
                <div class="act_bu"></div>
                <div class="act_te" v-html="li.text"></div>
              </div>
              <div class="clear"></div>
            </div>
          </a>
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
        info: null,
        newList: [],
      }
    },
    methods: {
      showBlock(i) {
        this.$store.commit("showNews", { //vuex
          on: true,
          data: this.newList[i]
        })
      },
      getNews() {
        let _this = this;
        this.$http.get('news') //axios
          .then(function (res) {
            _this.newList = res.data.data
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted() {
      this.getNews();
    }
  }

</script>
