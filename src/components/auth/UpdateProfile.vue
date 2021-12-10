<template>
  <Layout name="LayoutDefault">
    <div>
      <b-card class="ml-2 shadow p-1 mb-3 bg-white rounded">
        <h4 class="mb-4">Details</h4>
        <div v-if="user">
          <b-avatar
            class="mb-5"
            src="https://decider.com/wp-content/uploads/2016/06/homer.jpg?quality=90&strip=all&w=646&h=431&crop=1"
            :text="user.name"
            size="6rem"
          ></b-avatar>
          <form @submit.prevent="handleSubmit">
            <div class="alert alert-success" v-if="message && message.message">
              <p>{{ message.message }}</p>
            </div>
            <div class="alert alert-danger" v-if="errors && errors.errors">
              <p>{{ errors.message }}</p>
            </div>
            <div class="form-row">
              <div class="text-danger .fs-2" v-if="errors && errors.errors">
                <small>{{ errors.errors.message }}</small>
              </div>

              <div class="form-group col-md-6">
                <label for="name" class="float-left">name</label>
                <input
                  type="text"
                  v-model="$v.user.name.$model"
                  id="name"
                  name="name"
                  :placeholder="user.name"
                  class="form-control"
                  :class="{ 'is-invalid': $v.user.name.$error }"
                />
                <span v-if="!$v.user.name.minLength" class="invalid-feedback"
                  >name must be at least 3 characters</span
                >
                <span v-if="!$v.user.name.required" class="invalid-feedback"
                  >name is required</span
                >
              </div>

              <div class="form-group col-md-6">
                <label for="surname" class="float-left">Surname</label>
                <input
                  v-model="$v.user.surname.$model"

                  id="surname"
                  name="surname"
                  :placeholder="user.surname"
                  class="form-control"
                  :class="{ 'is-invalid': $v.user.surname.$error }"
                />
                <div v-if="$v.user.surname.$error" class="invalid-feedback">
                  <span v-if="!$v.user.surname.minLength"
                    >Surname must be at least 3 characters</span
                  >
                  <span
                    v-if="!$v.user.surname.required"
                    class="invalid-feedback"
                    >surname is required</span
                  >
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="email" class="float-left">Email</label>
                <input
                  v-model="$v.user.email.$model"
                  id="email"
                  name="email"
                  :placeholder="user.email"
                  class="form-control"
                  :class="{ 'is-invalid': $v.user.email.$error }"
                />
                <div v-if="$v.user.email.$error" class="invalid-feedback">
                  <span v-if="!$v.user.email.email">Email is invalid</span>
                  <span v-if="!$v.user.email.required" class="invalid-feedback"
                    >email is required</span
                  >
                </div>
                <div class="text-danger .fs-2" v-if="errors && errors.errors">
                  <small>{{ errors.errors.email[0] }}</small>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="phone" class="float-left">Phone</label>
                <input
                  type="text"
                  v-model="$v.user.phone.$model"
                  id="phone"
                  name="phone"
                  :placeholder="user.phone"
                  class="form-control"
                  :class="{ 'is-invalid': $v.user.phone.$error }"
                />
                <div v-if="$v.user.phone.$error" class="invalid-feedback">
                  <span v-if="!$v.user.phone.minLength"
                    >phone number min length is 10</span
                  >
                  <span v-if="!$v.user.phone.maxLength"
                    >phone number max length is 10</span
                  >
                  <span v-if="!$v.user.phone.required" class="invalid-feedback"
                    >phone number is required</span
                  >
                </div>
              </div>

              <div class="form-group mt-3">
                <button
                  class="btn btn-danger"
                  type="submit"
                  :disabled="$v.$invalid || $v.$anyError || submitStatus"
                >
                  save <b-spinner small v-if="submitStatus"></b-spinner>
                </button>
              </div>
            </div>
          </form>
        </div>
      </b-card>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import {
  email,
  minLength,
  maxLength,
  required,
} from "vuelidate/lib/validators";

import axios from "axios";
export default {
  components: {
    Layout,
  },
  data() {
    return {
      submitted: false,
      success: false,
      submitStatus: false,
      errors: "",
      message: "",
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(3),
      },
      surname: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.$store.dispatch("getCurrentUser");
  },
  methods: {
    handleSubmit() {
      localStorage.removeItem("user");

      this.submitStatus = true;
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.message = "";
      this.errors = "";

      axios
        .put("https://mmt-web.herokuapp.com/api/profile_update", this.user, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          (this.success = true), (this.submitted = false);
          this.message = res.data;
          localStorage.setItem("user", JSON.stringify(this.user));
          window.location.reload()

       
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.success = false;
            this.errors = error.response.data;
            //  console.log(this.errors.message)
            this.errors = error.response.data;
          }
          // this.message = this.errors.errors.email[0]
          //  console.log(this.message)
        })
        .finally(() => {
         
          this.submitStatus = false;
        });
    },
  },
};
</script>
