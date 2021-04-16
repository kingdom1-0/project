<template>
    <div class="com_content">
        <div class="com_bgImg bgImg_1">
            <img class="b6_1" src="../../images/6_1.png" />
            <img class="b6_2" src="../../images/6_2.png" />
            <img class="b6_3" src="../../images/6_3.png" />
        </div>
        <div class="com_conBlock">
            <div class="bus_ul">
                <router-link to="/activity" class="bus_li">活动资讯</router-link>
                <router-link to="/activity/review" class="bus_li"><span @click="initCh">活动回顾</span>
                </router-link>
                <div class="clear"></div>
            </div>
            <transition name="fad">
                <router-view ref="child"></router-view>
            </transition>
        </div>
        <news-content></news-content>
    </div>
</template>

<script>
    import newsContent from "../components/news.vue"
    export default {
        methods: {
            initCh: function () {
                this.$refs.child.bo = false //通过ref操作子组件
            }
        },
        components: {
            newsContent
        }
    }

</script>
