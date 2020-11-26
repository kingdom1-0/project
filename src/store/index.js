import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showDa:false
  },
  mutations: {
    showBlock(state) {
      state.showDa = true
    }
  },
  actions: {    
  },
  modules: {   
  }
})
