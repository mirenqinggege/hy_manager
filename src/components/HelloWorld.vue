<template>
  <el-container direction="vertical">
    <top_nav/>
    <el-container>
      <left-aside/>
      <el-main>
        <router-view/>
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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-main{

}
</style>
