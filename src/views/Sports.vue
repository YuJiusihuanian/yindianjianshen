<template>
  <div id="Sports">
    <mt-swipe class="mt-swipe" :auto="4000">
      <mt-swipe-item v-for="(item,key) in sportsList.banner" :key="key" v-if="item.disable === true" class="item" ><img @click="jump(item)" :href="item.event.url" :src="item.icon" alt=""></mt-swipe-item>
    </mt-swipe>
    <ul class="nav">
      <li v-for="(item,key) in navList" :class="{'hover':navHoverN === key}" @click="navhover(key)">{{item}}</li>
    </ul>
    <div class="classContent content">

    </div>
    <div class="navbar">
      <router-link v-if="buttonList.disable" to="/" class="left">立即预约</router-link>
      <router-link v-if="!buttonList.disable" to="/" class="left" :class="{'disable':buttonList.disable === false}">立即预约</router-link>
    <router-link to="/" class="left">分享</router-link>
  </div>
  </div>
</template>
<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default{
        name: 'Sports',
        data(){
            return{
              sportsList:{},
              navList:['课程内容','教练介绍','注意事项','健身步骤'],
              navHoverN:0,
              detailObj:{},
              buttonList:{}
            }
        },
        mounted(){

          this.$ajax({
            method:'GET',
            url:'/api/courseschedule'
          }).then(function(response){
            if(response.data.message == 'SUCCESS'){
              this.sportsList = response.data.data;
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

          this.$ajax({
            method:'GET',
            url:'/api/coursedetail',
            params:{
              'id':this.$route.params.sportsId
            }
          }).then(function(response){
            if(response.data.message == 'SUCCESS'){
              this.detailObj = response.data.data;
              this.buttonList = response.data.data.button;
              console.log(this.detailObj)
              console.log(this.$route.params.sportsId)
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
        navhover(key){
            this.navHoverN = key;
        }
      }

    }
</script>
<style scoped>
  #Sports .mt-swipe{
    width:100%;
    height:2.4rem;
    width:100%;
  }
  #Sports .item img {
    max-width:100%;
    width:100%;
    dispaly:block;
    height:2.4rem;
  }
  #Sports .nav{
    height:0.8rem;
    width:100%;
    display:flex;

  }
  #Sports .nav li{
    width:25%;
    text-align:center;
    background:#00b8fe;
    color:#fff;
    line-height:0.8rem;
    font-size:0.3rem;
  }
  #Sports .nav li.hover{
    background:#0095ce;
  }
  #Sports .navbar{
    /*height:0.99rem;*/
    width:100%;
    background:#fff;
    position:fixed;
    bottom:0;
    border-top:1px solid #dcdcdc;
    display:flex;
    line-height:0.98rem;
    font-size:0.36rem;
  }
  #Sports .navbar a:first-child{
    width:70%;
    text-align:center;
    background:#00b8fe;
    color:#fff;
  }
  #Sports .navbar a:last-child{
    width:30%;
    text-align:center;
    color:#333333;
  }
  #Sports .navbar img{
    display:block;
    margin:0 auto;
    margin-bottom:0.1rem;
  }
  #Sports .navbar .disable{
    background:#ccc !important;
    color:#fff !important;
  }
  #Sports .content{
    width:92.53%;
    margin:0 auto;
    background:#fff;
    height:1rem;
  }
</style>
