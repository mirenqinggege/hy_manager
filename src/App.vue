<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.addEventListener("unload", this.saveLogin);
  },
  methods: {
    saveLogin(){
      let loginInfo = {
        'key': this.$store.getters.key,
        'token': this.$store.getters.token
      }
      sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
