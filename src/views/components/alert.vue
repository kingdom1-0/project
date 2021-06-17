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
                                <div @click="sh=false">
                                    <router-link :to="{path:'/business/',query:{sid:store.id}}" class="alt_aBl">
                                        {{store.lo}}
                                    </router-link>
                                </div>
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
                                <swiper-slide v-for="img in store.images" :key="img.id">
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
                    id: "",
                    logo: "",
                    ti: "",
                    lo: "",
                    sort: "",
                    text: '',
                    images: []
                }
            }
        },
        mounted() {
            //事件总线数据接收
            bus.$on('data', val => {
                this.sh = val.showDa; //显示开送
                this.store = val //弹出块相关数据
                console.log(this.store)
            })
        },
        methods: {
            closeAlert: function () {
                this.sh = false;
            }
        }
    }

</script>
