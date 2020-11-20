import {login} from "@/api/login";

const token = {
  state: JSON.parse(sessionStorage.getItem("loginInfo")) || {
    key: undefined,
    token: undefined
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_KEY: (state, key) => {
      state.key = key;
    }
  },
  actions: {
    doLogin({commit}, user) {
      return new Promise(resolve => {
        login(user.username, user.password, user.verificationCode, user.uuid).then(res => {
          let token = res.data;
          let split = token.split(",");
          commit("SET_KEY", split[0]);
          commit("SET_TOKEN", split[1]);
          resolve(res);
        })
      })
    }
  }
}

export default token
