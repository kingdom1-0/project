<template>
  <div class="bus_content me_top">
    <div class="bus_conBlock">
      <div class="bus_content">
        <div class="con_content">
          <div class="con_imgBlock">
            <div class="con_tiBl">
              <div class="con_w"></div>
              <div class="con_ti">
                GALAXY<br />COCO City
              </div>
            </div>
            <div class="con_imgBl">
              <img :src="da.img">
            </div>
          </div>
          <div class="con_textBlock">
            <div class="con_tCh">{{da.title}}</div>
            <div class="con_tEn">{{da.enTitle}}</div>
            <div class="con_wi"></div>
            <div class="con_te">
              {{da.text}}
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        da: {}
      }
    },
    mounted: function () {
      this.$http.get('synopsis').then((res) => {
        this.da = res.data[0]
      })
    }
  }

</script>
