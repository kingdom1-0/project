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
                magUl:[//地图信息
                    {
                        fl:"1L",//楼层
                        img:require('../../images/061.jpg'),//楼层图
                        ul:[//触发块信息(宽，高，x , y , 店铺图，店铺名，店铺号，店铺分类)
                            {width:"48",height:"70",left:"373",top:"136",Img:require('../../images/4_4.jpg'),ti:"屈臣氏1",store:"1L11",sort:"美容/护理1"},
                            {width:"48",height:"70",left:"507",top:"206",Img:require("../../images/4_41.jpg"),ti:"屈臣氏2",store:"1L12",sort:"美容/护理2"},
                            {width:"48",height:"35",left:"382",top:"289",Img:require("../../images/4_4.jpg"),ti:"屈臣氏3",store:"1L13",sort:"美容/护理3"}
                        ]
                    },
                    {
                        fl:"2L",
                        img:require('../../images/06.jpg'),
                        ul:[
                            {width:"48",height:"70",left:"507",top:"206",Img:require("../../images/4_41.jpg"),ti:"屈臣氏2",store:"1L12",sort:"美容/护理2"},
                            {width:"48",height:"35",left:"382",top:"289",Img:require("../../images/4_4.jpg"),ti:"屈臣氏3",store:"1L13",sort:"美容/护理3"}
                        ]
                    },
                    {
                        fl:"3L",
                        img:require('../../images/07.jpg'),
                        ul:[
                            {width:"48",height:"70",left:"373",top:"136",Img:require('../../images/4_4.jpg'),ti:"屈臣氏1",store:"1L11",sort:"美容/护理1"},
                            {width:"48",height:"70",left:"507",top:"206",Img:require("../../images/4_41.jpg"),ti:"屈臣氏2",store:"1L12",sort:"美容/护理2"},
                            {width:"48",height:"35",left:"382",top:"289",Img:require("../../images/4_4.jpg"),ti:"屈臣氏3",store:"1L13",sort:"美容/护理3"}
                        ]
                    },
                    {
                        fl:"4L",
                        img:require('../../images/08.jpg'),
                        ul:[
                            {width:"48",height:"70",left:"373",top:"136",Img:require('../../images/4_4.jpg'),ti:"屈臣氏1",store:"1L11",sort:"美容/护理1"},
                            {width:"48",height:"35",left:"382",top:"289",Img:require("../../images/4_4.jpg"),ti:"屈臣氏3",store:"1L13",sort:"美容/护理3"}
                        ]
                    },
                    {
                        fl:"5L",
                        img:require('../../images/09.jpg'),
                        ul:[
                            {width:"48",height:"70",left:"373",top:"136",Img:require('../../images/4_4.jpg'),ti:"屈臣氏5",store:"1L11",sort:"美容/护理1"},
                            {width:"48",height:"70",left:"507",top:"206",Img:require("../../images/4_41.jpg"),ti:"屈臣氏6",store:"1L12",sort:"美容/护理2"}
                        ]
                    }
                ]                
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
        mounted () {
            const _this = this;  //存储上下文
            _this.m = _this.backReImg();
            window.onresize = function(){//窗口变化
                _this.m = _this.backReImg();   //楼层图与原图比例
            }
        }
    }
</script>