<template>
    <transition name="fade">
        <div class="alt_content" v-if="newsVal.on">
            <div class="alt_bgImg" @click="closeAlert"></div>
            <div class="alt_conBlockB">
                <div class="alt_InnBlock">
                    <div class="In_ti">{{newsVal.data.title}}</div>
                    <div class="In_date">时间：{{newsVal.data.date.slice(0,10)}}</div>
                    <div class="In_te" v-html="newsVal.data.value">
                    </div>
                </div>
                <div class="In_bu">
                    <a href="javascript:;" class="In_back" @click="closeAlert">关闭</a>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        methods: {
            closeAlert: function () {
                this.$store.commit('showNews', { //解发vuex突变
                    on: false
                })
            }
        },
        computed: {
            newsVal() {
                return this.$store.state.newsData; //获取vuex数据（通过计算属性缓存，实时响应）
            }
        }
    }

</script>
