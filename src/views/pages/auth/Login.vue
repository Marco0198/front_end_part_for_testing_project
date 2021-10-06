<template lang="">
    <Layout name="LayoutDefault">
       
    <div>
        <b-card>
        <h2>Sign In</h2>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
       
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" >
        <b-form-input
          id="input-2"
          v-model="form.password"
            type="password"
          placeholder="Enter Password"
          required
         
        ></b-form-input>
      
      </b-form-group>
      <b-button type="submit" variant="danger">Submit</b-button>
    </b-form>
    </b-card>
  </div>
       
    </Layout>
</template>
<script>
import Layout from '@/layouts/Layout';
//import BaseForm from '@/components/UI/BaseForm.vue'
export default {
components: {Layout},
data() {
      return {
        form: {
          email: '',
          password: '',

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
 <style >
  
   
    
   

   
</style>