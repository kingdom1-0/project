<template>
    <div class="bus_content">
        <div class="bra_content">
            <div class="bra_tiBl">
                <div class="bra_bl">
                    <div class="bra_ul">
                        <a href="javascript:;" :class="{bra_li:true,w1:!i,cur:(en==i)}" v-for="(e,i) in enDa" :key="e.id">{{e}}</a>  
                    </div>
                </div>                                
                <select class="bra_select">
                    <option value="全部分类" v-for="s in sortDa" :key="s.id">{{s}}</option>                    
                </select>
            </div>
            <div class="bra_conBlock">
                <div class="bra_floorUl">
                    <div :class="{bra_floorLi:true,fir_1:!i,cur:(fl==i)}" @click="floorFun" v-for="(f,i) in flDa" :key="f.id"><div class="bra_center ">{{f}}</div></div>                   
                </div>
                <div class="bra_showBl">
                    <div class="bra_ulBl">                        
                        <div class="bra_liBl" @click="showBlock()"  v-for="s in store" :key="s.id">
                            <div class="bra_img"><img :src="s.logo"/></div>
                            <div class="bra_teBl">
                                <div class="bra_teTi">{{s.name}}</div>
                                <router-link :to="s.href" class="bra_lo">{{s.lo}}</router-link>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>                               
                <div class="clear"></div>
            </div>
        </div>
</div>
</template>

<script>
    //import  bus from "../event/index"
    export default {
        data () {
            return {
                en:0,
                sort:0,
                fl:0,
                enDa:["全部","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
                sortDa:[],
                flDa:[],
                store:[]
            }
        },
        methods: {
            floorFun:function(){
                
            },
            backData:function(){
                //事件总线发送数据
                //bus.$emit("showDa",true)
            },
            showBlock() {
                this.$store.commit('showBlock')
            }
        },
        mounted () {
            let _this = this;
            this.$http.get("ajax/brand.json").then(function(re){
                _this.sortDa =  re.data.sortDa;
                _this.flDa = re.data.flDa;
                _this.store = re.data.store;
            }).catch(function(err){
                console.log(err)
            })
        }
    }
</script>