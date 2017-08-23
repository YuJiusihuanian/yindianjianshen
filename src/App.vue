<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
//    this.$layer.msg('Hello word!',{
//      time:1000,
//      offset: 'b'
//    });

  }
}
</script>

<style>
  @font-face{
    font-family:MFLiHei_Noncommercial-Regular;
    src:url("./assets/font/MFLiHei_Noncommercial-Regular.otf")
  }
  .clearfix{
    zoom:1;
  }
  .clearfix:after{

    　　　　　　centent:"";

  　　　　　　height:0;

  　　　　　　line-height:0;

  　　　　　　display:block;
  　　　　　　visibility:hidden;

  　　　　　　clear:both
  　　　　　}

#app {
  width:100%;
  height:100%;
  color: #2c3e50;
}
</style>
