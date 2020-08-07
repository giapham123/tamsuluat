import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/'
import Comment from '../views/comment/'
import company from '../views/company/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Comment',
    component: Comment,
    props: true
  },
  {
    path: '/Addcompany',
    name: 'company',
    component: company,
    props: true
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
