<template>
  <div id="Order">
    <div class="content">
      <div class="main">
        <div class="left"><img src="../assets/images/sportHead.png" alt=""></div>
        <div class="right">
          <h3>标题标题标题标题标题</h3>
          <p>地址：</p>
          <p>时间：</p>
          <p>价格：&nbsp&nbsp&nbsp&nbsp</p>
        </div>
      </div>
      <div class="bottom"><span>人数</span><span><b @click="peopleKey(key)" :class="{'peopleHover':peoplek == key}" v-for="(item,key) in peopleList">{{item}}</b></span></div>
    </div>
    <div  @click="popupVisible = true" class="voucher">
      <span>礼券</span>
      <span>-￥55<b>&nbsp></b></span>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="popupBottom">
      <h3>选择礼券</h3>
      <ul class="addTicket">
        <!--<li :class="{'active':item.selected}" @click="active(item)" v-for="item in cardOne.coupon">{{item.price}}元<span>&nbsp&nbsp{{item.time}}</span></li>-->
      </ul>
      <button @click="popupVisible = false" class="closeBtn">关闭</button>
    </mt-popup>
  </div>
</template>
<script>
    import { Popup } from 'mint-ui';
    import { Radio } from 'mint-ui';
    export default{
        name: 'Order',
        data(){
            return{
              peopleList:['1人','2人','3人'],
              peoplek:0,
              popupVisible:false
            }
        },
      mounted(){

      },
      methods:{
        peopleKey(key){
            this.peoplek = key;
            console.log(this.peoplek+1);
        }
      }
    }
</script>
<style scoped>
  #Order{
    width:100%;
    height:100%;
    padding-top:0.3rem;
  }
  #Order .content{
    border-radius:0.18rem;
    width:92.8%;
    margin:0 auto;
    background:#fff;
    border:1px solid #dcdcdc;
  }
  #Order .content .main{
    width:100%;
    border-bottom:1px solid #dcdcdc;
    display:flex;
    padding:0.32rem 0 0.1rem 0rem;
    /*margin-bottom:0.1rem;*/
  }
  #Order .content .main .left{
    padding-top:0.37rem;
    margin-left:0.3rem;
  }
  #Order .content .main .right{
    padding-left:0.3rem;
  }
  #Order .content .main .right h3{
    font-size:0.28rem;
    color:#00b8fe;
    padding-bottom:0.14rem;
  }
  #Order .content .main .right p{
    font-size:0.26rem;
    color:#666666;
    line-height:0.42rem;
  }
  #Order .content .main .right p span{
    color:#00b8fe;
  }
  #Order .content .bottom{
    display:flex;
    justify-content:space-between;
  }
  #Order .content .bottom span{
    line-height:1rem;
    /*padding-left:0.3rem;*/
    color:#333;
    font-size:0.3rem;
  }
  #Order .content .bottom span:nth-of-type(1){
    padding-left:0.3rem;
  }
  #Order .content .bottom b{
    padding:0.14rem 0.26rem;
    border:1px solid #dcdcdc;
    background:#fff;
    color:#666666;
    border-radius:5px;
    margin-left:0.18rem;
    /*margin-top:0.13rem;*/
  }
  #Order .content .bottom b:nth-of-type(3){
    margin-right:0.18rem;
  }
  #Order .content .bottom b.peopleHover{
    background:#00b8fe;
    border-color:#00b8fe;
    color:#fff;
  }
  #Order .voucher{
    justify-content:space-between;
    display: flex;
    flex-wrap:wrap;
    width:85.6%;
    background:#fff;
    margin:0 auto;
    margin-top:0.4rem;
    padding:0.36rem 0;
    border:1px solid #dcdcdc;
    border-radius:0.18rem;
    padding-left:3.2%;
    padding-right:3.2%;
    color:#444444;
    font-size:0.3rem;
  }
  #Order .voucher span:last-child{
    color:#00b8fe;
  }
  #Order .voucher span:last-child b{
    color:#b0b0b0;
  }
  #Order .popupBottom{
    width:100%;
  }
  #Order .popupBottom h3{
    text-align:center;
    padding:0.42rem 0.88rem 0 0;
    font-weight:400;
    color:#272525;
  }
  #Order .addTicket{
    width:90%;
    margin:0 auto;
    padding-bottom:2.2rem;
  }
  #Order .addTicket li{
    padding:0.34rem 0;
    border-bottom:1px solid #dcdcdc;
  }
  #Order .addTicket li{
    background: url('../assets/images/noselected.png') no-repeat 100% 0.3rem;
  }
  #Order .addTicket li.active{
    background: url('../assets/images/selected.png') no-repeat 100% 0.3rem;
  }
  #Order .addTicket li:hover {
    background: url('../assets/images/selected.png') no-repeat 100% 0.3rem;
  }
  #Order .addTicket li span{
    color:#999999;
    font-size:0.24rem;
  }
  #Order .closeBtn{
    height:1rem;
    width:100%;
    color:#fff;
    background:#00b8fe;
    font-size:0.34rem;
    border:0;
  }
</style>
