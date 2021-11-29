<template>
 <Layout name="LayoutDefault">
   
    <div> <h1>about page</h1>
    <b-card  style="width: auto">
    <form>
  <div class="form-row">
    <div class="form-group col-md-6"> 
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
    <div class="form-group col-md-6">
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
</b-card>
</div>


    
  </Layout>
</template>
<script>
import Layout from '@/layouts/Layout';

export default {
  components: { Layout }
  
}
</script>