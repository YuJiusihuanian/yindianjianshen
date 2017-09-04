<template>
  <div id="Sports">
    <mt-swipe class="mt-swipe" :auto="4000">
      <mt-swipe-item v-for="(item,key) in sportsList.banner" :key="key" v-if="item.disable === true" class="item" ><img @click="jump(item)" :href="item.event.url" :src="item.icon" alt=""></mt-swipe-item>
    </mt-swipe>
    <ul class="nav">
      <li v-for="(item,key) in navList" :class="{'hover':navHoverN === key}" @click="navhover(key)">{{item}}</li>
    </ul>
    <div v-show="navHoverN === 0" class="classContent content">
      <div class="head"><img src="../assets/images/classContent.png" alt=""><h2>课程内容</h2></div>
      <div class="main">
        <div class="left"><img :src="detailObj.stockIcon" alt=""></div>
        <div class="right">
          <h3>{{detailObj.title}}</h3>
          <p>地址：{{addressList.name}}</p>
          <p>时间：{{detailObj.time}}</p>
          <p>价格：{{detailObj.price}}&nbsp&nbsp&nbsp&nbsp<span><img src="../assets/images/discount-hover.png" alt="">&nbsp&nbsp瘾卡{{detailObj.yenPrice}}</span></p>
        </div>
      </div>
      <div class="clearfix"></div>
      <p class="care">{{detailObj.care}}</p>
      <p class="tags"><span v-for="item in detailObj.tags">{{item}}</span></p>
      <div class="clearfix"></div>
      <div class="banner">
        <swiper :options="swiperOption"  ref="mySwiper">
          <swiper-slide><img src="../assets/images/classbanner1.png" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/images/classbanner2.png" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/images/classbanner1.png" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/images/classbanner2.png" alt=""></swiper-slide>
          <!--<div class="swiper-pagination" slot="pagination"></div>-->
        </swiper>
      </div>
      <div class="clearfix"></div>
      <div class="effect">
        <h4>训练效果</h4>
        <p>{{detailObj.trainingEffect}}</p>
      </div>
      <div class="clearfix"></div>
      <div class="crowd">
        <h4>适合人群</h4>
        <p>{{detailObj.crowd}}</p>
      </div>
      <div class="clearfix"></div>
      <div class="faq">
        <h4>FAQ</h4>
        <p>{{detailObj.faq}}</p>
      </div>
      <div class="clearfix"></div>
    </div>
    <div v-show="navHoverN === 1" class="coachContent content">
      <div class="head"><img src="../assets/images/coachContent.png" alt=""><h2>教练介绍</h2></div>
      <div class="main">
        <div class="right">
          <h3>{{coachList.desc}}</h3>
          <p>{{coachList.nick}}</p>
        </div>
        <div class="left"><img :src="detailObj.stockIcon" alt=""></div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div v-show="navHoverN === 2" class="mattersContent content">
      <div class="head"><img src="../assets/images/mattersContent.png" alt=""><h2>注意事项</h2></div>
      <p class="care">{{detailObj.care}}</p>
    </div>
    <div v-show="navHoverN === 3" class="stepsContent content">
      <div class="head"><img src="../assets/images/stepsContent.png" alt=""><h2>健身步骤</h2></div>
      <div class="flow">
        <div class="bg">
        </div>
        <div class="title">
          <p>预约付费成功</p>
          <p>扫描门禁二维码</p>
          <p>验证成功入场上课</p>
        </div>
      </div>
    </div>
    <div class="navbar">
      <router-link v-if="buttonList.disable" :to="{name:'Order',params:{orderId:detailObj.id}}" class="left">立即预约</router-link>
      <router-link v-if="!buttonList.disable" :to="{name:'Order',params:{orderId:detailObj.id}}" class="left" :class="{'disable':buttonList.disable === false}">立即预约</router-link>
    <router-link to="/invite" class="left">分享</router-link>
  </div>
  </div>
