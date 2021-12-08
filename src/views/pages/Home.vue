<template>
  <Layout name="LayoutDefault">
    <div v-show="isLogin">
      <h1>home page</h1>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
//import axios from "axios"
export default {
  components: {
    Layout,
  },
  data() {
    return {
      // user: null
    };
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
