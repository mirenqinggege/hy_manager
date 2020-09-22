import router from "./router"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import store from "./store"

Nprogress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
});
const whiteList = ["/","/login"];
router.beforeEach((to, from, next) => {
  Nprogress.start();
  Nprogress.inc();
  if(whiteList.indexOf(to.path) === -1){
    if (!store.getters.isLoaded) {
      store.dispatch("GenerateRoutes").then(res => {
        router.addRoutes(res);
        store.dispatch("setIsLoaded").then(res => {
          console.log(store.getters.isLoaded)
        })
      })
    }
  }
  next();
})

router.afterEach(() => {
  Nprogress.done();
});
