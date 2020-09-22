<template>
<div class="icon-wrapper">
  <ul>
    <li v-for="item in iconList" @click="selectIcon(item.className)">
      <span>
        <i :class="item.className"></i>
      </span>
    </li>
  </ul>
</div>
</template>

<script>
import {getIcons} from "../api/icon";

export default {
  name: "iconSelect",
  data(){
    return {
      iconList: []
    }
  },
  props: {
    selectIcon:{
      type: Function,
      require: true
    }
  },
  created() {
    this.getIcons();
  },
  methods: {
    getIcons(){
      getIcons().then(res => {
        this.iconList = res.data;
      });
    }
  }
}
</script>

<style lang="less" scoped>
.icon-wrapper{
  height: calc(80vh);
  overflow-y: auto;
  ul{
    display: inline-block;
    margin: 1px 0;
    padding: 0 1.5em;
    li{
      display: inline-block;
      width: 3em;
      height: 3em;
      font-size: 1.5em;
      line-height: 3em;
      border: 1px solid black;
      margin-right: -1px;
      margin-bottom: -1px;
      text-align: center;
      transition: color 1s initial;
    }
    li:hover{
      color: #409EFF;
      cursor: pointer;
    }
  }
}
</style>
