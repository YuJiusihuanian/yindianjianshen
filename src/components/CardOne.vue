<template>
  <div id="Card">
    <div class="card">
      <div :style="{backgroundImage:'url('+ bg +')'}" class="cardTop">
        <div class="cardContent">
          <div class="cardTitle">
            <div  class="title">
              <h1>瘾卡</h1>
              <span>
                普通卡
                <br>
                YEN CARE
              </span>
            </div>
            <div class="cardPrice">
              <p><span>余额：</span><b>￥</b>{{cardOne.total}}</p>
              <p class="discount"><img src="../assets/images/discount.png" alt="">&nbsp{{cardOne.discount}}</p>
            </div>
          </div>
        </div>
        <div class="cardImg">
          <img :src="cardOne.bgImage" alt="">
        </div>
      </div>
      <div class="cardBottom">
        <span>现金:￥{{cardOne.cash}}</span>
        <span>赠送:￥{{cardOne.gift}}</span>
        <router-link view v-wechat-title="$route.meta.title" class="cardRule" to="./">规则&nbsp></router-link>
        <!--<button class="cardBtn" @click="cardBtn()">充值</button>-->
      </div>
    </div>
  </div>
</template>
<script>

    export default{
      name: 'Card',
      props: ['cardOne'],
      data(){
        return{
          bg:require('../assets/images/cardBg.png')
        }
      },
      methods:{
        cardBtn(){
          this.$ajax({
            method:'POST',
            url:'/yen/card/list'
          }).then(function(response){
            console.log(response);
          }.bind(this))
        }
      }

    }
</script>
<style scoped>
  #Card{
    width:100%;
  }
  #Card .card{
    width:91.2%;
    height:3.6rem;
    border-radius:0.25rem;
    margin:0 auto;
    position:relative;
    box-shadow: 10px 10px 100px #d9d9d9;
  }
  #Card .card:not(:first-child){
    margin-top:0.38rem;
  }
  #Card .cardTop{
    position:absolute;
    left:0;
    top:0;
    border-radius:0.25rem 0.25rem 0 0;
    height:2.7rem;
    width:100%;
    background:#00b8fe;
    z-index:2;
    background-position: 10% 10%;
  }
  #Card .cardBottom{
    position:absolute;
    left:0;
    bottom:0;
    border-radius:0 0 0.25rem 0.25rem;
    height:0.9rem;
    width:100%;
    z-index:2;
  }
  #Card .cardTitle{
    float:left;
    width:55%;
    position:relative;
  }
  #Card .cardImg{
    float:right;
    width:45%;
  }
  #Card .cardTitle h1{
    font-family:MFLiHei_Noncommercial-Regular;
    font-size:0.6rem;
    color:#fff;
    font-weight:normal;
    float:left;
  }
  #Card .cardTitle h1:after{
    content:'';
    border-left:1px solid #fff;
    height:0.34rem !important;
    margin-left:0.17rem;
    width:100%;
    display:block;
    top:30%;
    position:absolute;
    left:42.5%
  }
  #Card .cardTitle .title{
    width:100%;
    height:0.7rem;
    width:2.8rem;
    position:absolute;
    left:50%;
    margin-left:-1.4rem;
    top:0.48rem;
  }
  #Card .cardTitle .title span{
    float:left;
    padding-left:0.37rem;
    font-size:0.24rem;
    color:#fff;
    font-weight: 200;
  }
  .cardTitle div{
    width:100%;
  }
  #Card .cardPrice{
    width:100%;
    display:block;
    position:absolute;
    left:50%;
    margin-left:-1.3rem;
    /*width:2.8rem;*/
    top:1.4rem;
  }
  #Card .cardPrice p{
    font-size:0.52rem;
    color:#f3ff3a;
    font-weight: 200;
  }
  #Card .cardPrice span{
    color:#fff;
    font-size:0.27rem;
  }
  #Card .cardPrice b{
    font-size:0.24rem;
    colo:#fff;
  }
  #Card .cardPrice p.discount{
    color:#fff;
    font-size:0.22rem;
    margin-top:0.12rem;
  }
  #Card .cardImg img{
    /*width:1.61rem;*/
    /*height:1.61rem;*/
    /*border:4px solid #fff;*/
    /*border-radius:50%;*/
    position:absolute;
    right:0.4rem;
    top:0.52rem;
  }
  #Card .cardBottom span{
    font-size:0.26rem;
    color:#666666;
    line-height:0.9rem;
  }
  #Card .cardBottom span:first-child{
    padding-left:0.36rem;
  }
  #Card .cardRule{
    font-size:0.26rem;
    color:#00b8fe;
    float:right;
    margin-right:0.4rem;
    margin-top:0.3rem;
  }
</style>
