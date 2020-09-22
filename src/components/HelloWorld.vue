<template>
  <el-container direction="vertical">
    <top_nav/>
    <el-container>
      <left-aside/>
      <el-main>
        <transition name="el-zoom-in-center">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Top_nav from "./top_nav";
import LeftAside from "./leftAside";

export default {
  name: 'HelloWorld',
  components: {LeftAside, Top_nav},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {},
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-main {

}
</style>
