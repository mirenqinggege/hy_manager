import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    children: [
      {
        name: "Index",
        path: "",
        component: (re) => require(['@/components/index'],re)
      }
    ]
  },{
    path: "/menu",
    component: HelloWorld,
    children: [
      {
        name: "SysMenu",
        path: "",
        component: (re) => require(['@/views/system/menu/index'],re)
      }
    ]
  }
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: routes
})
