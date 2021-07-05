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
            <el-input type="password" @keyup.enter.native="logIn" prefix-icon="el-icon-lock" v-model="form.password">
            </el-input>
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
                active-text-color="#409EFF" router>
                <img class="logo" src="../../images/logo.png" />
                <el-submenu index="/manage/">
                  <template slot="title"><i class="el-icon-chat-dot-square"></i>首页</template>
                  <el-menu-item index="/manage/">系统信息</el-menu-item>
                  <el-menu-item disabled>统计流量</el-menu-item>
                </el-submenu>
                <el-menu-item index="/manage/content/banner">
                  <i class="el-icon-document-copy"></i>内容管理
                </el-menu-item>
                <el-menu-item index="/manage/message/message">
                  <i class="el-icon-chat-dot-square"></i>留言管理
                </el-menu-item>
                <el-submenu index="/manage/message/">
                  <template slot="title"><i class="el-icon-chat-dot-square"></i>系统设置</template>
                  <el-menu-item index="/manage/message/">登陆日志</el-menu-item>
                  <el-menu-item index="/manage/message/">操作日志</el-menu-item>
                  <el-menu-item index="/manage/message/">角色管理</el-menu-item>
                  <el-menu-item index="/manage/message/">管理员管理</el-menu-item>
                  <el-menu-item index="/manage/message/">SEO设置</el-menu-item>
                </el-submenu>
                <el-menu-item index="/manage/message/">
                  <i class="el-icon-chat-dot-square"></i>操作说明
                </el-menu-item>
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
    <el-dialog title="修改密码" :visible.sync="resetPassword" center width="600px">
      <el-form ref="setRef" :model="setForm" :rules="setRules">
        <el-row>
          <el-col :span="4">
            <div class="user_te">用户名：</div>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="username">
              <el-input prefix-icon="el-icon-user" v-model="setForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="user_te">原密码：</div>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="password">
              <el-input type="password" prefix-icon="el-icon-lock" v-model="setForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="user_te">新密码：</div>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="setPassword">
              <el-input prefix-icon="el-icon-lock" v-model="setForm.setPassword" @keyup.enter.native="resPass()">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPassword = false">取 消</el-button>
        <el-button type="primary" @click="resPass()">确 定</el-button>
      </span>
    </el-dialog>

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
          password: '',
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
        setForm: {
          username: "admin",
          password: '',
          setPassword: ''
        },
        setRules: {
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
          ],
          setPassword: [ //预验证新密码
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
        shOn: true,
        resetPassword: false //重置密码
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
          } = await this.$http.post("login", this.form)
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
      consolelog() {
        alert(2)
      },
      resPass() {
        this.$refs.setRef.validate(async value => { //表单预验证
          if (!value) {
            return;
          }
          //登陆验证          
          const {
            data: res
          } = await this.$http.put("login", this.setForm)
          if (res.meta.status != 200) { //响应状态
            this.open4(res.meta.message);
          } else {
            this.open1(res.meta.message);
            sessionStorage.removeItem("token");
            this.$router.push('/manage/');
            this.shOn = true;
            this.resetPassword = false;
          }
        })
      },
      logout(command) { //登陆退出
        if (command == 'out') {
          sessionStorage.removeItem("token");
          this.$router.push('/manage/');
          this.shOn = true;
        }
        if (command == 'reset') { //修改密码
          this.resetPassword = true;
          this.setForm.password = "";
          this.setForm.setPassword = "";
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

  ul.el-menu-demo.el-menu--horizontal.el-menu {
    min-width: 1000px;
  }

  .el-submenu__title i,
  .el-menu-item i {
    color: #fff;
  }

  .user_te {
    line-height: 40px;
    text-align: right;
    padding-right: 20px;
  }

  .ind_content {
    min-height: auto;
    overflow: visible;
  }

</style>
