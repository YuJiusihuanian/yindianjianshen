<template>
  <div id="Coupon">
    <ul class="nav">
      <li v-for="(item,key) in navList" :class="{'hover':ind === key}" @click="navHover(item,key)">{{item}}</li>
    </ul>
    <p class="use">使用说明</p>
    <div class="noCoupon"　v-if="couponList === ''">
      <img src="../assets/images/coupon.png" alt="">
      <p>亲，还没有券喔~</p>
    </div>
    <div v-show="ind == 0" class="couponList"　v-if="couponList != ''">
      <div v-for="item in couponList" class="card">
        <span class="radiusLeft"></span>
        <span class="radiusRight"></span>
        <div class="top">
          <div class="price"><span>￥</span>{{item.price}}</div>
          <div class="content">
            <p>{{item.rule}}</p>
            <p>{{item.time}}</p>
            <p>{{item.sourceDesc}}</p>
          </div>
        </div>
        <div class="bottom">
          <div class="left"><img src="../assets/images/Couponhint.png" alt="">&nbsp&nbsp{{item.payType}}</div>
          <div class="right">1天后过期</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
      name: 'Coupon',
      data(){
          return{
            couponList:'',
            couponLis:'',
            navList:['未使用','已使用','已过期'],
            ind:0,
            couponList:{}
        }
      },
      mounted(){
        this.$ajax({
          method:'GET',
          url:'/api/couponuserlist'
        }).then(function(response){
          if(response.data.message == 'SUCCESS'){
            this.couponList = response.data.data;
            console.log(this.couponList)
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
        navHover(item,key){
            this.ind = key;
        }
      }
    }
</script>
<style scoped>
  #Coupon{
    width:100%;
    height:100%;
  }
  #Coupon .nav{
    width:90.4%;
    margin:0 auto;
    display:flex;
    margin:0 auto;
    justify-content:space-between;
    padding-top:0.42rem;
    /*padding-bottom:0.9rem;*/
  }
  #Coupon .use{
    font-size:0.22rem;
    color:#00b8fe;
    text-align:right;
    padding-right:0.5rem;
    line-height:1rem;
  }
  #Coupon .nav li{
    /*width:25%;*/
    text-align:center;
    font-size:0.28rem;
    color:#999999;
    padding:0.12rem 0.45rem;
  }
  #Coupon .nav li.hover{
    border-radius:0.38rem;
    background:#fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
    color:#000;
  }
  #Coupon .noCoupon{
    text-align:center;
    font-size:0.28rem;
    color:#999999;
    margin-top:50%;
  }
  #Coupon .couponList{
    /*background:#fff;*/
  }
  #Coupon .couponList .card{
    width:90.4%;
    margin:0 auto;
    background:#fff;
    height:2.58rem;
    border-radius: 0.18rem;
    margin-bottom:0.27rem;
    position:relative;
    border:1px solid #dcdcdc;
  }
  #Coupon .couponList .card .radiusLeft{
    width:0.2rem;
    height:0.2rem;
    border-radius:50%;
    background:#f5f5f5;
    position:absolute;
    border-right:1px solid #ccc;
    top:1.7rem;
    left:-0.1rem;
    z-index:99;
    /*box-shadow: 0px 0px 0px rgba(0,0,0,0.3);;*/
  }
  #Coupon .couponList .card .radiusRight{
    width:0.2rem;
    height:0.2rem;
    border-radius:50%;
    background:#f5f5f5;
    position:absolute;
    border-left:1px solid #ccc;
    top:1.7rem;
    right:-0.1rem;
    z-index:99;
    /*box-shadow: 0px 0px 0px rgba(0,0,0,0.3);;*/
  }
  #Coupon .couponList .card .price{
    font-size:0.74rem;
    color:#00b8fe;
    padding-top:0.44rem;
    padding-left:0.36rem;
  }
  #Coupon .couponList .card .top{
    display:flex;
  }
   #Coupon .couponList .card .top .content{
     display:flex;
     flex-direction:column;
     font-size:0.24rem;
     padding-top:0.4rem;
     padding-left:0.2rem;
   }
  #Coupon .couponList .card .top .content p:nth-of-type(1){
    font-size:0.28rem;
    color:#333333;
  }
  #Coupon .couponList .card .top .content p:nth-of-type(2){
    font-size:0.24rem;
    color:#999999;
  }
  #Coupon .couponList .card .top .content p:nth-of-type(3){
     font-size:0.24rem;
     color:#999999;
  }
  #Coupon .couponList .card .price span{
    font-size:0.32rem;

  }
  #Coupon .couponList .card .bottom{
    padding-top:0.2rem;
    margin:0 auto;
    margin-top:0.3rem;
    width:94%;
    display: flex;
    justify-content:space-between;
    border-top:1px dashed #ccc;
  }
  #Coupon .couponList .card .bottom .left{
    font-size:0.24rem;
  }
  #Coupon .couponList .card .bottom .left img{
    /*display:block;*/
    float:left;
    width:0.27rem;
    height:0.27rem;
  }
  #Coupon .couponList .card .bottom .right{
     font-size:0.24rem;
    color:red;
  }
</style>
