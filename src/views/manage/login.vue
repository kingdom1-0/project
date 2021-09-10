<template>  
  <div class="log_content">
    <div class="log_bg">
      <iframe src="canvas.html" />
    </div>
    <!-- 登录 -->
    <div class="log_conBlock">
      <div class="log_logo">
        <img src="/images/logo.png">
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="logIn"
          />
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="bu_block">
          <el-button
            type="primary"
            @click="logIn"
          >
            登 录
          </el-button>
          <el-button
            type="info"
            @click="reset"
          >
            重 置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 登录 -->    
  </div>  
</template>
<script>
import {
    thisDate
  } from './js/common.js'
export default {
  data(){
    return {
        resetPassword: false, // 重置密码
        // 这是登录表单的数据绑定对象
        form: {
          username: 'admin',
          password: ''
        },
        // 这是表单的预验证规则对象
        rules: {
          username: [ // 预验证用户名
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 15,
              message: '长度在 3 到 15 个字符',
              trigger: 'blur'
            }
          ],
          password: [ // 预验证密码
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 15,
              message: '长度在 6 到 15 个字符',
              trigger: 'blur'
            }
          ]
        },             
    }
  },
  methods:{
    loginfo(n) { // 记录登陆数据
        const ip = '192.168.18.186'
        const state = n
        const name = this.form.username
        const date = thisDate()
        var logDa = {
          state,
          name,
          ip,
          date
        }
        this.$http.post('loginfo', logDa)
      },
      // 点击提交，预验证
      logIn() {
        var _this = this
        this.$refs.formRef.validate(async value => { 
          if (!value) {// 判断是否通过表单预验证
            return
          }
          // 登陆验证
          const {
            data: res
          } = await this.$http.post('login', this.form)
          console.log(res)
          if (res.meta.status != 200) { // 响应状态
            this.$message.error(res.meta.message)
            _this.loginfo(0)
          } else {
            this.$message.success(res.meta.message)
            sessionStorage.setItem('token', res.token) //记录token值
            sessionStorage.setItem('username', this.form.username)  //记录用户名
            this.state = 1
            _this.loginfo(1)
            this.$router.push('common')
          }
        })
      },
      reset() { // 表单重置
        this.$refs.formRef.resetFields()
      }
  }
}
</script>
<style lang="less" scoped>
    .log_content {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  .log_bg {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .log_bg iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1920px;
    margin-left: -960px;
    margin-top: -960px;
    border: 0px;
  }

  .log_conBlock {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    margin-left: -200px;
    margin-top: -100px;
    background: #fff;
    padding: 30px 20px 10px 20px;

  }

  .log_logo {
    position: absolute;
    top: -60px;
    text-align: center;
    width: 100%;
    left: 0px;
  }

  .log_logo img {
    display: block;
    margin: auto;
  }

  .bu_block {
    text-align: center;
  }
</style>