<template lang="">

  <div>
    <div>
  <b-navbar toggleable="lg" type="dark" style=" background:black" >
    <b-navbar-brand href="#">TaskBoardWeb</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-5 text-center">
        <b-nav-item to="/" >Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/contact">Contact</b-nav-item>
        <b-nav-item v-if="isLogin" :to="{ path: '/Taskboard' }" >Tasboard</b-nav-item>

        
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <router-link v-if="!isLogin" to="/login"><button class="btn btn-danger text-center">Login</button></router-link>
          <div v-if="isLogin &&user">
         <b-dropdown type="dark" class="mr-3"  variant="ligth">
        <template #button-content>   
        <b-avatar  src="https://decider.com/wp-content/uploads/2016/06/homer.jpg?quality=90&strip=all&w=646&h=431&crop=1" class="mr-1"></b-avatar><span class="text-warning">{{user.name}} {{user.surname}}</span> 
      </template>
       <b-dropdown-item class="ml-3" to="/profile">Profile</b-dropdown-item>
       <b-dropdown-item ><b-nav-item ><button  @click="logout" class="btn btn-light ">Logout</button></b-nav-item></b-dropdown-item>
     </b-dropdown>
         
          </div>
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
        },
        
        user (){
         return this.$store.getters.user
          
        }
      },
        methods: {
          logout() {
            this.$store.dispatch('login/logout')

            return this.$store.getters['login/isLogin'],
            this.$router.push({ path: '/login'});
          },
           created() 
    {
       this.$store.dispatch('getCurrentUser')
    },

         
        }
    
}
</script>
<style >

</style>