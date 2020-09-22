const isLoaded = {
  state: {
    isLoaded: false
  },
  mutations: {
    SET_IS_LOADED: (state, flag)=>{
      state.isLoaded = flag;
    }
  },
  actions: {
    setIsLoaded({commit}) {
      return new Promise(resolve => {
        commit("SET_IS_LOADED", true);
      })
    }
  }
}

export default isLoaded
