<template>
  <component :is="layout">
    <router-view :layout.sync="layout" />
  </component>
</template>

<script>
// this is the new version
export default {
  name: `App`,
  data() {
    return {
      layout: `div`,
    };
  },
};
</script>>
<style lang="scss" >
body {
  margin: 0;
}
</style>
