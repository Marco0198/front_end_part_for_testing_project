<template lang="">
    <Layout name="LayoutDefault">
       
    <div>
         <base-form>
        <h2>Reset Password</h2>
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
       

      <b-form-group id="input-group-3" >
        <b-form-input
          id="input-3"
          v-model="form.password"
            type="password"
          placeholder="Enter your new Password"
          required
       
        ></b-form-input>
      
      </b-form-group>
        <b-form-group id="input-group-4" >
        <b-form-input
          id="input-4"
          v-model="form.passwordConf"
            type="password"
          placeholder="Enter new Password Confirmation"
          required
      
        ></b-form-input>
      
      </b-form-group>
      <b-button type="submit" variant="danger">Submit</b-button>
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
          token :'',
          password: '',
          passwordConf: '',

        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
}
</script>
 <style >
   
</style>