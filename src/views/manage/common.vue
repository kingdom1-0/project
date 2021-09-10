<template>      
  <div class="man_content">
    <div class="man_body">
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="22">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#409EFF"
                router
              >
                <img
                  class="logo"
                  src="/images/logo.png"
                >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="iconfont icon-xiantiao-shouye" />后台首页
                  </template>
                  <el-menu-item index="/manage/common/">
                    系统信息
                  </el-menu-item>
                  <el-menu-item>
                    <a
                      href="https://uweb.umeng.com/v1/login.php?siteid=1279263413"
                      target="_block"
                      class="el_a"
                    >统计流量</a>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="/manage/common/content/banner">
                  <i class="el-icon-document-copy" />内容管理
                </el-menu-item>
                <el-menu-item index="/manage/common/message/">
                  <i class="el-icon-chat-dot-square" />留言管理
                </el-menu-item>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-setting" />系统设置
                  </template>
                  <el-menu-item index="/manage/common/logInfo">
                    登陆日志
                  </el-menu-item>
                  <el-menu-item index="/manage/common/opLog">
                    操作日志
                  </el-menu-item>
                  <el-menu-item index="/manage/common/role">
                    角色管理
                  </el-menu-item>
                  <!-- <el-menu-item index="">
                    管理员管理
                  </el-menu-item>
                  <el-menu-item index="">
                    SEO设置
                  </el-menu-item> -->
                </el-submenu>
                <el-menu-item index="/manage/common/explain">
                  <i class="iconfont icon-shuoming" />操作说明
                </el-menu-item>
                <el-menu-item>
                  <a
                    href="https://github.com/kingdom1-0/project"
                    target="_block"
                  ><i
                    class="iconfont icon-wailian"
                  />外链</a>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col
              :span="2"
              style="text-align: right;"
            >
              <el-dropdown @command="logOut">
                <span class="el-dropdown-link">
                  <i
                    class="el-icon-s-custom"
                    style="margin-right: 10px;"
                  />{{ username }}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="reset">
                    修改密码
                  </el-dropdown-item>
                  <el-dropdown-item
                    command="out"
                    @click="logOut"
                  >
                    退出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <transition name="fad">
            <router-view />
          </transition>            
        </el-container>
      </el-container>      
    </div>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="resetPassword"
      center
      width="600px"
    >
      <el-form
        ref="setRef"
        :model="setForm"
        :rules="setRules"
      >
        <el-row>
          <el-col :span="4">
            <div class="user_te">
              用户名：
            </div>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="username">
              <el-input
                v-model="setForm.username"
                prefix-icon="el-icon-user"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="user_te">
              原密码：
            </div>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="password">
              <el-input
                v-model="setForm.password"
                type="password"
                prefix-icon="el-icon-lock"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="user_te">
              新密码：
            </div>
          </el-col>
          <el-col :span="20">
            <el-form-item prop="setPassword">
              <el-input
                v-model="setForm.setPassword"
                prefix-icon="el-icon-lock"
                @keyup.enter.native="resPass()"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="resetPassword = false">取 消</el-button>
        <el-button
          type="primary"
          @click="resPass()"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码 -->
  </div>  
</template>

<script>
  export default {
    data(){
      return {
        username:sessionStorage.getItem('username'),//用户名
        resetPassword:false,
        setForm: {
          username: 'admin',
          password: '',
          setPassword: ''
        },
        setRules: {
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
          ],
          setPassword: [ // 预验证新密码
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
        resPass() {
        this.$refs.setRef.validate(async value => { // 表单预验证
          if (!value) {
            return
          }
          // 登陆验证
          const {
            data: res
          } = await this.$http.put('login', this.setForm)
          if (res.meta.status != 200) { // 响应状态
            this.$message.error(res.meta.message)
          } else {
            this.$message.success(res.meta.message)
            sessionStorage.removeItem('token');
            this.resetPassword = false
            this.$refs.setRef.resetFields();
          }
        })
      },
      logOut(val){
        if(val == 'reset'){
          this.resetPassword = true
        }else{
          sessionStorage.clear()
          this.$router.push('/manage/login')      
        }          
      }
    }  
  }

</script>
<style scoped>
  .man_body {height:100%;}
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
 
  ul.el-menu-demo.el-menu--horizontal.el-menu {
    min-width: 1000px;
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

  .el_a {
    color: #fff;
  }

  .el-submenu.is-active .el-submenu__title span.title {
    color: #409EFF;
  }

  .el-menu {
    transform: all 0.3s ease;
  }

  .el-header a {
    padding: 20px 0;
  }

  i.iconfont {
    margin-right: 6px;
  }  
  
</style>
