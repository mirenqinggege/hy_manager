<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <el-form label-width="0px" size="mini">
        <el-row>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="search.name" placeholder="菜单名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" size="mini">
                <i class="el-icon-search"></i>
                搜索
              </el-button>
              <el-button type="info">
                <i class="el-icon-refresh"></i>
                重置
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="list-wrapper">
      <div class="button-wrapper">
        <el-button type="primary" @click="add" size="mini">
          <i class="el-icon-plus"></i>
          新增
        </el-button>
      </div>
      <el-table :data="menus" style="width: 100%" row-key="menuId"
                :tree-props="treeProps" lazy :load="load">
        <el-table-column label="菜单名称" prop="name"/>
        <el-table-column align="center" label="排序" prop="orderNum"/>
        <el-table-column align="center" label="菜单类型" prop="type">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 'M'">菜单</span>
            <span v-else>按钮</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="菜单图标" prop="icon">
          <template slot-scope="scope">
            <i v-if="scope.row.icon" :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" label="路由路径" prop="path"/>
        <el-table-column align="center" label="组件路径" prop="component"/>
        <el-table-column align="center" label="菜单状态" prop="status">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '0'">正常</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
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
      <el-form label-width="80px" :model="form" :rules="rules" ref="mainForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="上级目录">
              <el-popover v-model="showMenuTree">
                <menu-tree :on-select="selectParentMenu"/>
                <el-input slot="reference" :disabled="true" v-model="form.parentName"></el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="菜单类型">
              <el-radio-group v-model="form.type">
                <el-radio label="M">菜单</el-radio>
                <el-radio label="B">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="form.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="排序">
              <el-input-number v-model="form.orderNum" style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="路由路径" prop="path">
              <el-input v-model="form.path"/>
            </el-form-item>
          </el-col>
          <el-col :span="1" v-if="form.type === 'B'">&nbsp;</el-col>
          <el-col :span="10" v-if="form.type === 'B'">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component"/>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="菜单图标">
              <el-button-group>
                <el-button plain @click="showIcon = true">
                  <i :class="form.icon" v-if="form.icon"></i>
                  <span v-else>&nbsp;</span>
                </el-button>
                <el-button plain v-html="form.name || '&nbsp;'" @click="showIcon = true"
                           style="width: 100px;"></el-button>
              </el-button-group>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="菜单状态">
              <el-radio-group v-model="form.status">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <el-button type="primary" @click="Save" round>保存</el-button>
      <el-button type="info" @click="editVisible = false" round>取消</el-button>
    </el-dialog>
    <el-drawer :visible.sync="showIcon">
      <icon-select :select-icon="selectIcon"/>
    </el-drawer>
  </div>
</template>

<script>
import {edit, getMenuInfo, getMenus, getRootMenu, initMenu, remove, save} from "../../../api/menu";
import {ajaxCallback} from "../../../util/ajaxResult";
import MenuTree from "../../../components/menuTree";
import IconSelect from "../../../components/iconSelect";

export default {
  name: "index",
  components: {IconSelect, MenuTree},
  data() {
    return {
      search: {
        name: undefined
      },
      form: {
        type: "M",
        status: "0",
        orderNum: 0,
        parentName: "顶级目录"
      },
      rules: {
        name: [
          {required: true, message: "请输入菜单名", trigger: "blur"}
        ],
        path: [
          {required: true, message: "请输入路由地址", trigger: "blur"}
        ],
        component: [
          {required: true, message: "请输入组件地址", trigger: "blur"}
        ]
      },
      menus: [],
      editVisible: false,
      showMenuTree: false,
      showIcon: false,
      treeProps: {
        children: "child",
        hasChildren: "hasChildren"
      }
    }
  },
  created() {
    this.getRootMenus();
  },
  methods: {
    load(tree, treeNode, resolve) {
      this.getMenuByParentId(tree.menuId, resolve);
    },
    selectIcon(className) {
      this.showIcon = false;
      this.form.icon = className;
    },
    selectParentMenu(data) {
      console.log(data);
      if (data.type === "B") {
        this.$message.error("上级目录必须是菜单类型");
      } else {
        this.form.parentId = data.menuId;
        this.form.parentName = data.name;
        this.showMenuTree = false;
      }
    },
    getRootMenus() {
      getRootMenu().then(res => {
        this.menus = res.data;
      })
    },
    getMenuByParentId(menuId, resolve) {
      getMenus({parentId: menuId}).then(res => {
        resolve(res.data);
      })
    },
    add() {
      this.form = {
        type: "M",
        status: "0",
        orderNum: 0,
        parentName: "顶级目录"
      };
      this.editVisible = true;
    },
    edit(row) {
      getMenuInfo(row.menuId).then(res => {
        this.form = res.data;
        this.editVisible = true;
        if (!res.data.parentId) {
          this.form.parentName = "顶级目录";
        }
      })
    },
    Save() {
      this.$refs.mainForm.validate(valid => {
        if (valid) {
          save(this.form).then(res => {
            ajaxCallback(res, ()=>{
              this.getRootMenus();
            });
          })
          this.editVisible = false;
        }
      });
    },
    remove(row) {
      remove(row.menuId).then(res => {
        ajaxCallback(res,()=>{
          this.getRootMenus();
        });
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
