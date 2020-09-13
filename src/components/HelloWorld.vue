<template>
  <el-container direction="vertical">
    <div class="top">
      <router-view name="top"></router-view>
    </div>
    <div class="wrapper">
      <router-view name="left"></router-view>
      <router-view name="center"></router-view>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-container{
  @leftWidth: 12em;
  .top{
    width: 100%;
  }
  .left{
    height: calc(100vh - 60px);
  }
  .center{
    width: calc(100% - @leftWidth);
    height: calc(100vh - 60px);
  }
  .wrapper{
    display: flex;
    justify-content: left;
  }
}
</style>
