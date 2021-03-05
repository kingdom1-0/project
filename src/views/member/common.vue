<template>
    <div class="com_content">
        <div class="com_bgImg bgImg_1">
            <img class="b9_2" src="../../images/c9_2.png">
            <img class="b9_4" src="../../images/c9_4.png">
        </div>
        <div class="com_conBlock">
            <div class="bus_ul">
                <router-link to="/member" class="bus_li">会员活动</router-link>
                <router-link to="/member/join" class="bus_li">加入会员</router-link>
                <router-link to="/member/notice" class="bus_li">会员须知</router-link>
                <router-link to="/member/conversion" class="bus_li">积分兑换</router-link>
                <router-link to="/member/message" class="bus_li">留言板</router-link>
                <div class="clear"></div>
            </div>
            <transition name="fad">
                <router-view @showDa="showDa" ref="child"></router-view>
            </transition>
        </div>
        {{shNum}}
        <news-content :show="shNum"></news-content>
    </div>
</template>

<script>
    import newsContent from "../components/news.vue" //引入新闻弹出组件
    export default {
        data() {
            return {
                shNum: false
            }
        },
        methods: {
            showDa: function (val) { //显示弹出层
                this.shNum = val;
            }
        },
        components: { //调用组件
            newsContent
        }
    }

</script>
