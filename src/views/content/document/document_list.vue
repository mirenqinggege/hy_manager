<template>
      <div style="">
        <!-- 搜索框 -->
        <el-form :inline="true" :model="document" class="demo-form-inline">
          <el-form-item>
            <el-input size="mini" v-model="document.title" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select size="mini" v-model="document.type" placeholder="文章类型">
              <el-option label="JAVA" value="1"></el-option>
              <el-option label="CSS/JS" value="2"></el-option>
              <el-option label="HTML" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini"><i class="el-icon-search" @click="search"></i>&nbsp;查询</el-button>
            <el-button type="info" size="mini"><i class="el-icon-refresh-left" @click="search"></i>&nbsp;重置</el-button>

          </el-form-item>
        </el-form>
        <!--  按钮  -->
        <el-row>
          <el-button type="primary" size="mini" @click="dialogFormVisible=true"><i class="el-icon-plus"></i>&nbsp;新增
          </el-button>
        </el-row>
        <!-- 表格 -->
        <el-row>
          <el-table
            :data="tableData"
            style="width: 100%;font-size: 12px"
            tooltip-effect="dark">
            <el-table-column
              prop="title"
              label="文章标题"
              :show-overflow-tooltip="true"
              width="400">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="上传人"
              fit="true">
            </el-table-column>
            <el-table-column
              prop="date"
              label="上传时间"
              :formatter="dateFormat">
            </el-table-column>
            <el-table-column
              prop="type"
              label="标签"
              :filters="[{ text: 'JAVA', value: 'JAVA' }, { text: 'CSS/JS', value: 'CSS/JS' }, { text: 'HTML', value: 'HTML' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type === 'code' ? 'primary' : 'primary'"
                  disable-transitions>
                  {{ scope.row.type === 1 ? "JAVA" : "CSS/JS" }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="checkNum"
              label="点击次数">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-dialog width="35%" title="添加文章" :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="ruleForm" :rules="rules" style="width: 500px">
            <el-form-item label="文章标题:" :label-width="formLabelWidth" prop="title">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文章类型:" :label-width="formLabelWidth">
              <el-radio-group v-model="form.type">
                <el-radio v-for="(item, i) in articleDict" :label='item.dictValue' :key="i">{{
                    item.dictLabel
                  }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            <el-button size="small" @click="cancel('ruleForm')">取 消</el-button>
          </div>
        </el-dialog>
      </div>
</template>
<script>
import request from "../../../util/request";
import {showLoading, hideLoading} from '../../../util/loading';

export default {
  name: "document_list",
  data() {
    return {
      show: false,
      document: {  //搜索框条件
        title: '',
        type: ''
      },
      tableData: undefined,
      form: {  //form表单
        title: '',
        type: "1"
      },
      formLabelWidth: '120px',
      dialogFormVisible: false, //对话框显示
      rules: {   //表单校验以及提示信息
        title: [
          {required: true, message: '请输入文章标题', trigger: 'blur'},
          {min: 5, max: 100, message: '请最少输入五个汉字···', trigger: 'blur'}
        ]
      },
      articleDict: []
    }
  }, created() {
    this.getAllDocumentListData();
    this.getDocumentDictListData();
  },
  methods: {
    fadeIn() {
      this.show = !this.show;
    },
    //标签筛选
    filterTag(value, row) {
      return row.type === value;
    },
    look(row) { //查看文章
      console.log("查看");
    },
    edit(row) { //编辑文章
      console.log("编辑");
    },
    del(row) {  //删除文章
      request({
        url: "delDocumentById",
        method: "PUT",
        params: {
          "id": row.id
        },
      }).then((res) => {
        if (res.code === "00000") {
          showLoading(); //加载动画
          let self = this;   // 当前this指向的是一个组件
          setTimeout(function () {
            self.getAllDocumentListData();
            hideLoading(); //结束加载动画
            self.$message({ //弹出提示信息
              showClose: true,
              message: '删除成功····',
              type: 'success'
            });
          }, 2000)
        }
      })
    },
    search() { //根据查询条件查询文章

    },
    add() { //添加文章

    },
    submitForm(formName) { //提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let til = this.form.title;
          let type = this.form.type;
          this.dialogFormVisible = false; //对话框消失
          this.$refs[formName].resetFields(); //重置表单
          //路由跳转
          this.$router.push({path: '/document/uploading', query: {title: til, type: type}});
        } else {
          return false;
        }
      });
    }, cancel(formName) { //取消对话框
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields(); //重置表单
    },
    dateFormat(row, column, cellValue, index) { //时间格式化
      let daterc = new Date(row.createdTime).getTime();
      if (daterc == null || daterc == "") return "";
      let date = new Date(parseInt(daterc));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getAllDocumentListData() {
      //获取文章列表
      request({
        url: 'getAllDocumentData',
        method: 'GET',
      }).then((res) => {
        if (res.code === "00000") {
          this.tableData = res.data;
        }
      })
    },
    getDocumentDictListData() {
      //获取文章字典数据
      request({
        url: "getDocumentDictData",
        method: "GET",
        params: {
          "type": "article_type"
        }
      }).then((res) => {
        if (res.code === "00000") {
          this.articleDict = res.data;
        }
      })
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

/* .slide-fade-leave-active for below version 2.1.8 */
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
