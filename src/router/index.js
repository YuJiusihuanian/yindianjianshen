import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const AddictionCard = resolve => require(['../views/AddictionCard.vue'], resolve);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'AddictionCard',
      component: AddictionCard
    }
  ]
})
