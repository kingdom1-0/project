<template>
  <div class="bus_content me_top">
    <div class="bus_conBlock">
      <div class="con_img">
        <img
          class="img_node"
          :src="img"
        >
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: ''
      }
    },
    created: function () {
      this.$http.get('conversion').then((res) => {
        if (res.data.length > 0) {
          this.img = res.data[0].img
        }
      })
    }
  }

</script>
