<template lang="">

  <div>
    <div>
  <b-navbar toggleable="lg" type="dark" style=" background:black" >
    <b-navbar-brand href="#">TaskBoardWeb</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-2 text-center">
        <b-nav-item to="/" >Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/contact">Contact</b-nav-item>
        <b-nav-item :to="{ path: '/Taskboard' }" >Tasboard</b-nav-item>

        
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <router-link v-if="!isLogin" to="/login"><button class="btn btn-danger text-center">Login</button></router-link>
          <a v-if="isLogin"><button  @click="logout" class="btn btn-danger text-center">Logout</button></a>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  </div>
</template>
<script>
export default {
      computed: {
        isLogin() {
            return this.$store.getters['login/isLogin']
        }
      },
        methods: {
          logout() {
            this.$store.dispatch('login/logout')
            return this.$store.getters['login/isLogin']
          }
         
        }
    
}
</script>
<style >

</style>