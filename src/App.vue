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
  @font-face{
    font-family:PingFang Medium_downcc;
    src:url("./assets/font/PingFang Medium_downcc.otf")
  }
  body{
    font-family: PingFang Medium_downcc;
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
  color: #2c3e50;
}
</style>
