<template>
    <div class="com_content">
        <div class="com_bgImg bgImg_1">
            <img class="b6_1" src="../../images/6_1.png"/>
            <img class="b6_2" src="../../images/6_2.png"/>
            <img class="b6_3" src="../../images/6_3.png"/>
        </div>
        <div class="com_conBlock">              
            <div class="bus_ul">                
                <router-link to="/activity" class="bus_li">活动资讯</router-link>
                <router-link to="/activity/review" class="bus_li"><span @click="initCh">活动回顾</span></router-link>
                <div class="clear"></div>
            </div>
            <router-view @showDa="showDa" ref="child"></router-view>            
        </div>
        {{shNum}}
        <Alert :show="shNum"></Alert>
</div>
</template>

<script>
    import Alert from "../Shared/news.vue"
    export default {
        data () {
            return {
                shNum:false      
            }
        },
        methods: {
            toBrand:function(){
                //this.$router.push({ path: '/business/brand',query:{on:"2"}})  //编程式导航
                this.$router.push({ name: 'brand',params:{on:"2"}})     //编程式动态导 
                
            },
            showDa:function(val){
                this.shNum = val;     
            },
            initCh:function(){
                this.$refs.child.bo = false //通过ref操作子组件
            }
        },
        components: {
            Alert
        }
    }
</script>