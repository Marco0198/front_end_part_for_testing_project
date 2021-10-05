<template lang="">
    <Layout name="LayoutDefault">
    <base-form >
     <form @submit.prevent="">
       <h3>Sign Up</h3>
        <input type="text" required placeholder="Name"/><br>
        <input type="email" required placeholder="email"/><br>
        <input type="password" required placeholder="password"/><br>
        <input type="password" required placeholder="password confirmation"/>
        <br><br>
        <button type="submit" class="btn btn-danger">Register</button>
        </form>
       </base-form>
   </Layout>
</template>
<script>
import BaseForm from '@/components/UI/BaseForm.vue'
import Layout from '@/layouts/Layout';
export default {
components: {BaseForm,Layout}
}
</script>
<style >
    
</style>