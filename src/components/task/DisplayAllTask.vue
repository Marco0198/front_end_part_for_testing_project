<template>
  <div>
   <b-button class="btn btn-warning mb-5" v-b-modal.modal>Create Task</b-button><br>

    <b-spinner v-if="isLoading" label="Spinning"></b-spinner>
  
    <div v-for="task in tasks" :key="task.id" class="d-inline-block">
      
      <b-card
        style="width: 23rem; height: 40rem"
        class="mb-2 ml-2 mr-2 shadow p-3 mb-5 bg-white rounded"
      >
        <div class="float-right mr-2 mb-5">
          <b-icon
             class="mr-2"
             variant="primary"
             icon=" pencil-square
"            @click="updateTask"
             aria-hidden="true"
          ></b-icon>
          <b-icon
            variant="danger"
            icon="trash-fill"
            aria-hidden="true"
          ></b-icon>
        </div>

        <div
          class="mt-5 font-italic"
          style="height:25rem; "
        >
          <p class="font-weight-bold card-title"><span class="float-left mr-1 mb-2">Title:</span>{{ task.title }}</p>
          <p> <span class="float-left mr-1 font-weight-bold">Description:</span>{{ task.description }}</p>
          <p> <span class="float-left font-weight-bold">Attach:</span><button >file </button></p>
        </div>
        <div class=" justify-content-end pt-5"><span class="float-left mr-1 font-weight-bold">Status:</span>
          <button class="btn btn-danger mr-1">pending</button>
          <button class="btn btn-info mr-1">active</button>
          <button class="btn btn-success mr-1">Done</button>
        </div>
      </b-card>
    </div>
     
    <b-modal
      id="modal"
      ref="modal"
      title="Create Task"
      :hide-footer="true"
      :hide-header="true"
      
    >
       <b-icon @click="$bvModal.hide('modal')" icon="x-circle"  variant="danger" aria-hidden="true"></b-icon>

      <div>
        <b-card style="max-width: 50rem" class="mb-2 mx-auto border-0 rounded">
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
            <label for="description" class="float-left ">Attach</label>
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
    </b-modal>
  </div>

</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";

import axios from "axios";
export default {
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
      tasks: [],
      isLoading: false,
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

  created() {
   this.isLoading = true;
    axios
      .get("https://mmt-web.herokuapp.com/api/task")
      .then((res) => {
        this.tasks = res.data;
        console.log(this.tasks);
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
       this.isLoading = false;
        

      });

  },
  methods:{
     
       updateTask() {
       this.$bvModal.show("modal")    },
       
      
       }

};
</script>
