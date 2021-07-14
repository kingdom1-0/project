<template>
    <div class="com_content">
        <div class="com_bgImg bgImg_1">
            <img class="b6_1" src="../../images/6_1.png" />
            <img class="b6_2" src="../../images/6_2.png" />
            <img class="b6_3" src="../../images/6_3.png" />
        </div>
        <div class="com_conBlock">
            <div class="bus_ul">
                <router-link :to="item.href" :class="{bus_li:true,'current':n==active}" v-for="(item,n) in nav"
                    :key="item.id">{{item.name}}
                </router-link>
                <div class="clear"></div>
            </div>
            <transition name="fad">
                <router-view @showDa="showDa"></router-view>
            </transition>
        </div>
        {{shNum}}
        <alert-content :show="shNum"></alert-content>
    </div>
</template>

<script>
    import alertContent from "../components/alert.vue"
    export default {
        data() {
            return {
                shNum: false,
                active: 0,
                nav: [{
                    id: 1,
                    name: '楼层导视',
                    href: '/business/'
                }, {
                    id: 2,
                    name: '品牌展示',
                    href: '/business/brand'
                }, {
                    id: 3,
                    name: '商家介绍',
                    href: '/business/merchant'
                }]
            }
        },
        methods: {
            toBrand: function () {
                //this.$router.push({ path: '/business/brand',query:{on:"2"}})  //编程式导航
                this.$router.push({
                    name: 'brand',
                    params: {
                        on: "2"
                    }
                }) //编程式动态导 

            },
            showDa: function (val) {
                this.shNum = val;
            },
            navActive: function () {
                var href = location.href;
                if (href.includes("/business/brand")) {
                    this.active = 1;
                } else if (href.includes("/business/merchant")) {
                    this.active = 2;
                } else {
                    this.active = 0;
                }
            }
        },
        created() {
            this.navActive();
        },
        components: {
            alertContent
        },
        watch: {
            $route() {
                this.navActive();
            }
        }
    }

</script>
