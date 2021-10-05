<template lang="">
      <Layout name="LayoutDefault">
    <base-form >
     <form @submit.prevent="">
       <h3>Reset Password</h3>
        <input type="text" required placeholder="enter your token"/><br>
        <input type="password" required placeholder=" enter your new password"/><br>
        <input type="password" required placeholder=" confirmation new password"/>
        <br><br>
        <button type="submit" class="btn btn-danger">Reset</button>
        </form>
       </base-form>
    </Layout >
</template>
<script>
import Layout from '@/layouts/Layout';
import BaseForm from '@/components/UI/BaseForm.vue'
export default {
components: {BaseForm,Layout}
}
</script>
<style lang="">
    
</style>