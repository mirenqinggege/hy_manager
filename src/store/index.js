import Vue from "vue"
import Vuex from "vuex"
import loadRoutes from "./modules/loadRoutes";
import isLoaded from "./modules/isLoaded";
import token from "./modules/token";
import getters from "./getters";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loadRoutes,
    isLoaded,
    token
  },
  getters
});
