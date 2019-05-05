import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Problem from '@/components/Problem'
import ProblemSearch from "@/components/ProblemSearch";
import RequestSearch from "./components/RequestSearch";
import VModal from 'vue-js-modal'

Vue.use(Router)
Vue.use(VModal)

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
        path: '/problem/:id',
        name: 'problem',
        component: Problem
    },
    {
      path: '/request_search',
      name: 'requestSearch',
      component: RequestSearch
    }
    ]
})

export default router
