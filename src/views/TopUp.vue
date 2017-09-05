<template>
  <div id="TopUp">
    <card-one :cardOne="cardOne"></card-one>
    <h2>充值金额</h2>
    <ul class="recharge">
      <li v-for="(item,key) in cardOne.templates"  :class="{'hover':item.selected}" @click="hover(item,key)">
        <div class="left"><img src="../assets/images/price.png" alt=""></div>
        <div class="right">
          <p><span>￥</span>{{item.rulePrice}}</p>
          <p>赠送￥{{item.price}}</p>
        </div>
      </li>
    </ul>
    <div class="clear"></div>
    <div  @click="popupVisible = true" class="voucher">
      <span>礼券</span>
      <span>-￥{{activeObj.price}}<b>&nbsp></b></span>
    </div>
    <div class="hint">
      <img src="../assets/images/hint.png" alt="">&nbsp&nbsp这是一段文字说明，事后补充
    </div>
    <div class="pay" @click="payBtn()">
      支付（￥400）
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="popupBottom">
      <h3>选择礼券</h3>
      <ul class="addTicket">
        <!--<li><span>50元 <b>2017.05.31至2017.06.31</b></span><span>-->
          <!--<mt-radio-->
            <!--title="单选框列表"-->
            <!--v-model="value"-->
            <!--align="right"-->
            <!--:options="['选项A', '选项B', '选项C']">-->
          <!--</mt-radio>-->
        <!--</span></li>-->
        <!--<li><label><input type="checkbox" name="check">名称2</label></li>-->
        <li :class="{'active':item.selected}" @click="active(item)" v-for="item in cardOne.coupon">{{item.price}}元<span>&nbsp&nbsp{{item.time}}</span></li>
        <!--<img src="../assets/images/selected.png" alt="">-->
      </ul>
      <button @click="popupVisible = false" class="closeBtn">关闭</button>
    </mt-popup>

  </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import CardOne from '../components/CardOne.vue';
    import { Popup } from 'mint-ui';
    import { Radio } from 'mint-ui';
    export default{
        name: 'TopUp',
      data(){
        return{
          cardOne:{},
          cardId:'',
          popupVisible:false,
          value:'',
          ishover:false,
          hoverObj:{},
          thiskey:'',
          activeObj:{},
          adjust:{}
        }
      },
      components:{
          'card-one':CardOne
      },
      mounted(){
        this.cardId = this.$route.params.cardId;
        this.$ajax({
          method:'POST',
          data:{"cardId":this.cardId},
          url:'http://www.hitanbao.com/yen/card/build'
        }).then(function(response){
            console.log(response)
          if(response.data.message == 'SUCCESS'){

            this.cardOne = response.data.data;
            for(var i=0;i<this.cardOne.coupon.length;i++){
              if(this.cardOne.coupon[i].selected == true){
                this.activeObj.price = this.cardOne.coupon[i].price;
                this.activeObj = this.cardOne.coupon[i];
              }
            }

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
        hover(item,key){

          for(var i=0;i<this.cardOne.templates.length;i++){
            if(this.cardOne.templates[i].selected == true){
              this.cardOne.templates[i].selected = false;
            }
          }

          this.hoverObj.id = item.id;
          this.hoverObj.price = item.price;
          this.hoverObj.rulePrice = item.rulePrice;
          this.hoverObj.selected = item.selected;
          console.log(this.hoverObj);

//          this.$ajax({
//            method:'POST',
//            data:{
//              "cardId":this.cardId,
//              "templateId":this.hoverObj.id,
//              "couponId":this.activeObj.couponUserId
//            },
//            url:'/yen/card/adjust'
//          }).then(function(response){
//            if(response.data.message == 'SUCCESS'){
//              this.cardOne = response.data.data;
//            }else{
//              Toast({
//                message: response.data.message,
//                position: 'bottom',
//                duration: 3000
//              });
//            }
//          }.bind(this))
//            .catch(function (error) {
//              Toast({
//                message: '接口错误',
//                position: 'bottom',
//                duration: 3000
//              });
//            }.bind(this));

        },
        payBtn(){
          this.$ajax({
            method:'POST',
            data:{
                "cardId":this.cardId,
                "templateId":this.hoverObj.id,
                "couponId":this.activeObj.couponUserId
            },
            url:'http://www.hitanbao.com/yen/card/create'
          }).then(function(response){
            if(response.data.message == 'SUCCESS'){
              this.cardOne = response.data.data;
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
                message: '222',
                position: 'bottom',
                duration: 3000
              });
            }.bind(this));
        },
        active(item){
          for(var i=0;i<this.cardOne.coupon.length;i++){
            if(this.cardOne.coupon[i].selected == true){
              this.cardOne.coupon[i].selected = false;
            }
          }
            this.activeObj = item;
            console.log(this.activeObj);

          this.$ajax({
            method:'GET',
            data:{
              "cardId":this.cardId,
              "templateId":this.hoverObj.id,
              "couponId":this.activeObj.couponUserId
            },
            url:'http://www.hitanbao.com/api/yencardadjust'
          }).then(function(response){
            if(response.data.message == 'SUCCESS'){
              this.adjust = response.data.data;
              console.log(this.adjust);
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
  #TopUp ul.recharge{
    width:100%;
    margin:0 auto;
    justify-content:center;
    display: flex;
    flex-wrap:wrap;
  }
  #TopUp ul.recharge li{
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
  #TopUp ul.recharge li.hover{
    box-shadow: 0px 0px 70px rgba(0,184,254,0.8);
  }
  #TopUp ul.recharge li:hover{
    box-shadow: 0px 0px 70px rgba(0,184,254,0.8);
  }
  #TopUp ul.recharge li:nth-child(odd){
    margin-right:3.2%;
    /*margin-left:0.3rem;*/
  }
  #TopUp ul.recharge li .left{
    float:left;
    padding-top:0.2rem;
    padding-right:0.4rem;
    width:0.46rem;
    height:0.39rem;
  }
  #TopUp ul.recharge li .left img{
    /*width:0.46rem;*/
    /*height:0.39rem;*/
    width:100%;
    height:100%;
  }
  #TopUp ul.recharge li .right{
    font-size:0.36rem;
  }
  #TopUp ul.recharge li .right span{
    font-size:0.22rem;
    color:#333333;
  }
  #TopUp ul.recharge li .right p:last-child{
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
    width:0.26rem;
    height:0.26rem;
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
  #TopUp .popupBottom h3{
    text-align:center;
    padding:0.42rem 0.88rem 0 0;
    font-weight:400;
    color:#272525;
  }
  #TopUp .addTicket{
    width:90%;
    margin:0 auto;
    padding-bottom:2.2rem;
  }
  #TopUp .addTicket li{
    padding:0.34rem 0;
    border-bottom:1px solid #dcdcdc;
  }
  #TopUp .addTicket li{
    background: url('../assets/images/noselected.png') no-repeat 100% 0.3rem;
  }
  #TopUp .addTicket li.active{
    background: url('../assets/images/selected.png') no-repeat 100% 0.3rem;
  }
  #TopUp .addTicket li:hover {
    background: url('../assets/images/selected.png') no-repeat 100% 0.3rem;
  }
  #TopUp .addTicket li span{
    color:#999999;
    font-size:0.24rem;
  }
  #TopUp .closeBtn{
    height:1rem;
    width:100%;
    color:#fff;
    background:#00b8fe;
    font-size:0.34rem;
    border:0;
  }
</style>
