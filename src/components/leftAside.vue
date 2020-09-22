<template>
  <div class="aside">
    <el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="white" :router="true">
      <menu-item v-for="item in menuItems" :key="item.menuId + ''" :menu-item="item"/>
    </el-menu>
    <!--   展开 -->
    <div @mouseover="showNav" @mouseout="hideNav" class="unfold"
         style="width: 10px;display: block;float: left;opacity: 0">
      <a href="#" @click="setStatus">
        <i class="el-icon-arrow-left" style="background-color: white;height: calc(100vh - 60px);line-height: calc(100vh - 60px);text-align: center;margin-left:-2px"></i>
      </a>
    </div>
    <a href="" target="_self"></a>
  </div>
</template>
<script>
import {initMenu} from '../api/menu/index'
import MenuItem from "./menuItem";
const $ = require("jquery");
export default {
  name: "leftAside",
  components: {MenuItem},
  data() {
    return {
      isCollapse: false,
      flag: true,
      menuItems: [],
      active: undefined
    };
  },
  created(){
    this.initMenu();
  },
  methods: {
    initMenu(){
      initMenu().then(res => {
        this.menuItems = res.data;
      })
    },
    setStatus() {
      this.isCollapse = !(this.isCollapse)
      if (this.isCollapse) {
        $(".unfold a i").attr("class", "el-icon-arrow-right")
      } else {
        $(".unfold a i").attr("class", "el-icon-arrow-left")
      }
    },
    showNav() {
      $(".unfold").animate({"opacity": "1"})
    },
    hideNav() {
      $(".unfold").animate({"opacity": "0"})
    }
  },
  mounted() {
    this.active = this.$route.path;
  }
}
</script>

<style scoped>
.el-menu {
  text-align: left;
  height: calc(100vh - 60px);
  border: none;
  display: block;
  float: left;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-item i {
  color: white !important;
}

.el-submenu__title i {
  color: white;
}

.unfold{
  position: absolute;
  right: -11px;
  z-index: 2;
}

.aside{
  position: relative;
}

.unfold:hover {
  box-shadow: 2px 0 5px -1px rgb(84, 92, 100);
  display: block;
}
</style>
