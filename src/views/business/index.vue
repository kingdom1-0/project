<template>
    <div class="bus_content">
        <div class="busI_content">
            <div class="busI_ul">
                <a href="javascript:;" :class="{'busI_li':true,'cur':n==on}" v-for="(magLi,n) in magUl" :key="magLi.id"
                    @mouseenter="showBlock(n)">{{magLi.title}}</a>
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
                                        :style="{width:blLi.area[2]*m+'px',height:blLi.area[3]*m+'px',left:blLi.area[0]*m+'px',top:blLi.area[1]*m+'px'}"
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
                        :style="{width:thisStore().area[2]*m+'px',height:thisStore().area[3]*m+'px',left:(parseInt(thisStore().area[0])+parseInt(thisStore().area[2])/2)*m+'px',top:(parseInt(thisStore().area[1]) - parseInt(thisStore().area[3])/2)*m+'px'}">
                        <div class="busI_InnBlock">
                            <div class="busI_logo"><img :src="thisStore().img"></div>
                            <div class="busI_teBl">
                                <div class="busI_name">{{thisStore().title}}</div>
                                <div class="busI_Shop">店铺号：<span>{{thisStore().store}}</span></div>
                                <div class="busI_sort">类别：<span>{{thisStore().class}}</span></div>
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
                magUl: [] //店铺数据
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
            backData: function () { //显示店铺详情页 
                bus.$emit('data', { //事件总线
                    showDa: true,
                    logo: this.thisStore().img,
                    ti: this.thisStore().title,
                    lo: this.thisStore().store,
                    sort: this.thisStore().class,
                    text: this.thisStore().value,
                    images: this.thisStore().images.split(",")
                })
            },
            concatDate: function (resFloor, resStore) { //拼接店铺数据
                this.magUl = resFloor.data;
                for (var i = 0; i < this.magUl.length; i++) {
                    this.magUl[i].ul = resStore.data.filter(function (item) {
                        return item.pId == (i + 1)
                    })
                }
                // if (location.href.indexOf("sid=") > 0) { //传参显示店铺信息
                //     var sid = parseInt(location.href.split("sid=")[1])
                //     var thisStore = resStore.data[sid - 1]
                //     console.log(resStore.data[sid - 1])
                //     this.on = parseInt(thisStore.pId.match(/[0-9]/g)[0]) - 1;
                //     var storeAr = this.magUl[this.on].ul;
                //     for (var n = 0; n < storeAr.length; n++) {
                //         if (storeAr[n].id == sid) {
                //             this.sN = n;
                //         }
                //     }
                //     this.bl = true;
                // }
            }
        },
        created() {
            let _this = this;
            /*node数据接口
            （floor(楼层数据)，sort（店铺分类）,store(店铺数据)）   
            （来自于public/db.js）*/

            //使用axios.all();处理多个异步
            // function getAxios(url) {
            //     return _this.$http.get(url);
            // }
            // _this.$http.all([getAxios('floor'), getAxios('store')]).then(_this.$http.spread(function (resFloor,
            //     resStore) {
            //     _this.concatDate(resFloor, resStore);
            // })).catch(function (error) {
            //     console.log(error)
            // })

            //使用async/await处理多个异步
            async function queryDate() {
                var resFloor = await _this.$http.get('floor');
                var resStore = await _this.$http.get('store');

                resStore.data.forEach((item) => {
                    item.area = item.area.split(",") //热区值转数组
                    //item.pId = parseInt(item.pId.match(/[0-9]/g)[0])
                })

                _this.concatDate(resFloor, resStore);

                var href = location.href;
                if (href.indexOf("sid") > 0) {
                    var pId = parseInt(href.split("pId=")[1]) - 1
                    var n = _this.magUl[pId].ul.findIndex((ob) => {
                        return ob.id == parseInt(href.split("sid=")[1])
                    })
                    _this.on = pId;
                    _this.showStore(n)
                }

            }
            queryDate()
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
