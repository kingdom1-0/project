<template>
        <div class="log_content">
                <div class="log_bg">
                    <iframe src="http://demo.cnvi.com.cn/webDemo/demo1/demoA3/index.html"></iframe>
                </div>
                <div class="log_conBlock">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="name">
                          <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>

                    </el-form>
                </div>
        </div>
</template>
<style>
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
    margin-left: -300px;
    margin-top: -130px;
}

label.el-form-item__label {
    color: #fff;
}
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
          ruleForm:{
            name: '',
          },
          rules:{
            name: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
            ],
          }
        }
      },
      methods: {
        
      }
    }
  </script>