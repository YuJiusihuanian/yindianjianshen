<template>
  <div id="AddictionCard">
    <c-ard :cardList="cardList"></c-ard>
  </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import Card from '../components/Card.vue';
    export default{
      name: '',
      data(){
        return{
          bg:require('../assets/images/cardBg.png'),
          cardList:{}
        }
      },
      components:{
        'c-ard':Card
      },
      mounted(){
        this.$ajax({
          method:'POST',
          url:'http://106.15.91.17/yen/card/list'
        }).then(function(response){
            if(response.data.message == 'SUCCESS'){
                this.cardList = response.data.data;
                console.log(this.cardList)
            }else{
              Toast({
                message: response.data.message,
                position: 'bottom',
                duration: 3000
              });
            }
        }.bind(this))
          .catch(function (error) {
            Toast({
              message: '接口错误',
              position: 'bottom',
              duration: 3000
            });
          }.bind(this));
      },
      methods:{
      }
    }
</script>
<style scoped>
  #AddictionCard {
    width: 100%;
    padding-top:0.38rem;
  }
</style>
