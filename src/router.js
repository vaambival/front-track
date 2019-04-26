import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Problem from '@/components/Problem'
import ProblemSearch from "@/components/ProblemSearch";



Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/problem_search',
      name: 'problemSearch',
      component: ProblemSearch
    },
    {
      path: '/problem',
      name: 'problem',
      component: Problem
    }
  ]
})

export default router
