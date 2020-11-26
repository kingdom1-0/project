<template>
  <div class="bus_content">
    <div class="rev_content">
        <div class="rev_conBlock">
            <div class="rev_dataBlock">
                <div class="rev_bgBl"><img :src="calendar.bgImg"/></div>
                <div class="revB_content">
                  <div class="layui-inline" id="test-n1"></div>
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
                <a href="javascript:;" class="rev_more">查看详情</a>
            </div>
            <div class="clear"></div>
        </div>
        <div class="act_context rev_swiperBl">
            <div class="swiper-container sw03">
                <div class="swiper-wrapper">

                </div>
            </div>
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
        calendar:{
          bgImg:require("../../images/c1_1.png"),
          img:require("../../images/9_1.jpg"),
          year:"2020月09日",
          day:"18"
        }       
      }
    },
    methods: {
     
    },
    mounted:function(){
      // laydate.render({
      //   elem: '#test-n1'
      //   ,position: 'static'
      // });
    }
  }
</script>

