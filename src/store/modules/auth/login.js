
import axios from 'axios';
import router from '@/router'


const state={
    submitted: false,
    success: false,
    submitStatus:false,
    errors: "",
    message: "",
    isLogin :!!localStorage.getItem("token")

};
const getters={
    loadingStatus(state){
       return state.submitStatus
      },
       errors(state){
        return state.errors
       },
       success(state){
        return state.success
       },
       isLogin(state){
        return state.isLogin
       }


};
const mutations={
    loginStatus(state,loginStatus){
      state.isLogin = loginStatus;
    }
};
const actions={
logout(context)
{
context.commit('loginStatus',false)   
localStorage.removeItem('token')
localStorage.removeItem('user')

},
handleSubmit(context,payload) {
  state.submitStatus = true
 // context.commit('loadingStatus',true)
  state.success= false,
  state.errors="",
  state.message= ""
  let formData = 
  {
     email: payload.email,
     password: payload.password,
  
 }

//   console.log(formData),
     axios.post('https://mmt-web.herokuapp.com/api/login', formData, {

     }, ).then(res => {
         if(res.data)
         {
            context.commit('loginStatus',true) 
        // console.log( res.data.token)
         state.success = true, 
         state.submitted = false,
         localStorage.setItem("token",res.data.token)
          router.push({ path: '/'});
         }
  
     

     }).
 catch(error =>
     {
     if (error.response.status == 422) {
       // context.commit('loginStatus',false)
          state.success = false,
          state.errors = error.response.data;
     }
     
       //  console.log( state.errors)
 }).finally(()=>
    {
     //state.isLogin =false,
      state.submitStatus = false
    })

}

};
export  default {
 namespaced: true,
state,
getters,
mutations,
actions,
}