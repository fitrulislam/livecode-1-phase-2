import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ImagePage from './views/ImagePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter (to, from, next) {
        let statusLogin = localStorage.getItem('statusLogin')
        if (statusLogin === 'connected') {
          next('/imagepage')
        } else {
          next()
        }
      }
    },
    {
      path: '/imagepage',
      name: 'imagepage',
      component: ImagePage,
      beforeEnter (to, from, next) {
        let statusLogin = localStorage.getItem('statusLogin')
        if (statusLogin === 'connected') {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
