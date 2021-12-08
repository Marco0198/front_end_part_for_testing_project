<template>
  <Layout name="LayoutDefault">
    <div>
      <base-form>
        <h3 class="mb-4">Sign In</h3>
        <form @submit.prevent="handleSubmit">
          <div class="alert alert-danger" v-if="errors && errors.errors">
            <p>{{ errors.message }}</p>
          </div>
          <div class="form-group" >
            <label for="email" class="float-left">Email</label>
            <input
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
            <div class="text-danger .fs-2" v-if="errors && errors.errors">
              <small>{{ errors.errors.email[0] }}</small>
            </div>
          </div>

          <div class="form-group ">
            <label for="password" class="float-left">Password</label>
            <input
              type="password"
              v-model="$v.user.password.$model"
              id="password"
              name="password"
              placeholder="Password"
              class="form-control"
              :class="{ 'is-invalid': $v.user.password.$error }"
            />
            <div v-if="$v.user.password.$error" class="invalid-feedback">
              <span v-if="!$v.user.password.required"
                >Password is required</span
              >
              <span v-if="!$v.user.password.minLength"
                >Password must be at least 8 characters</span
              >
            </div>
            <div class="text-danger mt-3" v-if="errors">
              <p>
                <small>{{ errors.password }}</small>
              </p>
            </div>
          </div>

          <div class="form-group">
            <button
              class="btn btn-danger"
              type="submit"
              :disabled="loadingStatus || $v.$invalid"
            >
              Login <b-spinner small v-if="loadingStatus"></b-spinner>
            </button>
          </div>
          <router-link to="/register">Register</router-link><br />
          <router-link to="/request_token">Forgot Password</router-link>
        </form>
      </base-form>
    </div>
  </Layout>
</template>

<script>
  import Layout from "@/layouts/Layout";
  import { required, email, minLength } from "vuelidate/lib/validators";
  import BaseForm from "@/components/UI/BaseForm.vue";

  export default {
    components: {
      BaseForm,
      Layout,
    },
    data() {
      return {
        user: {
          email: "",
          password: "",
        },
      };
    },
    validations: {
      user: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        },
      },
    },
    methods: {
      handleSubmit() {
        this.$store.dispatch("login/handleSubmit", {
          email: this.user.email,
          password: this.user.password,
        });
      },
    },
    computed: {
      loadingStatus() {
        return this.$store.getters["login/loadingStatus"];
      },
      errors() {
        return this.$store.getters["login/errors"];
      },
      success() {
        return this.$store.getters["login/success"];
      },
    },
  };
</script>
