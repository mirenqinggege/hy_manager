<template>
  <div class="aside">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" background-color="#545c64" text-color="white">
      <template v-for="item in menuItems">
        <el-submenu v-if="item.child.length" :index="item.menuId + ''">
          <template slot="title">
            <i :class="item.icon" v-if="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <template v-for="subItem in item.child">
            <el-menu-item :index="subItem.menuId + ''"><router-link tag="span" to="">{{subItem.name}}</router-link></el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="item.menuId + ''"><router-link tag="span" to="">{{item.name}}</router-link></el-menu-item>
      </template>
    </el-menu>
    <!--   展开 -->
    <div @mouseover="showNav" @mouseout="hideNav" class="unfold"
         style="width: 10px;display: block;float: left;opacity: 0">
      <a href="#" @click="setStatus">
        <i class="el-icon-arrow-left" style="background-color: white;height: calc(100vh - 60px);line-height: calc(100vh - 60px);text-align: center;margin-left:-2px"></i>
      </a>
    </div>
  </div>
</template>
<script>
import {initMenu} from '../api/menu/index'
const $ = require("jquery");
export default {
  name: "leftAside",
  data() {
    return {
      isCollapse: false,
      flag: true,
      menuItems: [

      ]
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
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

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
