<template>
  <div class="bus_content">
    <div class="co_content">
      <div class="co_img"><img :src="da.img" /></div>
      <div class="co_teBlock">
        <div class="co_ti">{{da.title}}</div>
        <div class="co_ul" v-html="da.value">

        </div>
      </div>
      <div class="clear"></div>
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
    mounted() {
      this.$http('contact').then((res) => {
        this.da = res.data[0]
        console.log(this.da)
      })
    }
  }

</script>
