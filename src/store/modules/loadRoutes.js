import {contentRoutes} from "@/router"
import {getRoutes} from "@/api/menu";
import HelloWorld from "@/components/HelloWorld";


const loadRoutes = {
  state: {
    routes: [],
    addRoutes: []
  },
  actions: {
    GenerateRoutes({commit}) {
      return new Promise(resolve => {
        getRoutes().then(res => {
          const accessRoutes = filterAsyncRouter(res.data);
          commit("SET_ROUTES", accessRoutes);
          resolve(accessRoutes);
        })
      })
    }
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = contentRoutes.concat(routes);
    }
  }
}

function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === "HelloWorld") {
        route.component = HelloWorld;
      } else {
        route.component = loadView(route.component);
      }
    }
    if(route.children != null && route.children.length){
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  })
}

export const loadView = (view) =>{
  return (resolve) => require([`@/views/${view}`],resolve);
}

export default loadRoutes
