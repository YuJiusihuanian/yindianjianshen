<template>
  <div id="TopUp">
    <card-one :cardOne="cardOne"></card-one>
    <h2>充值金额</h2>
    <ul>
      <li>
        <div class="left"><img src="../assets/images/price.png" alt=""></div>
        <div class="right">
          <p><span>￥</span>500</p>
          <p>赠送￥200</p>
        </div>
      </li>
      <li>
        <div class="left"><img src="../assets/images/price.png" alt=""></div>
        <div class="right">
          <p><span>￥</span>500</p>
          <p>赠送￥200</p>
        </div>
      </li>
      <li>
        <div class="left"><img src="../assets/images/price.png" alt=""></div>
        <div class="right">
          <p><span>￥</span>500</p>
          <p>赠送￥200</p>
        </div>
      </li>
      <li>
        <div class="left"><img src="../assets/images/price.png" alt=""></div>
        <div class="right">
          <p><span>￥</span>500</p>
          <p>赠送￥200</p>
        </div>
      </li>
    </ul>
    <div class="clear"></div>
    <div  @click="popupVisible = true" class="voucher">
      <span>礼券</span>
      <span>-￥50<b>&nbsp></b></span>
    </div>
    <div class="hint">
      <img src="../assets/images/hint.png" alt="">&nbsp&nbsp这是一段文字说明，事后补充
    </div>
    <div class="pay">
      支付（￥400）
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="popupBottom">
      <ul>
        <li>11111</li>
        <li>11111</li>
        <li>11111</li>
        <li>11111</li>
      </ul>
    </mt-popup>

  </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import CardOne from '../components/CardOne.vue';
    import { Popup } from 'mint-ui';
    export default{
        name: 'TopUp',
      data(){
        return{
          cardOne:{},
          cardId:'',
          popupVisible:false,
          actions:[{
            name: '拍照',
            method: '111'
          }]
        }
      },
      components:{
          'card-one':CardOne
      },
      mounted(){
        this.cardId = this.$route.params.cardId;
        console.log(this.cardId);
        this.$ajax({
          method:'POST',
          data:{"cardId":1},
          url:'/yen/card/build'
        }).then(function(response){
          if(response.data.message == 'SUCCESS'){
            this.cardOne = response.data.data;
            console.log(response.data.data)
          }else{
            Toast({
              message: response.data.message,
              position: 'bottom',
              duration: 5000
            });
          }
        }.bind(this))
          .catch(function (error) {
            //无不通
          }.bind(this));
      },
      beforeUpdate(){

      }
    }
</script>
<style scoped>
  #TopUp{
    width:100%;
    padding-top:0.38rem;
  }
  #TopUp h2{
    font-size:0.28rem;
    color:#666666;
    width:91.2%;
    margin:0 auto;
    padding-top:0.66rem;
    padding-bottom:0.3rem;
    font-weight: normal;
    font-family: '黑体';
  }
  #TopUp ul{
    width:100%;
    margin:0 auto;
    justify-content:center;
    display: flex;
    flex-wrap:wrap;
  }
  #TopUp ul li{
    width:44.3%;
    /*float:left;*/
    border-radius:0.15rem;
    background:#fff;
    justify-content:center;
    display:flex;
    padding:0.28rem 0;
    margin-bottom:0.25rem;
    border:1px solid #dcdcdc;
  }
  #TopUp ul li:first-child{
    box-shadow: 0px 0px 70px rgba(0,184,254,0.8);
    }
  #TopUp ul li:nth-child(odd){
    margin-right:3.2%;
    /*margin-left:0.3rem;*/
  }
  #TopUp ul li .left{
    float:left;
    padding-top:0.2rem;
    padding-right:0.4rem;
  }
  #TopUp ul li .right{
    font-size:0.36rem;
  }
  #TopUp ul li .right span{
    font-size:0.22rem;
    color:#333333;
  }
  #TopUp ul li .right p:last-child{
    color:#42c2fe;
    font-size:0.22rem;
  }
  #TopUp .voucher{
    justify-content:space-between;
    display: flex;
    flex-wrap:wrap;
    width:85.6%;
    background:#fff;
    margin:0 auto;
    margin-top:0.4rem;
    padding:0.36rem 0;
    border:1px solid #dcdcdc;
    border-radius: 7px;
    padding-left:3.2%;
    padding-right:3.2%;
    color:#444444;
    font-size:0.28rem;
  }
  #TopUp .voucher span:last-child{
    color:#00b8fe;
  }
  #TopUp .voucher span:last-child b{
    color:#b0b0b0;
  }
  #TopUp .hint{
    width:92%;
    margin:0 auto;
    color:#999999;
    font-size:0.24rem;
    line-height:0.24rem;
    padding-top:0.18rem;
  }
  #TopUp .hint img{
    line-height:0.24rem;
    float:left;
  }
  #TopUp .pay{
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
    margin-bottom:0.72rem;
  }
  #TopUp .popupBottom{
    width:100%;

  }
</style>
