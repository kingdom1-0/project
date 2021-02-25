<template>
  <div class="bus_content">
    <div class="rev_content">
      <div class="rev_conBlock"  v-show="!bo">
        <div class="rev_dataBlock">
          <div class="rev_bgBl"><img :src="calendar.bgImg" /></div>
          <div class="revB_content">
            <el-calendar v-model="value">
            </el-calendar>
          </div>
        </div>
        <div class="rev_teBlock">
          <div class="rev_ti">活动精选</div>
          <div class="rev1_block">
            <div class="rev1_img"><img :src="calendar.img" /></div>
            <div class="rev1_teBl">
              <div class="rev_da">{{calendar.year}}</div>
              <div class="rev_day">{{calendar.day}}</div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="rev_te">
          </div>
          <a href="javascript:;" class="rev_more" @click="bo = true">查看详情</a>
        </div>
        <div class="clear"></div>
      </div>
      <div class="act_context" v-show="bo">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="li in newList" :key="li.id">
            <a href="javascript:;" class="act_block Inn_button" @click="showBlock()">
              <div class="act_img"> <img :src="li.img"> </div>
              <div class="act_teBlock">
                <div class="act_date">
                  <div class="act_year">{{li.year}}</div>
                  <div class="act_day">{{li.date}}</div>
                </div>
                <div class="act_teBl">
                  <div class="act_ti">{{li.ti}}</div>
                  <div class="act_bu"></div>
                  <div class="act_te">{{li.te}}</div>
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
        newList:[],
        calendar: {},
        bo:false,
        value: new Date()
      }
    },
    methods: {
      showBlock() {
          this.$store.commit('showBlock')
      }
    },
    mounted () {
      let _this = this;
      this.$http.get("ajax/review.json").then(function(re){
        _this.newList =  re.data.newList;
        _this.calendar = re.data.calendar;
      }).catch(function(err){
        console.log(err)
      })
    },
    destroyed: function () {//实例销毁后调用
      this.$nextTick(function () {
         this.bo = false;
      })
    }
  }

</script>
<style>
  .el-calendar {
    background: url();
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
