<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h3 class="mb-4">Sign In</h3>
            <form @submit.prevent="handleSubmit">
                <div class="alert alert-success" v-if="success"> login succesfull</div>
              <div class="alert alert-danger" v-if="errors && errors.errors">
                    <p>{{errors.message}}</p>
                </div> 
                
               
                <div class="form-group">

                    <input v-model="$v.user.email.$model" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid':  $v.user.email.$error }" />
                    <div v-if="$v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>
                  

                    </div>
                    <div class="text-danger .fs-2" v-if="errors && errors.errors"><small>{{errors.errors.email[0]}}</small></div>
                </div>
                   
                    <div class="form-group">
                    <input type="password" v-model="$v.user.password.$model" id="password" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid':  $v.user.password.$error }" />
                    <div v-if=" $v.user.password.$error" class="invalid-feedback">
                        <span v-if="!$v.user.password.required">Password is required</span>
                        <span v-if="!$v.user.password.minLength">Password must be at least 8 characters</span>
                    </div>
                 <div class="text-danger mt-3" v-if="errors ">
                    <p>{{errors.password}}</p> 
                </div> 
                </div>
               
                <div class="form-group">
                    <button class="btn btn-danger" type="submit" :disabled="submitStatus||$v.$invalid">Login</button>
                     <div class="alert alert-warning" v-if="submitStatus "><b-spinner ></b-spinner></div>
                   
                </div>
                <router-link to="/register">Register</router-link><br>
                <router-link to="/request_token">Forgot Password</router-link>
            </form>

        </base-form>
    </div>
</Layout>
</template>

<script>
import Layout from '@/layouts/Layout';
import {
    required,
    email,
    minLength,

}
from "vuelidate/lib/validators"
import BaseForm from '@/components/UI/BaseForm.vue'
import axios from 'axios'
export default {
    components: {
        BaseForm,
        Layout
    },
    data() {
        return {
            user: {
               
                email: "",
                password: "",
              
            },
            submitted: false,
            success: false,
            submitStatus:false,
            errors: "",
            message: ""
        };
    },
    validations: {
        user: {
          
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    },
    methods: {
        handleSubmit() {
               this.submitted = true;
            // stop here if form is invalid
               this.$v.$touch();
            if (this.$v.$invalid) {
               
               return
                
            }  this.submitStatus = true
             this.success= false,
             this.errors="",
            this.message= ""
            let formData = {
               
                email: this.user.email,
                password: this.user.password,
                // passwordConf:this.form.passwordConf,
            }

            console.log(formData),
                axios.post('https://mmt-web.herokuapp.com/api/login', formData, {

                }, ).then(res => {
                    this.success = true, 
                this.submitted = false,
             
                this.formData = res.data
            //     this.user ={
                
            //     email: null,
            //     password: null,
               
            // }
                }).
            catch(error => {
                if (error.response.status == 422) {
                     this.success = false
                    this.errors = error.response.data;
                }
                
                    console.log( this.errors)
            }).finally(()=>{this.submitStatus=false})

        }
    }
}
</script>
