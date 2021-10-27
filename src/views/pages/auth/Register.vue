<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h1>Sign Up</h1>
            <form @submit.prevent="handleSubmit">
                <div class="alert alert-success" v-if="success"> Registration succesfull</div>
              <!-- <div class="alert alert-danger" v-if="submitted &&errors && errors.errors">
                    <p>{{errors.errors.email[0]}}</p>
                </div> -->
                <div class="form-group">
                    <input type="text" v-model="user.userName" id="firstName" name="firstName" placeholder="UserName" class="form-control" :class="{ 'is-invalid': submitted && $v.user.userName.$error }" />
                    <div v-if="submitted && !$v.user.userName.required" class="invalid-feedback"> Name is required</div>
                    <!--  <div class="alert alert-danger" v-if="errors && errors.errors">
                    <p>{{errors.errors.name[0]}}</p>
                </div>-->
                </div>
                <div class="form-group">

                    <input v-model="user.email" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                    
                    <span class="text-danger .fs-2" v-if="submitted &&errors && errors.errors"><small>{{errors.errors.email[0]}}</small></span>
                </div>
                <div class="form-group">
                    <input type="password" v-model="user.password" id="password" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                    <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                        <span v-if="!$v.user.password.required">Password is required</span>
                    </div>
                     <!-- <div class="alert alert-danger" v-if="errors && errors.errors">
                    <p>{{errors.errors.password[0]}}</p>
                </div> -->
                </div>
                <div class="form-group">

                    <input type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" />
                    <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                        <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                        <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                    </div> 
                  
                </div>
                <div class="form-group">
                    <button class="btn btn-danger" type="submit" :disabled="submitStatus === 'PENDING'">Register</button>
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
                userName: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            submitted: false,
            success: false,
            submitStatus: null,
            errors: "",
            message: ""
        };
    },
    validations: {
        user: {
            userName: {
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
                name: this.user.userName,
                email: this.user.email,
                password: this.user.password,
                // passwordConf:this.form.passwordConf,
            }

            console.log(formData),
                axios.post('https://mmt-web.herokuapp.com/api/register', formData, {

                }, ).then(res => {this.success = true, 
                this.submitted = false;
                this.errors= "",
                this.formData = res.data,
                this.user ={
                userName: null,
                email: null,
                password: null,
                confirmPassword: null
            }
                }).
            catch(error => {
                if (error.response.status == 422) {
                     this.success = false
                    this.errors = error.response.data;
                }
                this.message = this.errors.errors.email[0],
                    console.log(this.message)
            })

        }
    }
}
</script>
