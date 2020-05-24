import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Log from './components/Log.vue'
import Realtime from './components/Realtime.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'home',
      component:Home
    },
    {
      path: '/log',
      name: 'log',
      component:Log
    },
    {
      path: '/realtime',
      name: 'realtime',
      component:Realtime
    }

  ]
})