<template>
  <div class="bus_content">
    <div class="con_content">
      <div class="con_imgBlock">
        <div class="con_imgBl">
          <img :src="da.img">
        </div>
      </div>
      <div class="att_teBlock">
        <div class="att_ti">
          {{ da.title }}
        </div>
        <div class="att_teBl">
          <div
            class="att_te"
            v-html="da.value"
          />
        </div>
      </div>
      <div class="clear" />
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
      this.$http.get('attract').then((res) => {
        this.da = res.data[0]
      })
    }
  }

</script>
