<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h5>Reset password</h5>
            <form @submit.prevent="handleSubmit">
                <div class="alert alert-success" v-if="success"> Password succesfully change</div>
                

                <div class="form-group">
                    
                    <input type="text" v-model="user.token" id="firstName" name="firstName" placeholder="Enter your token" class="form-control" :class="{ 'is-invalid': submitted && $v.user.token.$error }" />
                    <div v-if="submitted && !$v.user.token.required" class="invalid-feedback"> token is required</div>
                    <span class="text-danger " v-if="submitted &&errors && errors.errors"><small>{{errors.errors.token[0]}} request for a new one</small></span>
                </div>
                <div class="form-group">

                    <input type="email" v-model="user.email" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                    <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>
                    </div>
                    <div class="text-danger"  v-if="submitted &&errors && errors.errors"><small>{{errors.errors.email[0]}} </small></div>
                </div>
                <div class="form-group">
                    <input type="password" v-model="user.password" id="password" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                    <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                        <span v-if="!$v.user.password.required">Password is required</span>
                        <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                    </div>
                </div>
                <div class="form-group">

                    <input type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" />
                    <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                        <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                        <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                    </div>
                </div>
                  <div class="form-group">
                    <button class="btn btn-danger" type="submit" :disabled="submitStatus === 'PENDING'">Reset</button>
                     <p class="alert alert-warning" v-if="submitStatus === 'PENDING'">Sending...</p>
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
                token: "",
                email: "",
                password: "",
                confirmPassword: "",
              
            },
              submitStatus: null,
              submitted: false,
              success:false,
              errors: ""
        };
    },
    validations: {
        user: {
            token: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
        handleSubmit() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();
             
            if (this.$v.$invalid) {
               
                this.submitStatus = 'ERROR'
                
            } else {
                // do your submit logic here
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500)
            }
            let formData = {
                token: this.user.token,
                email: this.user.email,
                password: this.user.password,
                // passwordConf:this.form.passwordConf,
            }
            console.log(formData),
                axios.post('https://mmt-web.herokuapp.com/api/reset_password', formData, {
                    headers: {
                        'content-type': 'aplication/json'
                    }
                })
                .then(res =>{
                 this.submitted = false;
                this.user={
                token: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
                    this.success=true;
                    (this.formData = res.data)
                    
                
                } ).
            catch(error => {
                   if (error.response.status == 422) {
                    this.success=false;
                    this.errors = error.response.data;
                   
                }
                console.log(this.errors)
                })
           // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
        }
    }
}
</script>
