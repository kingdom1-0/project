<template>
  <div class="man_content">
    <div class="log_content" v-if="shOn">
      <div class="log_bg">
        <iframe src="canvas.html"></iframe>
      </div>
      <div class="log_conBlock">
        <div class="log_logo"><img src="../../images/logo.png" /></div>
        <el-form ref="formRef" :model="form" :rules="rules">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
          </el-form-item>

          <!-- 按钮区域 -->
          <el-form-item class="bu_block">
            <el-button type="primary" @click="logIn">登 录</el-button>
            <el-button type="info" @click="reset">重 置</el-button>
            <!-- <el-button type="info" @click="register">注 册</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="man_body" v-if="!shOn">
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="22">
              <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                active-text-color="#409EFF">
                <img class="logo" src="../../images/logo.png" />
                <el-submenu index="1">
                  <template slot="title">
                    <router-link to="/manage"><i class="el-icon-s-home"></i>首页</router-link>
                  </template>
                  <el-menu-item index="1-1">
                    <router-link to="/manage">系统信息</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2"><a href="javascript:;">统计流量</a></el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                  <router-link to="/manage/content"><i class="el-icon-document-copy"></i>内容管理</router-link>
                </el-menu-item>
                <el-submenu index="3">
                  <template slot="title"><i class="el-icon-chat-dot-square"></i>留言管理</template>
                  <el-menu-item index="3-1">投诉与建议</el-menu-item>
                  <el-menu-item index="3-2">招聘列表</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
                  <el-menu-item index="4-1">登录日志</el-menu-item>
                  <el-menu-item index="4-2">操作日志</el-menu-item>
                  <el-menu-item index="4-3">角色管理</el-menu-item>
                  <el-menu-item index="4-4">管理员管理</el-menu-item>
                  <el-menu-item index="4-5">SEO设置</el-menu-item>
                </el-submenu>
                <el-menu-item index="5"><a href="javascript:;"><i class="el-icon-tickets"></i>操作说明</a></el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="2" style="text-align: right;">
              <el-dropdown @command="logout">
                <span class="el-dropdown-link">
                  <i class="el-icon-s-custom" style="margin-right: 10px;"></i>{{form.username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="reset">修改密码</el-dropdown-item>
                  <el-dropdown-item command="out">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <router-view></router-view>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  //import axios from 'axios'
  export default {
    data() {
      return {
        //这是登录表单的数据绑定对象
        form: {
          username: "admin",
          password: '123456'
        },
        //这是表单的预验证规则对象
        rules: {
          username: [ //预验证用户名
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
          password: [ //预验证密码
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
        shOn: true
      }
    },
    methods: {
      //点击提交，预验证
      logIn() {
        this.$refs.formRef.validate(async value => { //表单预验证
          if (!value) {
            return;
          }
          //登陆验证          
          const {
            data: res
          } = await this.$http.post("http://127.0.0.1:2101/api/v1/login", this
            .form) //this.form要对应API文档约定命名（username、password）
          if (res.meta.status != 200) { //响应状态
            this.open4(res.meta.message);
          } else {
            this.open1(res.meta.message);
            window.sessionStorage.setItem("token", res.token);
            this.shOn = false; //显示后台管理系统
            //this.$router.push('/manage/Home')            
          }


        })
      },
      logout(command) { //登陆退出
        if (command == 'out') {
          sessionStorage.removeItem("token");
          this.$router.push('/manage/');
          this.shOn = true;
        }
      },
      register() {
        console.log("注册")
      },
      reset() { //表单重置
        this.$refs.formRef.resetFields();
      },
      open1(val) { //消息提示(成功)
        this.$notify({
          title: '成功',
          message: val,
          type: 'success',
        });
      },
      open4(val) { //消息提示(错误)
        this.$notify.error({
          title: '错误',
          message: val,
        });
      }
    },
    created() {
      // axios.interceptors.request.use(config => { //axios栏载器（发送请求前运行，用于配置请求头）
      //   config.headers.Authorization = window.sessionStorage.getItem("token") //挂载token
      //   return config //最后必需
      // })
    },
    mounted: function () {
      if (sessionStorage.token != undefined) { //判断token值，显示后台管理系统
        this.shOn = false;
      }
    }
  }

</script>
<style>
  .el-header {
    background-color: #545c64;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .man_content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  section.el-container {
    height: 100%;
  }

  ul.el-menu {
    height: 100%;
  }

  .logo {
    margin-top: 16px;
    float: left;
    margin-right: 30px;
    outline: none;
  }

  i {
    color: #fff;
    position: relative;
    top: -1px;
  }

  li.el-submenu.is-active i,
  li.el-submenu.is-active a {
    color: #409EFF;
  }

  a:hover {
    color: #409EFF;
  }

  .el-menu-item-group__title {
    font-size: 14px;
    color: #333;
  }

  .el-menu-item {
    color: #888;
  }

  .el-dropdown-link {
    display: block;
    color: #fff;
    padding-top: 20px;
    outline: none;
  }

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
    position: fixed;
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

  .el-button {
    min-width: 100px;
  }

  .el-submenu__title *,
  .el-menu-item * {
    color: #fff;
  }

  ul.el-menu-demo.el-menu--horizontal.el-menu {
    min-width: 1000px;
  }

</style>
