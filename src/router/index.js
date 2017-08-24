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
      name: 'AddictionCard',
      component: AddictionCard
    },
    {
      path: '/AddictionCard',
      name: 'AddictionCard',
      component: AddictionCard
    },
    {
      path: '/TopUp',
      name: 'TopUp',
      component: TopUp
    }
  ]
})