</template>
<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default{
        name: 'Sports',
        data(){
            return{
              sportsList:{},
              navList:['课程内容','教练介绍','注意事项','健身步骤'],
              navHoverN:0,
              detailObj:{},
              buttonList:{},
              addressList:{},
              coachList:{},
              swiperOption: {
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                slidesPerView: 2,
//                centeredSlides: false,
                paginationClickable: true,
                spaceBetween: 30,
                freeMode: true,
                onSlideChangeEnd: swiper => {
                  //这个位置放swiper的回调方法
                  this.page = swiper.realIndex+1;
                  this.index = swiper.realIndex;
                }
              }
            }
        },
      components: {
        swiper,
        swiperSlide
      },
      computed:{
        swiper() {
          return this.$refs.mySwiper.swiper;
        }
      },
      mounted(){
        this.swiper.slideTo(0, 0, false);
          this.$ajax({
            method:'POST',
            url:'/api/course/schedule'
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
            method:'POST',
            url:'/api/course/detail',
            params:{
              'id':this.$route.params.sportsId
            }
          }).then(function(response){
            if(response.data.message == 'SUCCESS'){
              this.detailObj = response.data.data;
              this.buttonList = response.data.data.button;
              this.addressList = response.data.data.address;
              this.coachList = response.data.data.coach;
              console.log(this.detailObj)
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
//          var anchor = this.$el.querySelector(selector)
//            document.body.scrollTop = anchor.offsetTop

        }
      }

    }
</script>
<style scoped>
  @import "../assets/css/swiper.min.css";
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
    z-index:99999;
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
    border-radius:0.2rem;
    margin-top:0.27rem;
    /*height:5rem;*/
  }
  #Sports .content .head{
    border-bottom:1px solid #dcdcdc;
    height:0.74rem;
  }
  #Sports .content .head img{
    float:left;
    padding-top:0.23rem;
    padding-left:0.3rem;
  }
  #Sports .content .head h2{
    line-height:0.74rem;
    text-indent: 0.2rem;
    font-size:0.34rem;
    font-weight:500;
    font-family:'黑体';
  }
  #Sports .classContent{
  }
  #Sports .classContent .main{
    width:96.54%;
    float:right;
    border-bottom:1px solid #dcdcdc;
    display:flex;
    padding:0.32rem 0 0.1rem 0.07rem;
    margin-bottom:0.3rem;
  }
  #Sports .classContent .main .left{
    padding-top:0.07rem;
  }
  #Sports .classContent .main .right{
    padding-left:0.3rem;
  }
  #Sports .classContent .main .right h3{
    font-size:0.28rem;
    color:#00b8fe;
    padding-bottom:0.14rem;
  }
  #Sports .classContent .main .right p{
    font-size:0.26rem;
    color:#666666;
    line-height:0.42rem;
  }
  #Sports .classContent .main .right p span{
    color:#00b8fe;
  }
  #Sports .classContent .care{
    font-size:0.26rem;
    color:#444;
    width:93.6%;
    margin:0 auto;
    line-height:0.4rem;
  }
  #Sports .classContent .tags{
    width:96.54%;
    float:right;
    border-bottom:1px solid #dcdcdc;
    padding-top:0.3rem;
    padding-bottom:0.25rem;
    margin-bottom:0.25rem;
  }
  #Sports .classContent .tags span{
    display:inline-block;
    text-align:center;
    border:1px solid #00b8fe;
    padding:0.14rem 0.2rem;
    /*padding:0.1rem 0.5rem;*/
    font-size:0.24rem;
    border-radius:0.3rem;
    background:rgba(241,251,255,1);
    margin-left:0.17rem;
  }
  #Sports .classContent .banner{
    height:100%;
    width:93.6%;
    margin:0 auto;

  }
  #Sports .swiper-container {
    width: 100%;
    /*height: 300px;*/
    /*margin: 20px auto;*/
  }
  #Sports .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  #Sports .swiper-slide img{
    max-width:100%;
    width:100%;
    dispaly:block;
    height:1.4rem;
  }
  #Sports .classContent .effect{
     width:100%;
      /*height:3rem;*/
     padding-top:0.3rem;
     padding-bottom:0.25rem;
    position:relative;
   }
  #Sports .classContent .effect p:after{
    content:'';
    display:block;
    background:url(../assets/images/bottom.png) center no-repeat;
    background-size: 100% 100%;
    width:0.26rem;
    height:0.16rem;
    margin:0 auto;
    margin-top:0.42rem;
  }
  #Sports .classContent .effect h4{
    font-size:0.28rem;
    display:block;
    background:pink;
    width:1.66rem;
    padding:0.12rem 0;
    border-radius:0 0.28rem 0.28rem 0;
    position:absolute;
    margin-top:0.15rem;
    text-indent:0.2rem;
    position:absolute;
    left:-0.05rem;
    border:1px solid #00b8fe;
    background:rgba(241,251,255,1);
    color:#444444;
    font-weight: 500;

  }
  #Sports .classContent .effect p{
    width:96.54%;
    font-size:0.26rem;
    /*float:right;*/
    line-height:0.44rem;
    color:#444444;
    padding-top:0.8rem;
    border-top:1px solid #dcdcdc;
    margin-left:3.46%;
  }

  #Sports .classContent .crowd{
     width:100%;
     padding-bottom:0.25rem;
     position:relative;
   }
  #Sports .classContent .crowd p:after{
    content:'';
    display:block;
    background:url(../assets/images/bottom.png) center no-repeat;
    background-size: 100% 100%;
    width:0.26rem;
    height:0.16rem;
    margin:0 auto;
    margin-top:0.42rem;
  }
  #Sports .classContent .crowd h4{
    font-size:0.28rem;
    display:block;
    background:pink;
    width:1.66rem;
    padding:0.12rem 0;
    border-radius:0 0.28rem 0.28rem 0;
    position:absolute;
    margin-top:0.15rem;
    text-indent:0.2rem;
    position:absolute;
    left:-0.05rem;
    border:1px solid #00b8fe;
    background:rgba(241,251,255,1);
    color:#444444;
    font-weight: 500;

  }
  #Sports .classContent .crowd p{
    width:96.54%;
    font-size:0.26rem;
    /*float:right;*/
    line-height:0.44rem;
    color:#444444;
    padding-top:0.8rem;
    margin-left:3.46%;
  }
  #Sports .classContent .faq{
    width:100%;
    padding-bottom:0.25rem;
    position:relative;
  }
  #Sports .classContent .faq p:after{
    content:'';
    display:block;
    background:url(../assets/images/bottom.png) center no-repeat;
    background-size: 100% 100%;
    width:0.26rem;
    height:0.16rem;
    margin:0 auto;
    margin-top:0.42rem;
  }
  #Sports .classContent .faq h4{
    font-size:0.28rem;
    display:block;
    background:pink;
    width:1.66rem;
    padding:0.12rem 0;
    border-radius:0 0.28rem 0.28rem 0;
    position:absolute;
    margin-top:0.15rem;
    text-indent:0.2rem;
    position:absolute;
    left:-0.05rem;
    border:1px solid #00b8fe;
    background:rgba(241,251,255,1);
    color:#444444;
    font-weight: 500;

  }
  #Sports .classContent .faq p{
    width:96.54%;
    font-size:0.26rem;
    /*float:right;*/
    line-height:0.44rem;
    color:#444444;
    padding-top:0.8rem;
    margin-left:3.46%;
  }
  #Sports:after{
    content:'';
    display:block;
    height:1.2rem;
  }
  #Sports .coachContent .main{
    width:96.54%;
    /*float:right;*/
    border-bottom:1px solid #dcdcdc;
    display:flex;
    padding:0.32rem 0 0.1rem 0.07rem;
    margin-bottom:0.3rem;
  }
  #Sports .coachContent .main .left{
    width:30%;
  }

  #Sports .coachContent .main .right{
    padding-left:0.3rem;
    width:70%;
  }
  #Sports .coachContent .main .right h3{
    font-size:0.28rem;
    color:#00b8fe;
    padding-bottom:0.14rem;
  }
  #Sports .coachContent .main .right p{
    font-size:0.26rem;
    color:#666666;
    line-height:0.42rem;
  }
  #Sports .coachContent .main .right p span{
    color:#00b8fe;
  }
  #Sports .mattersContent .care{
    font-size:0.26rem;
    color:#444;
    width:93.6%;
    margin:0 auto;
    line-height:0.4rem;
    padding:0.2rem 0;
  }
  #Sports .flow{
    display: flex;
    margin:0 auto;
    width:69%;
    padding-top:0.4rem;
    justify-content:space-between;
  }
  #Sports .flow .bg{
    background:url(../assets/images/flow.png) no-repeat;
    width:0.76rem;
    height:3.61rem;
    background-size:100% 100%;
    /*margin-left:0.8rem;*/
    /*margin-top:0.4rem;*/
  }
  #Sports .flow .title{
    margin-left:0.2rem;
    margin-top:0.12rem;
  }
  #Sports .flow .title p{
    /*line-height:1.4rem;*/
    text-align:center;
    padding:0.1rem 0.4rem;
    margin-bottom:0.8rem;
    background:#f5f5f5;
    font-size:0.28rem;
    color:#444444;
    border-radius:0.1rem;
  }
</style>
