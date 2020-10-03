import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "../components/HelloWorld";

Vue.use(Router)

export const contentRoutes = [
  {
    path: '/',
    component: (re) => require(['@/views/login/login'], re),
    children: [
      {
        name: "Index",
        path: "index",
        component: (re) => require(['@/components/index'], re)
      }
    ]
  },
  {
    path: "/document",
    component: HelloWorld,
    children: [
      {
        name: "document_list",
        path: "",
        component: re => require(['@/views/content/document/document_list'], re)
      },
      {
        name: "document_uploading",
        path: "uploading",
        component: re => require(['@/views/content/document/document_uploading'], re)
      }
    ]
  }
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: contentRoutes
})
