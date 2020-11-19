export default {
  routes: state => state.loadRoutes.routes,
  isLoaded: state => state.isLoaded.isLoaded,
  token: state => state.token.token,
  key: state => state.token.key
}
