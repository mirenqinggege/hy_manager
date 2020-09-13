import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import topNav from '@/components/top_nav'
import leftNav from '@/components/left_nav'
import centerContainer from '@/components/center_container'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          name: "",
          path: "",
          components: {
            top: topNav,
            left: leftNav,
            center: centerContainer
          }
        }
      ]
    }
  ]
})
