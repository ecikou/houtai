import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  // 指定用的是存储方式是本地存储
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    setUser (state, paylod) {
      state.user = paylod
    },
    setItem (state, paylod) {
      state.user.token = paylod
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})