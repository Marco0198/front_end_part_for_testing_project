<template>
<Layout name="LayoutDefault">
    <div >
      <h1>create new task</h1>
    </div>
</Layout>
</template>

<script>
import Layout from '@/layouts/Layout';

export default {
    components: {
        Layout
    }, created() 
    {
       this.$store.dispatch('getCurrentUser')
    },
         
    computed: {
        isLogin() 
        {
            return this.$store.getters['login/isLogin']
        },
        user (){
         return this.$store.getters.user
          
        }
    }
}
</script>
