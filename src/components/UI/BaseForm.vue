<template lang="">
    <div class="card">
    <slot>
       
    </slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style >
.card 
{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 500px;
  height:auto;
  padding-bottom: 50px;
  border-radius: 5px;
  justify-content: center;
  display: inline-block;
  margin: auto;
}

</style>