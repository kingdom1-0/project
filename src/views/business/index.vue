<template>
    <div class="bus_content">
        <div class="busI_content">
            <div class="busI_ul">
                <a href="javascript:;" :class="{'busI_li':true,'cur':n==on}" v-for="(magLi,n) in magUl" :key="magLi.id"
                    @mouseenter="showBlock(n)">{{magLi.fl}}</a>
            </div>
            <div class="busI_conBlock" id="img_width">
                <div class="busI_ulBl">
                    <div class="busI_liBl" v-for="(magLi,n) in magUl" :key="magLi.id">
                        <transition name="fade" v-if="n==on">
                            <div>
                                <div class="busI_imgBl"><img :src="magLi.img" /></div>
                                <div class="busB_ul">
                                    <div class="busB_li" :sid="blLi.id" @click="backData()" v-for="(blLi,i) in magLi.ul"
                                        :key="blLi.id"
                                        :style="{width:blLi.width*m+'px',height:blLi.height*m+'px',left:blLi.left*m+'px',top:blLi.top*m+'px'}"
                                        @mouseenter="showStore(i)" @mouseout="hideStore">
                                        {{blLi.daWidth}}
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
                <transition name="fadeDown">
                    <div class="busI_block" v-if="bl"
                        :style="{width:thisStore().width*m+'px',height:thisStore().height*m+'px',left:(parseInt(thisStore().left)+parseInt(thisStore().width)/2)*m+'px',top:(parseInt(thisStore().top) - parseInt(thisStore().height)/2)*m+'px'}">
                        <div class="busI_InnBlock">
                            <div class="busI_logo"><img :src="thisStore().img"></div>
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
    import bus from "../event/index" //事件总线
    export default {
        data() {
            return {
                on: 0, //楼层索引
                m: 1, //楼层图与原图比例
                sN: 0, //触发示块索引
                bl: false, //店铺块显           
                magUl: []
            }
        },
        methods: {
            showBlock: function (n) { //显示地图块
                this.on = n;
            },
            backReImg: () => { //返回图片与原图的比例
                return document.getElementById("img_width").offsetWidth / 1126
            },
            showStore: function (i) { //显示店铺块
                this.bl = true;
                this.sN = i;
            },
            hideStore: function () { //隐藏店铺块
                this.bl = false;
            },
            thisStore: function () { //返回当前店铺信息
                return this.magUl[this.on].ul[this.sN]
            },
            backData: function () {
                //显示店铺详情页（事件总线）
                bus.$emit('data', {
                    showDa: true,
                    logo: this.thisStore().img,
                    ti: this.thisStore().ti,
                    lo: this.thisStore().store,
                    sort: this.thisStore().sort,
                    text: this.thisStore().text,
                    imgUl: this.thisStore().imgul.split(",")
                })
            }
        },
        created() {
            let _this = this;
            /*node数据接口
            （floor(楼层数据)，sort（店铺分类）,store(店铺数据)）   
            （来自于public/db.js）*/
            this.$http.get('business')
                .then(function (res) { //get到数据并拼接
                    _this.magUl = res.data.data;
                    for (var i = 0; i < _this.magUl.length; i++) {
                        _this.magUl[i].ul = res.data.store.filter(function (item) {
                            return item.pId == (i + 1)
                        })
                    }
                    if (location.href.indexOf("sid=") > 0) { //传参显示店铺信息
                        var sid = parseInt(location.href.split("sid=")[1])
                        var thisStore = res.data.store[sid - 1]
                        _this.on = thisStore.pId - 1;
                        var storeAr = _this.magUl[_this.on].ul;
                        for (var n = 0; n < storeAr.length; n++) {
                            if (storeAr[n].id == sid) {
                                _this.sN = n;
                            }
                        }
                        _this.bl = true;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        mounted() {
            const _this = this; //存储上下文
            _this.m = _this.backReImg();
            window.onresize = function () { //窗口变化
                _this.m = _this.backReImg(); //楼层图与原图比例
            }
        }
    }

</script>
<style>
    .busB_li {
        background: rgba(0, 0, 0, 0.1);
    }

</style>
