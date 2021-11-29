<template>
 <Layout name="LayoutDefault">
   <div>
 
 <div class="d-flex bd-highlight">
  <div class="p-2 flex-grow-1 bd-highlight"><update-profile></update-profile></div>
  <div class="p-2 bd-highlight flex-sm-grow-1"><update-password></update-password></div>

</div>

      
   </div>
  </Layout>
</template>
<script>
import Layout from '@/layouts/Layout';
import UpdatePassword from '@/components/auth/UpdatePassword';
import UpdateProfile from '@/components/auth/UpdateProfile';

export default {
  components: { Layout,UpdatePassword ,UpdateProfile }
  
}
</script>