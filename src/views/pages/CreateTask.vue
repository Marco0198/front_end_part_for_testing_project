<template>
  <Layout name="LayoutDefault">
    <div v-show="isLogin">
      <h1>create new task</h1>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/layouts/Layout";

export default {
  components: { Layout },
  computed: {
    isLogin() {
      return this.$store.getters["login/isLogin"];
    },
  },
};
</script>