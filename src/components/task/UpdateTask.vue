<template>
  <div>
    <button class="btn btn-primary mb-5" @click="displayCreateTask">
      Update Tasks
    </button>
    <div v-if="displayCreate">
      <b-card
        style="max-width: 50rem"
        class="mb-2 mx-auto shadow p-3 mb-5 bg-white rounded"
      >
        <h3 class="mb-4">Create Task</h3>
        <form @submit.stop.prevent="handleSubmit">
          <div class="alert alert-success" v-if="message && message.message">
            <p>{{ message.message }}</p>
          </div>
          <div class="alert alert-danger" v-if="errors && errors.errors">
            <p>{{ errors.message }}</p>
          </div>
          <div class="text-danger .fs-2" v-if="errors && errors.errors">
            <small>{{ errors.errors.message }}</small>
          </div>
          <div class="form-group">
            <label for="title" class="float-left">Title</label>
            <input
              type="text"
              v-model="$v.task.title.$model"
              id="title"
              name="title"
              placeholder="tap you title here.."
              class="form-control"
              :class="{ 'is-invalid': $v.task.title.$model }"
            />
            <span v-if="!$v.task.title.required" class="invalid-feedback">
              Name is required</span
            >
            <span v-if="!$v.task.title.minLength" class="invalid-feedback"
              >name must be at least 3 characters</span
            >
          </div>
          <label for="description" class="float-left">Description</label>
          <b-form-textarea
            id="description"
            v-model="task.description"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>

          <!-- Styled -->
          <label for="description" class="float-left mt-2">Attach</label>
          <b-form-file class="mt-3" plain></b-form-file>

          <div class="form-group">
            <button
              class="float-left mt-2 btn btn-danger"
              type="submit"
              :disabled="submitStatus || $v.$invalid"
            >
              create <b-spinner small v-if="submitStatus"></b-spinner>
            </button>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
//import BaseForm from "@/components/UI/BaseForm.vue";
//import axios from "axios";
export default {
  components: {},
  data() {
    return {
      displayCreate: false,
      task: {
        title: "",
        description: "",
        status: "",
        attach: "",
      },
      submitted: false,
      success: false,
      submitStatus: false,
      errors: "",
      message: "",
    };
  },
  validations: {
    task: {
      title: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
        minLength: minLength(3),
      },
      attach: {
        required,
        email,
      },
    },
  },
  methods: {
    displayCreateTask() {
      return (this.displayCreate = !this.displayCreate);
    },
  },
};
</script>
