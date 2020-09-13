<template>
<el-aside width="auto">
<left-aside></left-aside>
</el-aside>
</template>

<script>
import LeftAside from "./leftAside";
export default {
  name: "left_nav",
  components: {LeftAside}
}
</script>

<style lang="less" scoped>
  .el-aside{
    overflow: visible;
  }
</style>
