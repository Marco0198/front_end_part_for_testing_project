<template >
      <Layout name="LayoutDefault">
    <base-form >
     <form @submit.prevent="">
       <h3>Request Token</h3>
        <input type="email" required placeholder="email"/>
        <br><br>
        <button type="submit" class="btn btn-danger">Request</button>
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
<style lang="">
    
</style>