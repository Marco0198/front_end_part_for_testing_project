<template>
  <Layout name="LayoutDefault">
    <div>
      <base-form>
        <h3 class="mb-4">Request Token</h3>
        <form @submit.prevent="handleSubmit" method="POST">
          <div class="alert alert-success" v-if="message && message.message">
            <p>{{ message.message }}</p>
          </div>
          <div class="alert alert-danger" v-if="errors && errors.errors">
            <p>{{ errors.message }}</p>
          </div>

          <div class="form-group">
            <input
              type="email"
              v-model="$v.user.email.$model"
              id="email"
              name="email"
              placeholder="Email"
              class="form-control"
              :class="{ 'is-invalid': $v.user.email.$error }"
            />
            <div v-if="$v.user.email.$error" class="invalid-feedback">
              <span v-if="!$v.user.email.required">Email is required</span>
              <span v-if="!$v.user.email.email">Email is invalid</span>
            </div>
            <span class="text-danger .fs-2" v-if="errors && errors.errors"
              ><small>{{ errors.errors.email[0] }}</small></span
            >
          </div>
          <div class="form-group">
            <button
              class="btn btn-danger"
              type="submit"
              :disabled="submitStatus || $v.$invalid"
            >
              Request <b-spinner small v-if="submitStatus"></b-spinner>
            </button>
          </div>
        </form>
      </base-form>
    </div>
  </Layout>
</template>

<script>
  import Layout from "@/layouts/Layout";
  import { required, email } from "vuelidate/lib/validators";
  import BaseForm from "@/components/UI/BaseForm.vue";
  import axios from "axios";
  export default {
    components: {
      BaseForm,
      Layout,
    },
    data() {
      return {
        user: {
          email: "",
        },
        errors: "",
        submitStatus: false,
        message: "",
      };
    },
    validations: {
      user: {
        email: {
          required,
          email,
        },
      },
    },
    methods: {
      handleSubmit() {
        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        (this.submitStatus = true), (this.message = "");
        this.errors = "";
        let formData = {
          email: this.user.email,
        };
        //  console.log(formData),
        axios
          .post(
            "https://mmt-web.herokuapp.com/api/forgotten_password",
            formData,
            {}
          )
          .then((res) => {
            this.message = res.data;
            //  console.log(res.data)
            // this.errors="",
            // this.user= {
            //   email: "",
            //   }
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.errors = error.response.data;
              //  console.log(this.errors)
            }
          })
          .finally(() => {
            this.submitStatus = false;
          });
      },
    },
  };
</script>
