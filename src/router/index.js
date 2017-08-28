import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const AddictionCard = resolve => require(['../views/AddictionCard.vue'], resolve);
const Hello = resolve => require(['../components/Hello.vue'], resolve);
const TopUp = resolve => require(['../views/TopUp.vue'], resolve);
const Sports = resolve => require(['../views/Sports.vue'], resolve);
const SportsList = resolve => require(['../views/SportsList.vue'], resolve);
const Invite = resolve => require(['../views/Invite.vue'], resolve);
const Coupon = resolve => require(['../views/Coupon.vue'], resolve);
export default new Router({
  routes: [
    {
      path:'*',
      name:'All',
      component:SportsList
    },
    {
      path: '/',
      name: 'SportsList',
      meta: {
        title: '瘾健身'
      },
      component: SportsList
    },
    {
      path: '/addictionCard',
      name: 'AddictionCard',
      meta: {
        title: '瘾卡'
      },
      component: AddictionCard
    },
    {
      path: '/topup/:cardId',
      name: 'TopUp',
      meta: {
        title: '冲瘾健身'
      },
      component: TopUp
    },
    {
      path: '/sports/:sportsId',
      name: 'Sports',
      meta: {
        title: '反重力运动'
      },
      component: Sports
    },
    {
      path: '/invite',
      name: 'Invite',
      meta: {
        title: '邀请有奖'
      },
      component: Invite
    },
    {
      path: '/coupon',
      name: 'Coupon',
      meta: {
        title: '我的礼券'
      },
      component: Coupon
    }
  ]
})
