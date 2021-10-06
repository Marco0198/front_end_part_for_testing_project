<template lang="">
    <Layout name="LayoutDefault">
       
    <div>
         <base-form>
         <h2>Sign In</h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
           type="password"
          placeholder="Enter Your Password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="danger">submit</b-button>
    </b-form>
     <router-link to="/register">Register</router-link><br>
     <router-link to="/request_token">Forgot password</router-link> 
    </base-form>
  </div>
       
    </Layout>
</template>
<script>
import Layout from '@/layouts/Layout';
import BaseForm from '@/components/UI/BaseForm.vue'
export default {
components: {BaseForm,Layout},
data() {
      return {
        form: {
          email: '',
          name: '',
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