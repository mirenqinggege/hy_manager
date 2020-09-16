<template>
<el-header>
  <div class="wrapper">
    <div class="logo">
      <img style="height: 80%;" src="http://www.jcfd.vip:81/static/hy/logo2.png">
    </div>
    <div class="_divider"></div>
    <div class="nav_wrapper"></div>
  </div>
</el-header>
</template>

<script>
export default {
  name: "top_nav"
}
</script>

<style lang="less" scoped>
  .el-header{
    background-color: #303133;
    padding: 0;

    .wrapper{
      display: flex;
      justify-content: left;

      ._divider{
        height: 60px;
        width: 1px;
        background-image: linear-gradient(#303133, #606266, #303133);
      }

      .logo,.nav_wrapper{
        height: 60px;
        line-height: 60px;
      }

      .logo{
        width: 200px;
        color: #606266;
        text-align: center;
        line-height: 60px;

        img{
          vertical-align: middle;
        }
      }

      .nav_wrapper{
        width: calc(100% - 200px);
      }
    }
  }
</style>
