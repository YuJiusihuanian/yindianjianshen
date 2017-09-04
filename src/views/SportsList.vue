<template>
  <div id="SportsList">
    <mt-swipe class="mt-swipe" :auto="4000">
      <mt-swipe-item v-for="(item,key) in sportsList.banner" :key="key" v-if="item.disable === true" class="item" ><img @click="jump(item)" :href="item.event.url" :src="item.icon" alt=""></mt-swipe-item>
    </mt-swipe>
      <ul class="week">
        <li v-for="(item,key) in sportsList.calendar" :class="{'hover':ind === key}" @click="sportsHover(item,key)"><p v-if="ind === key">{{item.monthDayFormat}}</p>{{item.dayOfWeek}}</li>
      </ul>
      <div class="title">
        <h1>{{address.name}}</h1><span>查看地图&nbsp&nbsp<img src="../assets/images/right.png" alt=""></span>
      </div>
      <div class="clearfix"></div>
      <ul class="sportlist">
        <li v-for="(item,key) in weekList.course">
          <div class="content">
            <div class="left">
              <img :src="item.stockIcon" alt="">
              <div class="title">
                <p>{{item.title}}</p>
                <p><b v-for="tag in item.tags">{{tag}}<b class="point">·</b></b></p>
                <p>{{item.shortTime}}&nbsp&nbsp<span>{{item.price}}</span></p>
              </div>
            </div>
            <div class="right">
              <router-link v-if="item.button.disable === true" class="sportsBtn" :to="{name:'Sports',params:{sportsId:item.id}}">{{item.button.title}}</router-link>
              <router-link v-if="item.stock === 0" class="sportsBtn" :to="{name:'Sports',params:{sportsId:item.id}}">抢座 <span class="disc"><b>满员</b></span></router-link>
              <router-link v-if="item.stock < 10 && item.stock !=0" class="sportsBtn" :to="{name:'Sports',params:{sportsId:item.id}}">预约 <span class="disc"><b>紧张</b></span></router-link>
              <p><img src="../assets/images/discount-hover.png" alt="">&nbsp&nbsp瘾卡{{item.yenPrice}}</p>
            </div>
          </div>
        </li>
      </ul>
    <!--<ul class="sportlist">-->
      <!--<li v-for="(item,key) in weekList.course">{{key}}</li>-->
    <!--</ul>-->
    <div class="navbar">
      <router-link to="/" class="left" v-if="this.$route.name != 'SportsList'" :class="{'is-selected':this.$route.name != 'SportsList'}"><img src="../assets/images/courses.png" alt="">课程</router-link>
      <router-link to="/" class="left" v-if="this.$route.name === 'SportsList'" :class="{'is-selected':this.$route.name === 'SportsList'}"><img src="../assets/images/courses-hover.png" alt="">课程</router-link>
      <router-link to="/addictionCard" class="right" :class="{'is-selected':true}"><img src="../assets/images/my.png" alt="">我的瘾</router-link>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import { Toast } from 'mint-ui';
    export default{
        name: 'SportsList',
        data(){
            return{
              sportsList:{},
              hover:'',
              ind:0,
              weekList:{},
              address:{}
            }
        },
      mounted(){
        this.$ajax({
          method:'POST',
          url:'http://106.15.91.17/course/schedule'
        }).then(function(response){
          if(response.data.message == 'SUCCESS'){
            this.sportsList = response.data.data;
            this.weekList = response.data.data.course4Day[this.ind];
            this.address = response.data.data.address;
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
        sportsHover(item,key){
            this.ind = key;
          this.$ajax({
            method:'POST',
            url:'http://106.15.91.17/course/schedule'
          }).then(function(response){
            if(response.data.message == 'SUCCESS'){
              this.weekList = response.data.data.course4Day[this.ind];
              console.log(this.weekList)
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
        jump(item){
          console.log(item);
          window.location.href=item.icon;
        },
        book(){

        }
      }

    }
</script>
<style scoped>
  #SportsList{
    width:100%;
    height:100%;
  }
  #SportsList .mt-swipe{
    width:100%;
    height:2.4rem;
    width:100%;
  }
  #SportsList .item img {
    max-width:100%;
    width:100%;
    dispaly:block;
    height:2.4rem;
  }
  #SportsList .week{
    /*display: flex;*/
    /*justify-content:space-around;*/
    /*flex-wrap:nowrap;*/
    color:#666666;
    border-top:1px solid #dcdcdc;
    border-bottom:1px solid #dcdcdc;
    position:relative;
    height:0.6rem;
  }
  #SportsList .week li {
    float:left;
    width:14%;
    text-align:center;
    font-size:0.24rem;
    line-height:0.6rem;
    height:0.6rem
    /*padding:0.1rem 0;*/
  }
  /*#SportsList .week li:not(:first-child){*/
    /*padding:0.1rem 0;*/
  /*}*/

  #SportsList .week li.hover{
    border-radius:50%;
    border:2px solid #00b8fe;
    position:relative;
    height:0.96rem;
    width:0.96rem;
    left:0;
    top:-0.2rem;
    background:#fff;
    text-align:center;
    font-size:0.28rem;
    color:#000;
    line-height:0.4rem;
  }
  #SportsList .week li.hover p {
    font-size:0.22rem;
    color:#666666;
    padding-top:0.1rem;
  }
  #SportsList .title{
    font-size:0.26rem;
    color:#333333;
    display: flex;
    justify-content:space-between;
    flex-wrap:nowrap;
    line-height:0.6rem;
    width:93.33%;
    margin:0 auto;
    font-weight: 400;
    }
  #SportsList .title h1{
    font-family: '黑体';
    font-weight: 400;
    /*line-height:0.5rem;*/
  }
  #SportsList .title span{
    font-size:0.24rem;
    /*line-height:0.5rem;*/
  }
  #SportsList .title img{
    /*line-height:0.8rem;*/
    /*background:Red;*/
    height:0.26rem;
    width:0.16rem;
    padding-top:0rem;
    float:right;
    padding-top:0.17rem;
  }
  #SportsList .sportlist{

  }
  #SportsList .sportlist li{
    width:93.33%;
    height:1.9rem;
    background:#fff;
    margin:0 auto;
    border:1px solid #dcdcdc;
    border-radius:0.2rem;
    margin-bottom:0.15rem;
  }
  #SportsList .sportlist li .content{
    display:flex;
    justify-content:space-between;
    flex-wrap:nowrap;
    width:91.71%;
    margin:0 auto;
  }
  #SportsList .sportlist li .left{
    position:relative;
    /*background:blue;*/
    height:1.9rem;
    width:70%;
    display:flex;
  }
  #SportsList .sportlist li .left img{
    /*position:absolute;*/
    /*margin-top:-0.55rem;*/
    /*top:50%;*/
    /*left:0;*/
    max-width:1.1rem;
    max-height:1.1rem;
    margin-top:0.4rem;
    width:100%;
    height:100%;
  }
  #SportsList .sportlist li .left .title{
    display:flex;
    flex-direction:column;
    padding-left:0.22rem;
    justify-content:center;
  }
  #SportsList .sportlist li .left .title p{
    line-height:0.45rem;
    font-size:0.24rem;
    color:#666666;
  }
  #SportsList .sportlist li .left .title p:first-child{
    font-size:0.32rem;
    color:#000;
  }
  #SportsList .sportlist li .left .title p:last-child{
    color:#333;
    font-size:0.24rem;
  }
  #SportsList .sportlist li .right{
     /*position:relative;*/
     /*background:blue;*/
     height:1.9rem;
     /*width:100%;*/
     /*display:flex;*/
    position:relative;
  }
  #SportsList .sportlist li .right .sportsBtn{
    /*width:0.94rem;*/
    /*height:0.56rem;*/
    font-size:.26rem;
    color:#00b8fe;
    border:1px solid #00b8fe;
    border-radius:5px;
    padding:0.12rem 0.2rem;
    position:absolute;
    right:0;
    margin-top:0.65rem;
    /*float:right;*/
  }
  #SportsList .sportlist li .right p{
    font-size:0.24rem;
    color:#00b8fe;
    padding-top:1.3rem;
    /*position:absolute;*/
  }

  #SportsList .sportlist li .disc{
    /*background:url(../assets/images/discbg.png) no-repeat;*/
    /*width:0.68rem;*/
    /*height:0.68rem;*/
    /*position:absolute;*/
    /*top:-0.66rem;*/
    /*right:-0.29rem;*/
    content:"";
    display:block;
    height:0;
    border-width:0 0.3rem 0.3rem;
    border-style:none solid solid;
    border-color:transparent transparent #00b8fe;
    position:absolute;
    transform:rotate(45deg);
    left:0.46rem;
    top:-0.56rem;
    width:0.4rem;
  }
  #SportsList .sportlist li .disc b{
    /*transform: rotate(45deg);*/
    color:#fff;
    font-size:0.2rem;
    width: 0.68rem;
    height: 0.68rem;
    display: block;
    /*text-indent: 0.1rem;*/
    /*padding-top:0.02rem;*/
  }
  #SportsList .sportlist .title b:last-child .point{
    display:none;
  }
  #SportsList .navbar{
    /*height:0.99rem;*/
    width:100%;
    background:#fff;
    position:fixed;
    bottom:0;
    border-top:1px solid #dcdcdc;
    display:flex;
  }
  #SportsList .navbar a{
    width:50%;
    text-align:center;
    font-size:0.2rem;
    padding:0.1rem 0;
  }
  #SportsList .navbar img{
    display:block;
    margin:0 auto;
    margin-bottom:0.1rem;
  }
  #SportsList:after{
    content:'';
    display:block;
    height:1.2rem;
  }
</style>
