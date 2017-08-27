<template>
  <div id="Sports">333fffeee
    <mt-swipe :auto="4000">
      <mt-swipe-item>122</mt-swipe-item>
      <mt-swipe-item>233</mt-swipe-item>
      <mt-swipe-item>344</mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default{
        name: 'Sports',
        mounted(){
          this.$ajax({
            method:'GET',
            url:'/api/yencardlist',

          }).then(function(response){
            console.log(response);
          }.bind(this))
            .catch(function (error) {
              Toast({
                message: '接口错误',
                position: 'bottom',
                duration: 3000
              });
            }.bind(this));

        },
    }
</script>
<style scoped>
</style>
