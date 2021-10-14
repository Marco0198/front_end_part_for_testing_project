<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h1>Sign In</h1>
            <form @submit.prevent="handleSubmit">

                <div class="form-group">
                    <input type="email" v-model="user.email" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                    <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>
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
                    <button class="btn btn-danger">login</button>
                </div>
                <router-link to="/register">Register</router-link><br>
                <router-link to="/request_token">Forgot password</router-link>
            </form>
        </base-form>
    </div>
</Layout>
</template>

<script>
import Layout from '@/layouts/Layout';
import {
    required,
    email
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
                password: ""
            },
            submitted: false
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
            },

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
                email: this.user.email,
                password: this.user.password,

            }
            console.log(formData),
                axios.post('http://127.0.0.1:8000/api/login', formData)
                .then(res => (this.formData = res.data)).
            catch(error => console.log(error.message))
            alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
        }
    }
}
</script>
