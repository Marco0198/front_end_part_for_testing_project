import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/auth/login'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{login},
  state() {
    return{
   
      user:null

    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    user(state,newUser){
      state.user=newUser;
    }
    
  },
  actions:{
    getCurrentUser(context){
     
      axios.get('https://mmt-web.herokuapp.com/api/user', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    }).then(response => {
       context.commit('user',response.data)
       localStorage.setItem('user',JSON.stringify(response.data))
        console.log(response.data)
     }).catch(error => {
        console.log(error)
      }) 
    }

  }
})
export default store