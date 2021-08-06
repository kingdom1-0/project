<template>
    <div class="bus_content me_top">
        <div class="tra_content">
            <div class="tra_ulBl">
                <div class="tra_liBl">
                    <div class="tra_ico"><img src="/images/b4_3.png"></div>
                    <div class="tra_te">
                        {{da.title}}
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="tra_liBl">
                    <div class="tra_ico"><img src="/images/b4_4.png"></div>
                    <div class="tra_te" v-html="da.value"></div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="tra_img" v-html="da.value2"></div>
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
            this.$http.get('traffic').then((res) => {
                this.da = res.data[0]
            })
        }
    }

</script>
