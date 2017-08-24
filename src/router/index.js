import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const AddictionCard = resolve => require(['../views/AddictionCard.vue'], resolve);
const Hello = resolve => require(['../components/Hello.vue'], resolve);
const TopUp = resolve => require(['../views/TopUp.vue'], resolve);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
    }
  ]
})
