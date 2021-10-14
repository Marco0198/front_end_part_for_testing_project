<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h1>Sign Up</h1>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <input type="text" v-model="user.userName" id="firstName" name="firstName" placeholder="UserName" class="form-control" :class="{ 'is-invalid': submitted && $v.user.userName.$error }" />
                    <div v-if="submitted && !$v.user.userName.required" class="invalid-feedback"> Name is required</div>
                </div>
                <div class="form-group">

                    <input type="email" v-model="user.email" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                    <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>
                        <span v-if="!$v.user.email.invalidEmail">Email is already taken</span>

                    </div>
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
                    <button class="btn btn-danger">Register</button>
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
            submitted: false
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
                return;
            }
            let formData = {
                name: this.user.userName,
                email: this.user.email,
                password: this.user.password,
                // passwordConf:this.form.passwordConf,
            }
            console.log(formData),
                axios.post('http://127.0.0.1:8000/api/register', formData, {
                    headers: {
                        'content-type': 'aplication/json'
                    }
                })
                .then(res => (this.formData = res.data)).
            catch(error => console.log(error.message))
            alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
        }
    }
}
</script>
