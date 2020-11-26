<template>
    <div class="com_content">
        <div class="com_bgImg bgImg_1">
            <img class="b6_1" src="../../images/6_1.png"/>
            <img class="b6_2" src="../../images/6_2.png"/>
            <img class="b6_3" src="../../images/6_3.png"/>
        </div>
        <div class="com_conBlock">              
            <div class="bus_ul">                
                <router-link to="/business" class="bus_li">楼层导视</router-link>
                <router-link to="/business/brand" class="bus_li">品牌展示</router-link>
                <!-- <a class="bus_li" @click="toBrand">品牌展示</a> -->
                <router-link to="/business/merchant" class="bus_li">商家介绍</router-link>
                <div class="clear"></div>
            </div>
            <router-view @showDa="showDa"></router-view>            
        </div>
        {{shNum}}
        <Alert :show="shNum"></Alert>
</div>
</template>

<script>
    import Alert from "../Shared/alert.vue"
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
                console.log(this.shNum)
            }

        },
        components: {
            Alert
        }
    }
</script>