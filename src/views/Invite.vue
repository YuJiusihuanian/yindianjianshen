<template>
  <div id="Invite">
    <div class="banner">
      <img src="../assets/images/invite.png" alt="">
      <p>送给朋友10元礼券，当TA首次使用</p>
      <p>您将获得10元奖励</p>
      <p>奖励规则 ></p>
    </div>
    <div class="invitebtn" @click="invitebtn()">
      {{inviteText}}
    </div>
    <p class="particulars">已奖励 <span>{{invitationList.totalPrize}}</span> 元，查看详情 ></p>
  </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
      name: 'invite',
      data(){
        return{
          inviteText:'分享给朋友',
          invitationList:{}
        }
      },
      methods:{
          invitebtn(){
            this.inviteText = '点击右上角分享给朋友获得奖励';
          }
      },
      mounted(){
        this.$ajax({
          method:'POST',
          url:'/api/user/invitation'
        }).then(function(response){
          if(response.data.message == 'SUCCESS'){
            this.invitationList = response.data.data;
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
      }
    }
</script>
<style scoped>
  #Invite{
    width:100%;
    height:100%;
  }
  #Invite .banner{
    background-color:#fff;
    padding-bottom:0.52rem;
    padding-top:0.2rem;
  }
  #Invite .banner img{
    width:95.46%;
    height:100%;
    margin:0 auto;
  }
  #Invite .banner p{
    text-align:center;
    font-size:0.28rem;
    color:#333333;
  }
  #Invite .banner p:nth-of-type(1){
    padding-top:0.66rem;
    /*margin-top:0.66rem;*/
  }
  #Invite .banner p:nth-of-type(2){
    font-size:0.48rem;
    color:#000000;
  }
  #Invite .banner p:nth-of-type(3){
    font-size:0.28rem;
    color:#999999;
    padding-top:0.8rem;
  }
  #Invite .invitebtn{
    width:92%;
    /*height:1rem;*/
    background:#00b8fe;
    margin:0 auto;
    text-align:center;
    padding-top:0.3rem;
    padding-bottom:0.3rem;
    border-radius:0.15rem;
    margin-top:0.66rem;
    color:#fff;
    margin-bottom:0.1rem;
  }
  #Invite .particulars{
    text-align:center;
    font-size:0.26rem;
    color:#555555;
  }
  #Invite .particulars span{
    color:#00b8fe;
  }
</style>
