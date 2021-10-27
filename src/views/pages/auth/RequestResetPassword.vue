<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h5>Request Token</h5>
            <form @submit.prevent="handleSubmit">
                <div class="alert alert-success" v-if="success"> Request sent plese check your email  for password reset</div>
                <div class="form-group">
                    <input type="email" v-model="user.email" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                    <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>
                    </div>
                    <span class="text-danger .fs-2" v-if="submitted &&errors && errors.errors"><small>{{errors.errors.email[0]}} please enter a valide email</small></span>
                </div>
                  <div class="form-group">
                    <button class="btn btn-danger" type="submit" :disabled="submitStatus === 'PENDING'">Request</button>
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
            },
            submitted: false,
            success:false,
            errors: "",
            submitStatus: null,
        };
    },
    validations: {
        user: {
            email: {
                required,
                email
            },
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
                email: this.user.email,
            }
            console.log(formData),
                axios.post('https://mmt-web.herokuapp.com/api/forgotten_password', formData, {
                   
                })
                .then(res => {
                    this.submitted = false;
                    this.success = true
                    this.formData = res.data
                    this.errors="",
                    this.user= {
                      email: "",
                      }
                    }).
            catch(error =>{
                  if (error.response.status == 422) {
                     this.success=""
                    this.errors = error.response.data;
                    this.success = false
                }
                 this.success = false
                console.log(this.errors.errors.email[0])} )
           // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
        }
    }
}
</script>
