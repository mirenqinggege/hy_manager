import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const contentRoutes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    children: [
      {
        name: "Index",
        path: "index",
        component: (re) => require(['@/components/index'],re)
      }
    ]
  }
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: contentRoutes
})
