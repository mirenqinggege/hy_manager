<template>
  <div class="aside">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" background-color="#545c64" text-color="white">
      <template v-for="item in menuItems">
        <el-submenu v-if="item.hasChild" :index="item.id + ''">
          <template slot="title">
            <i :class="item.icon" v-if="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <template v-for="subItem in item.child">
            <el-menu-item :index="subItem.id + ''"><router-link tag="span" :to="subItem.link">{{subItem.title}}</router-link></el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="item.id + ''"><router-link tag="span" :to="item.link">{{item.title}}</router-link></el-menu-item>
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
const $ = require("jquery");
export default {
  name: "leftAside",
  data() {
    return {
      isCollapse: false,
      flag: true,
      menuItems: [
        {id: 1, title: "系统选项", icon: "el-icon-setting", link: "", hasChild: true, child: [
            {id: 100, title: "用户管理", icon: "", link: "", hasChild: false, child: []}
          ]},
        {id: 2, title: "操作记录", icon: "", link: "", hasChild: false, child: []},
        {id: 3, title: "登陆记录", icon: "", link: "", hasChild: false, child: []}
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
