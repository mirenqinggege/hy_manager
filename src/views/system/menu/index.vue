<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="菜单名称">
              <el-input v-model="search.name"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="list-wrapper">
      <el-table :data="menus" style="width: 100%" row-key="menuId" default-expand-all
                :tree-props="{children: `child`, hasChildren: 'hasChildren'}">
        <el-table-column label="菜单名称" prop="name"/>
        <el-table-column label="排序" prop="orderNum"/>
        <el-table-column label="菜单类型" prop="type"/>
        <el-table-column label="菜单图标" prop="icon"/>
        <el-table-column label="路由路径" prop="path"/>
        <el-table-column label="组件路径" prop="component"/>
        <el-table-column label="菜单状态" prop="status"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="paging-wrapper">

    </div>
    <el-dialog :visible.sync="editVisible">
      <el-form label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum"/>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type">
            <el-radio label="菜单" value="M"/>
            <el-radio label="按钮" value="B"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="路由路径">
          <el-input v-model="form.path"/>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="form.component"/>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-radio-group v-model="form.status">
            <el-radio label="正常" value="0"/>
            <el-radio label="禁用" value="1"/>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="editSave">保存</el-button>
      <el-button type="info" @click="editVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {edit, getMenuInfo, initMenu} from "../../../api/menu";
import {ajaxSuccess} from "../../../util/ajaxResult";

export default {
  name: "index",
  data() {
    return {
      search: {
        name: undefined
      },
      form: {
        name: undefined,
        orderNum: undefined,
        type: 'M',
        path: undefined,
        component: undefined,
        status: '0'
      },
      menus: [],
      editVisible: false
    }
  },
  created() {
    this.getMenus();
  },
  methods: {
    getMenus() {
      initMenu().then(res => {
        this.menus = res.data;
        console.log(this.menus);
      });
    },
    edit(row) {
      getMenuInfo(row.menuId).then(res => {
        this.form = res.data;
        this.editVisible = true;
      })
    },
    editSave() {
      edit(this.form).then(res => {
        ajaxSuccess(res);
      })
      this.editVisible = false;
    },
    remove(row) {
      console.log("删除", row.menuId);
    }
  }
}
</script>

<style lang="less" scoped>

</style>
