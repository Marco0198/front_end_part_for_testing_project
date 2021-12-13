<template>
  <Layout name="LayoutDefault">
    <div>
      
      <create-task></create-task>
       <display-all-task></display-all-task>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import CreateTask from "@/components/task/CreateTask";
import DisplayAllTask from "@/components/task/DisplayAllTask";
export default {
  components: {
    Layout,CreateTask,DisplayAllTask
  },
  created() {
    this.$store.dispatch("getCurrentUser");
  },

  computed: {
    isLogin() {
      return this.$store.getters["login/isLogin"];
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
