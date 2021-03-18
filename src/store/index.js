import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newsData: {
      on: false, //新闻内容开关
      data: {} //新闻数据
    }
  },
  mutations: {
    showNews(state, payload) {
      state.newsData.on = payload.on
      state.newsData.data = payload.data
    }
  },
  actions: {},
  modules: {}
})