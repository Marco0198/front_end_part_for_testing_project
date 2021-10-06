<template lang="">
    <Layout name="LayoutDefault">
       
    <div>
         <base-form>
        <h2>Request Token</h2>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.token"
          type="text"
          placeholder="Enter your Token"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="danger">Request</b-button>
    </b-form>
    </base-form>
  </div>
       
    </Layout>
</template>
<script>
import Layout from '@/layouts/Layout';
import BaseForm from '@/components/UI/BaseForm.vue'
export default {
components: {Layout,BaseForm },
data() {
      return {
        form: {
          token: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      
    }
}
</script>
 <style>
  
</style>