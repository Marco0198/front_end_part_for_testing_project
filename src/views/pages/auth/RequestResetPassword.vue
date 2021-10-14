<template>
<Layout name="LayoutDefault">
    <div>
        <base-form>
            <h1>Request Token</h1>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <input type="email" v-model="user.email" id="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                    <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-danger">Request</button>
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
            submitted: false
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
                return;
            }
            let formData = {
                email: this.user.email,
            }
            console.log(formData),
                axios.post('http://127.0.0.1:8000/api/forgotten_password', formData, {
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
