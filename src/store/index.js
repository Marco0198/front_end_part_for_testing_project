import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/auth/login'



Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{login},
  state() {
    return{
      isLogin:false
    }
  },
  mutations: {
   
  }
})
export default store