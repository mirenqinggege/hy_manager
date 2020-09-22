<template>
  <div class="menu-tree-wrapper">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-tree
      @node-click="onSelect"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2">
    </el-tree>
  </div>
</template>

<script>
import {initMenu} from "../api/menu";

export default {
  name: "menuTree",
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  props:{
    onSelect: {
      type: Function,
      require: true
    }
  },
  created() {
    this.getMenuTree();
  },
  methods: {
    getMenuTree(){
      initMenu().then(res => {
        this.data[0].child = res.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  data() {
    return {
      filterText: undefined,
      data: [{menuId: null, type: "M", name: "顶级目录", child: []}],
      defaultProps: {
        label: "name",
        children: "child"
      }
    }
  }

}
</script>

<style scoped>

</style>
