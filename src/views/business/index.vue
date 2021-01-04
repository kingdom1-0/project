<template>
    <div class="bus_content">
        <div class="busI_content">
            <div class="busI_ul">
                <a href="javascript:;" :class="{'busI_li':true,'cur':n==on}" v-for="(magLi,n) in magUl" :key="magLi.id" @mouseenter="showBlock(n)">{{magLi.fl}}</a>             
            </div>
            <div class="busI_conBlock" id="img_width">
                <div class="busI_ulBl">                    
                    <div class="busI_liBl" v-for="(magLi,n) in magUl" :key="magLi.id" >   
                        <transition name="fade" v-if="n==on">
                            <div>
                                <div class="busI_imgBl" ><img :src="magLi.img"/></div>
                                <div class="busB_ul">
                                    <div class="busB_li" @click="backData()" v-for="(blLi,i) in magLi.ul" :key="blLi.id" :style="{width:blLi.width*m+'px',height:blLi.height*m+'px',left:blLi.left*m+'px',top:blLi.top*m+'px'}" @mouseenter="showStore(i)" @mouseout="hideStore">
                                        {{blLi.daWidth}}
                                    </div>                                    
                                </div>
                            </div>                            
                        </transition>  
                    </div>
                </div>
                <transition name="fadeDown">
                    <div class="busI_block" v-if="bl" :style="{width:thisStore().width*m+'px',height:thisStore().height*m+'px',left:(parseInt(thisStore().left)+parseInt(thisStore().width)/2)*m+'px',top:(parseInt(thisStore().top) - parseInt(thisStore().height)/2)*m+'px'}">
                        <div class="busI_InnBlock">
                            <div class="busI_logo"><img :src="thisStore().Img"></div>
                            <div class="busI_teBl">
                                <div class="busI_name">{{thisStore().ti}}</div>
                                <div class="busI_Shop">店铺号：<span>{{thisStore().store}}</span></div>
                                <div class="busI_sort">类别：<span>{{thisStore().sort}}</span></div>
                            </div>
                            <div class="busI_ico"></div>
                        </div>								
                    </div>
                </transition>                
            </div>
        </div>
    </div>  
</template>

<script>
    import  bus from "../event/index"

    export default {
        data () {
            return {
                on:0,//楼层索引
                m:1,//楼层图与原图比例
                sN:0,//触发块索引
                bl:false, //店铺块显示           
                magUl:[]                
            }
        },
        methods: {
            showBlock:function(n){//显示地图块
                this.on = n;
            },
            backReImg:() => { //返回图片与原图的比例
                return document.getElementById("img_width").offsetWidth / 1126
            },
            showStore:function(i){ //显示店铺块
                this.bl = true;
                this.sN = i;
            },
            hideStore:function(){ //隐藏店铺块
                this.bl = false;
            },
            thisStore:function(){   //返回当前店铺信息
                return this.magUl[this.on].ul[this.sN]
            },
            backData:function(){
                //事件总线发送数据
                bus.$emit("showDa",true)
            }
        },
        created () {
            let _this = this;
            // this.axios.get('ajax/business.json')  //axios
            // .then(function (response) {
            //     console.log(response.data)
            //     _this.magUl = response.data
            // })
            // .catch(function (error) {
            // console.log(error);
            // });

            this.axios.get('http://127.0.0.1:2101/business')  //node数据接口   （来自于db.js）
            .then(function (response) {
                console.log(response.data.data)
                _this.magUl = response.data.data
            })
            .catch(function (error) {
            console.log(error);
            });
            
        },
        mounted () {
            const _this = this;  //存储上下文
            _this.m = _this.backReImg();
            window.onresize = function(){//窗口变化
                _this.m = _this.backReImg();   //楼层图与原图比例
            }
        }
    }
</script>