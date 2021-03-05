<template>
    <transition name="fade">
        <div class="alt_content" v-if="sh">
            <div class="alt_bgImg" @click="closeAlert"></div>
            <div class="alt_conBlock">
                <div class="alt_clear" @click="closeAlert"></div>
                <div class="alt_block">
                    <div class="alt_teBlock">
                        <div class="alt_tiBl">
                            <div class="alt_log"><img :src="store.logo" /></div>
                            <div class="alt_tBl">
                                <div class="alt_ti">{{store.ti}}</div>
                                <a href="/business/?lo=2" class="alt_aBl">{{store.lo}}</a>
                                <div class="alt_t">类别：{{store.sort}}</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="alt_te" v-html="store.text">
                        </div>
                    </div>
                    <div class="alt_imgBlock">
                        <div class="alt_swiperBl">
                            <swiper class="swiper vertical" :options="swiperOptionv">
                                <swiper-slide v-for="img in store.imgUl" :key="img.id">
                                    <div class="alt_img"><img :src="img" /></div>
                                </swiper-slide>
                                <div class="pa05" slot="pagination"></div>
                            </swiper>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </transition>

</template>
<script>
    import bus from "../event/index" //事件总线
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                sh: false,
                swiperOptionv: {
                    speed: 800,
                    autoplay: {
                        delay: 3000
                    },
                    pagination: {
                        el: '.pa05',
                        clickable: true
                    }
                },
                store: {
                    logo: "",
                    ti: "",
                    lo: "",
                    sort: "",
                    text: '',
                    imgUl: []
                }
            }
        },
        mounted() {
            //事件总线数据接收
            bus.$on('data', val => {
                this.sh = val.showDa; //显示开送
                this.store = val //弹出块相关数据
            })
            //this.sh = this.$store.state.showDa;
        },
        methods: {
            closeAlert: function () {
                //this.$store.state.showDa = false;
                this.sh = false;
            }
        },
        watch: {
            // '$store.state.showDa': function () { //监听vuex数据
            //     this.sh = this.$store.state.showDa;
            // }
        }
    }

</script>
