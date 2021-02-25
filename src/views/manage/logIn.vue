<template>
        <div class="log_content">
                <div class="log_bg">
                    <iframe src="http://demo.cnvi.com.cn/webDemo/demo1/demoA3/index.html"></iframe>
                </div>
                <div class="log_conBlock">
                  <div class="log_logo"><img src="../../images/logo.png"/></div>
                  <el-form ref="formRef" :model="form" :rules="rules">
                    <!-- 用户名 -->
                    <el-form-item prop="user">
                      <el-input prefix-icon="iconfont icon-user" v-model="form.user"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="pass">
                      <el-input type="password" prefix-icon="iconfont icon-mima"  v-model="form.pass"></el-input>
                    </el-form-item>
                    <!-- 按钮区域 -->
                    <el-form-item class="bu_block">
                      <el-button type="primary" @click="logIn">登 录</el-button>
                      <el-button type="info" @click="resetForm">重 置</el-button>
                    </el-form-item>
                  </el-form>
                </div>
        </div>
</template>
<style lang="less">
    .log_content {position: fixed;top:0px;left:0px;width:100%;height:100%;}
.log_bg {position: fixed;top:0px;left:0px;width:100%;height:100%;}
.log_bg iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1920px;
    margin-left: -960px;
    margin-top:-960px;
    border:0px;
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
.log_logo img {display: block;margin:auto;}
.bu_block {text-align: center;}
.el-button {min-width:100px;}
</style>
<script>
    //引入elementUi
    import Vue from 'vue';
    import ElementUI  from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    Vue.use(ElementUI)

    export default {
      data() {
        return {
          //这是登录表单的数据绑定对象
          form: {
            user: 'zs',
            pass: '123'     
          },
          //这是表单的验证规则对象
          rules:{            
            user:[  //验证用户名
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            pass:[  //验证密码
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        //点击重置按钮，重置登陆表单
        resetForm(){
          //console.log(this)
          this.$refs.formRef.resetFields();
        },
        //点击提交，预验证
        logIn(){
          this.$refs.formRef.validate(async value => {
             if(!value){
               return;
             }
             //登陆验证
             const {data:res} = await this.$http.post("http://127.0.0.1:8888/api/private/v1/users",this.form);
             if(res.meta.status !== 200) return console.log("登陆失败")
             console.log("登陆成功");
          })
        }
      }
    }
  </script>