<template>
  <div class="bus_content">
    <div class="rev_content">
      <div
        v-show="!bo"
        class="rev_conBlock"
      >
        <div class="rev_dataBlock">
          <div class="rev_bgBl">
            <img src="/images/c1_1.png">
          </div>
          <div class="revB_content">
            <el-calendar v-model="value" />
          </div>
        </div>
        <div class="rev_teBlock">
          <div class="rev_ti">
            活动精选
          </div>
          <div class="rev1_block">
            <div class="rev1_img">
              <img :src="newList[0] && newList[0].img">
            </div>
            <div class="rev1_teBl">
              <div class="rev_da">
                {{ newList[0] && newList[0].date.split("-",2).join("-") }}
              </div>
              <div class="rev_day">
                {{ newList[0] && newList[0].date.split("-")[2].split(" ")[0] }}
              </div>
            </div>
            <div class="clear" />
          </div>
          <div class="rev_te" />
          <a
            href="javascript:;"
            class="rev_more"
            @click="bo = true"
          >查看详情</a>
        </div>
        <div class="clear" />
      </div>
      <div
        v-show="bo"
        class="act_context"
      >
        <swiper
          class="swiper"
          :options="swiperOption"
        >
          <swiper-slide
            v-for="(li,i) in newList"
            :key="li.id"
          >
            <a
              href="javascript:;"
              class="act_block Inn_button"
              @click="showBlock(i)"
            >
              <div class="act_img"> <img :src="li.img"> </div>
              <div class="act_teBlock">
                <div class="act_date">
                  <div class="act_year">{{ li.date.slice(0,4) }}</div>
                  <div class="act_day">{{ li.date.slice(5,10) }}</div>
                </div>
                <div class="act_teBl">
                  <div class="act_ti">{{ li.title }}</div>
                  <div class="act_bu" />
                  <div
                    class="act_te"
                    v-html="li.text"
                  />
                </div>
                <div class="clear" />
              </div>
            </a>
          </swiper-slide>
        </swiper>
        <div class="sw_button">
          <div class="sw_leBu" />
          <div class="sw_riBu" />
        </div>
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
        newList: [],
        calendar: {
          date: ''
        },
        bo: false,
        value: new Date()
      }
    },
    mounted() {
      let _this = this
      this.$http.get('news').then((res) => {
        _this.newList = res.data
        console.log(res.data)
      })
    },
    destroyed: function () { // 实例销毁后调用
      this.$nextTick(function () {
        this.bo = false
      })
    },
    methods: {
      showBlock(i) {
        this.$store.commit('showNews', { // vuex
          on: true,
          data: this.newList[i]
        })
      }
    }
  }

</script>
<style>
  .el-calendar {
    padding-top: 20px;
  }

  .el-calendar__title {
    color: #fff;
  }

  .el-calendar-table .el-calendar-day {
    height: 48px;
  }

  .el-calendar__body {
    padding-top: 0px;
  }

</style>
