<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h1>Sign Up</h1>
            <form  @submit.stop.prevent="handleSubmit">
              <div class="alert alert-success" v-if="message && message.message ">
                    <p>{{message.message}}</p>
                </div>
                 <div class="alert alert-danger" v-if="errors&& errors.errors ">
                    <p>{{errors.message}}</p>
                </div>
                 <div class="text-danger .fs-2" v-if="errors && errors.errors"><small>{{errors.errors.message}}</small></div>
               <div class="form-group">
                    <input type="text" v-model="$v.user.name.$model" id="firstName" name="firstName" placeholder="Name" class="form-control" :class="{ 'is-invalid':  $v.user.name.$error }" />
                    <span v-if="!$v.user.name.required" class="invalid-feedback"> Name is required</span>
                    <span v-if="!$v.user.name.minLength" class="invalid-feedback">name must be at least 3 characters</span>
                    <!--  <div class="alert alert-danger" v-if="errors && errors.errors">
                    <p>{{errors.errors.name[0]}}</p>
                </div>-->
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

                    <!-- <div class="alert alert-danger" v-if="errors && errors.errors">
                    <p>{{errors.errors.password[0]}}</p>
                </div> -->
                </div>
                <div class="form-group">

                    <input type="password" v-model="$v.user.confirmPassword.$model" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" class="form-control" :class="{ 'is-invalid': $v.user.confirmPassword.$error }" />
                    <div v-if="$v.user.confirmPassword.$error" class="invalid-feedback">
                        <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                        <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                    </div> 
                  
                </div>
                  

                <div class="form-group">
                    <button class="btn btn-danger" type="submit" :disabled="submitStatus ||$v.$invalid">Register</button>
                     <div class="alert alert-warning" v-if="submitStatus "><b-spinner label="Spinning"></b-spinner></div>
                    <!--  <div class="alert alert-danger" v-if="errors && errors.errors">
                    <p>{{errors.errors.email[0]}}</p>
                </div> -->
                </div>

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
    sameAs
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
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            submitted: false,
            success: false,
            submitStatus: false,
            errors: "",
            message: ""
        };
    },
    validations: {
        user: {
            name: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
        handleSubmit() {
            this.submitStatus = true;
            this.submitted = true;
            // stop here if form is invalid
               this.$v.$touch();
            if (this.$v.$invalid) {
               
                return;
                
            } 
             this.message="";
             this.errors= ""
            let formData = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                password_confirmation: this.user.confirmPassword,
            }

            console.log(formData),
                axios.post('https://mmt-web.herokuapp.com/api/register', formData, {

                
                }, ).then(res => {

                this.success = true, 
                this.submitted = false;
                this.message = res.data;
                console.log(this.message)
                this.user ={
                name: null,
                email: null,
                password: null,
                confirmPassword: null,
                 
            }
            
                }).
            catch(error => {
                if (error.response.status == 422) {
                     this.success = false
               this.errors = error.response.data;
               console.log(this.errors.message)
                this.errors = error.response.data;
                }
               // this.message = this.errors.errors.email[0]
                  //  console.log(this.message)
            }).finally(()=>{
               // this.message=null;
               
                this.submitStatus = false;
                })

        }
    }
}
</script>