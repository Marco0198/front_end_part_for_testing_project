<template lang="">
    <Layout name="LayoutDefault">
       
       <base-form >
     <form @submit.prevent="" id='form'>
       <h3>Sign In</h3>
        <input type="email" required placeholder="email"/>
        <input type="password" required placeholder="password"/>
        <br><br><button type="submit" class="btn btn-danger">login</button><br>
    <router-link to="/register">Register</router-link><br>
     <router-link to="/request_token">Forgot password</router-link> 
        </form>
       </base-form>
       
    </Layout>
</template>
<script>
import Layout from '@/layouts/Layout';
import BaseForm from '@/components/UI/BaseForm.vue'
export default {
components: {BaseForm,Layout}
}
</script>
 <style >
    input[type=password],input[type=email],input[type=text]
    {
        width: 350px;
        height: 40px;
        justify-content: center;
        margin-left:auto;
        margin-right:auto;
        margin-top:20px;
        border:1 solid #e4d4d4;
        
    }
    button
    {
        width: 100px;
        margin-left:auto;
        margin-right:auto;
        margin-top:0px;
        background-color:#69050f;
        border:1px solid #69050f;
        color:white;
    }
    #form a 
    {
        text-decoration: none;
        
        
    }
   

   
</style>