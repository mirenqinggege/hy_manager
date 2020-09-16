<template>
  <el-submenu v-if="menuItem.type === 'M'" :index="menuItem.path">
    <template slot="title">
      <i :class="menuItem.icon" v-if="menuItem.icon"></i>
      <span v-html="menuItem.name"></span>
    </template>
    <menu-item v-for="item in menuItem.child" :key="item.menuId + ''" :menu-item="item"/>
  </el-submenu>
  <el-menu-item v-else :index="menuItem.path">
    <span slot="title" v-html="menuItem.name"></span>
  </el-menu-item>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    menuItem: {
      type: Object,
      require: true
    }
  }
}
</script>
