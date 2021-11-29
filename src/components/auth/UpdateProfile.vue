<template>
<Layout name="LayoutDefault">
    <div>
        <b-card 
         class="ml-2 shadow p-1 mb-3 bg-white rounded"> 
            
            <h4 class="mb-4">Profile</h4>
            
           <b-avatar class="mb-5" size="6rem"></b-avatar>
            <form  @submit.stop.prevent="handleSubmit" class="form-row" >
              <div class="alert alert-success" v-if="message && message.message ">
                    <p>{{message.message}}</p>
                </div>
                 <div class="alert alert-danger" v-if="errors&& errors.errors ">
                    <p>{{errors.message}}</p>
                </div>
                 <div class="text-danger .fs-2" v-if="errors && errors.errors"><small>{{errors.errors.message}}</small></div>
              
                    
               <div class="form-group col-md-6">
                    <input type="text" v-model="$v.user.name.$model" id="firstName" name="firstName" placeholder="Name" class="form-control" :class="{ 'is-invalid':  $v.user.name.$error }" />
                    <span v-if="!$v.user.name.required" class="invalid-feedback"> Name is required</span>
                    <span v-if="!$v.user.name.minLength" class="invalid-feedback">name must be at least 3 characters</span>
                    <!--  <div class="alert alert-danger" v-if="errors && errors.errors">
                    <p>{{errors.errors.name[0]}}</p>
                </div>-->
                </div>
               
              
                 <div class="form-group col-md-6 ">
                    <input v-model="$v.user.surname.$model" id="surname" name="surname" placeholder="Surname" class="form-control" :class="{ 'is-invalid':  $v.user.surname.$error }" />
                    <div v-if="$v.user.surname.$error" class="invalid-feedback">
                       <span v-if="!$v.user.surname.required" > Surname is required</span>
                    <span v-if="!$v.user.surname.minLength" >Surname must be at least 3 characters</span>
                    
                  
                </div>
                 </div>
               
                <div class="form-group col-md-6 ">

                    <input v-model="$v.user.email.$model" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid':  $v.user.email.$error }" />
                    <div v-if="$v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>                
                    </div>
                    <div class="text-danger .fs-2" v-if="errors && errors.errors"><small>{{errors.errors.email[0]}}</small></div>
                </div>
              
        
                <div class="form-group col-md-6 ">

                    <input v-model="$v.user.phone.$model" id="phone" name="phone" placeholder="Phone Number" class="form-control" :class="{ 'is-invalid':  $v.user.phone.$error }" />
                    <div v-if="$v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.phone.required">phone number is required</span>
                        <span v-if="!$v.user.phone.minLength">phone number min length is 10</span>
                        <span v-if="!$v.user.phone.maxLength">phone number max length is 10</span>
                    </div>
                    </div>
           
                       

                <div class="form-group mt-3">
                    <button class="btn btn-danger" type="submit" :disabled="submitStatus ||$v.$invalid">Update <b-spinner small  v-if="submitStatus"></b-spinner></button>
                     
                 
              
               </div>
            </form>
             
                  
  
        </b-card>
    </div>
</Layout>
</template>

<script>

import Layout from '@/layouts/Layout';
import {
    required,
    email,
    minLength,
    maxLength
}
 
from "vuelidate/lib/validators"
//import BaseForm from '@/components/UI/BaseForm.vue'
import axios from 'axios'
export default {
    components: {
  
        Layout
    },
    data() {
        return {
            user: {
                name: "",
                surname: "",
                email: "",
                phone:"",
              
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
            surname: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email
            },
             phone: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(10)
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
                surname: this.user.surname,
                email: this.user.email,
                phone: this.user.phone,
              
            }

            console.log(formData),
                axios.put('https://mmt-web.herokuapp.com/api/profile_update', formData, {

                
                }, ).then(res => {
                    
                this.success = true, 
                this.submitted = false;
                this.message = res.data;
                this.$router.push({ path: '/login'});

              //  console.log(this.message)
            //     this.user ={
            //     name: null,
            //     email: null,
            //     password: null,
            //     confirmPassword: null,
                 
            // }
            
                }).
            catch(error => {
                if (error.response.status == 422) {
                     this.success = false
               this.errors = error.response.data;
         //      console.log(this.errors.message)
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
