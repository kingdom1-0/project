<template>
    <div class="bus_content">
        <div class="bra_content">
            <div class="bra_tiBl">
                <div class="bra_bl">
                    <div class="bra_ul">
                        <a href="javascript:;" :class="{bra_li:true,w1:!i,cur:(le==e)}" @click="leFilters(e)"
                            v-for="(e,i) in enDa" :key="e.id">{{e}}</a>
                    </div>
                </div>
                <select class="bra_select" v-model="sort">
                    <option value="全部分类">全部分类</option>
                    <option :value="s.title" v-for="s in sortDa" :key="s.id">{{s.title}}</option>
                </select>
            </div>
            <div class="bra_conBlock">
                <div class="bra_floorUl">
                    <div :class="{bra_floorLi:true,fir_1:true,cur:fl < 0}" @click="floorFilters(-1)">
                        <div class="bra_center ">全部楼层</div>
                    </div>
                    <div :class="{bra_floorLi:true,cur:i==fl}" @click="floorFilters(i)" v-for="(f,i) in flDa"
                        :key="f.id">
                        <div class="bra_center ">{{f.title}}</div>
                    </div>
                </div>
                <div class="bra_showBl">
                    <div class="bra_ulBl">
                        <template v-for="s in store">
                            <div class="bra_liBl" v-show="storeFilers(s)" :key="s.id">
                                <div class="bra_Inner" @click="showStore(s)">
                                    <div class="bra_img"><img :src="s.img" /></div>
                                    <div class="bra_teBl">
                                        <div class="bra_teTi">{{s.title}}</div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <router-link :to="{path:'/business/',query:{sid:s.id,pId:s.pId}}" class="bra_lo">
                                    {{s.store}}
                                </router-link>
                            </div>
                        </template>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../event/index'
    export default {
        data() {
            return {
                sort: '全部分类', // 分类筛选(v-moedl)
                fl: -1, // 楼层
                le: '全部', // 字母
                enDa: ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' // 字母
                ],
                sortDa: [], // 分类数据
                flDa: [], // 楼层数据
                store: [] // 店铺数据
            }
        },
        methods: {
            floorFilters: function (i) { // 楼层筛选
                this.fl = i
            },
            leFilters: function (i) { // 楼层筛选
                this.le = i
            },
            storeFilers: function (s) { // 店铺筛选
                var bo = (s.class.indexOf(this.sort) >= 0 || this.sort === '全部分类') && (s.pId - 1 === this.fl || this
                        .fl === -1)
                    && (s.le === this.le || this.le === '全部')
                return bo
            },
            showStore(s) { // 显示店铺详细信息
                console.log(s)
                bus.$emit('data', {
                    showDa: true,
                    id: s.id,
                    logo: s.img,
                    ti: s.title,
                    lo: s.store,
                    sort: s.calss,
                    text: s.value,
                    images: s.images.split(',')
                })
            }
        },
        mounted() {
            let _this = this
            _this.$http.get('floor').then(function (re) { // 楼层
                _this.flDa = re.data
            })

            _this.$http.get('sort').then(function (re) { // 分类
                _this.sortDa = re.data
            })
            async function getData() {
                var store = await _this.$http.get('store')
                return store
            }

            getData().then((re) => { // 店铺
                _this.store = re.data
                var id = parseInt(location.href.split('id=')[1]) || 0
                if (location.href.includes('id=')) {
                    _this.showStore(_this.store.find((item) => {
                        return item.id === id
                    }))
                }
            })
        }
    }

</script>
