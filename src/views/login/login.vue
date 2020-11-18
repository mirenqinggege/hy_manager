<template>
  <div class="main">
    <div class="box">
      <el-form :rules="rules" ref="user" :model="user">
        <h3 style="text-align: center">Hy</h3>
        <el-form-item prop="username">
          <el-input v-model="user.username" prefix-icon="el-icon-user-solid" size="medium"
                    placeholder="账号"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="user.password" prefix-icon="el-icon-lock" size="medium "
                    placeholder="密码"/>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-row>
            <el-col :span="12">
              <el-input v-model="user.verificationCode" prefix-icon="el-icon-thumb" size="medium"
                        placeholder="验证码"/>
            </el-col>
            <el-col :span="12" style="text-align: center;">
              <el-image :src="captcha" @click="getCaptcha">
                <div slot="error">
                  <i class="el-icon el-icon-error"></i>
                </div>
              </el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-checkbox v-model="checked" size="mini" style="margin-bottom: 15px">记住密码</el-checkbox>
        <el-form-item>
          <el-button size="small" style="width: 100%" type="primary" @click="submitForm('user')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {login, getCaptcha} from "@/api/login";
import {ajaxCallback} from "@/util/ajaxResult";

export default {
  name: "logo",
  data() {
    return {
      captcha: undefined,
      uuid: undefined,
      user: {
        username: '',
        password: '',
        verificationCode: '',
      }, rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        verificationCode: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      },
      checked: false,
      _csrf: "1edd9a4f-9f08-4555-9c7a-841799ec5ae0"
    }
  },
  methods: {
    getCaptcha(){
      getCaptcha().then((res)=> {
        this.captcha = res.data.captcha;
        this.uuid = res.data.vc;
      }, ()=> {

      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.user.username, this.user.password, this.user.verificationCode, this.uuid).then(res => {
            ajaxCallback(res, () => {
              this.$router.push({name: 'index'});
            });
          });
        } else {
          console.warn('error submit!!');
          return false;
        }
      });
    },
  },
  created() {
    this.getCaptcha();
  }
}
</script>

<style>
.main {
  height: 100vh;
  background-image: url("../../assets/background_1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
}

/*折角动画*/
/*.main:before {*/
/*  content: '';*/
/*  position: absolute;*/
/*  top: 0;*/
/*  right: 0;*/
/*  width: 0;*/
/*  height: 0;*/
/*  border-style: solid;*/
/*  border-width: 0;*/
/*  border-color: rgba(0, 0, 0, 0.2) #fff;*/
/*  border-radius: 0 0 0 4px;*/
/*  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3), -1px 1px 1px rgba(0, 0, 0, 0.2);*/
/*  -webkit-transition: all 0.4s ease-out;*/
/*  transition: all 0.4s ease-out;*/
/*}*/

/*.main:hover:before {*/
/*  border-right-width: 100px;*/
/*  border-bottom-width: 100px;*/
/*}*/


.box {
  width: 330px;
  padding: 20px 20px 5px 20px;
  color: black;
  background: white;
  margin: 0 auto;
  border-radius: 6px;
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-50%);
}

.el-form-item__error {
  padding-top: 4px !important;
}

.el-form-item {
  margin-bottom: 18px !important;
}

.el-checkbox {
  font-size: 12px !important;
  margin-bottom: 5px !important;
}
</style>
