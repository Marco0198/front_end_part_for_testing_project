<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="d-inline-block">
      <b-card
         :title="task.title"
        style="width: 20rem; height: 30rem"
        class="mb-2 ml-5 shadow p-3 mb-5 bg-white rounded"
      >
        <div class="float-right mr-2 mb-5">
        
          <b-icon
            class="mr-2"
            variant="primary"
            icon=" pencil-square
"
            aria-hidden="true"
          ></b-icon>
          <b-icon
            variant="danger"
            icon="trash-fill"
            aria-hidden="true"
          ></b-icon>
        </div>
        <div class="mt-5">
          <p class="font-weight-bold">{{ task.title }}</p>
          <p>{{ task.title }}</p>
        </div>
        <div class=" justify-content-end pt-5">
          <button class="btn btn-danger mr-1">pending</button>
          <button class="btn btn-info mr-1">active</button>
          <button class="btn btn-success mr-1">Done</button>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    axios.get("https://mmt-web.herokuapp.com/api/task").then((res) => {
      this.tasks = res.data;
      console.log(this.tasks);
    });
  },
};
</script>
