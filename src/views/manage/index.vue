<template>
    <div class="man_content">
        <el-container>
            <el-header>
                <el-row :gutter="20">                   
                    <el-col :span="16">
                        <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#66b1ff">
                            <img class="logo" src="http://gspark.cnweb.cn/images/miclogo.png"/>
                            <el-submenu index="1">                                    
                                    <template slot="title"><i class="el-icon-s-home" style="opacity:0.9"></i>首页</template>
                                    <el-menu-item index="1-1"><i class="el-icon-info"></i>系统信息</el-menu-item>
                                    <el-menu-item index="1-2"><i class="el-icon-s-marketing"></i>统计流量</el-menu-item>
                            </el-submenu>
                            <el-menu-item index="2"><a href="javascript:;"><i class="el-icon-document-copy"></i>内容管理</a></el-menu-item>                            
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
                    <el-col :span="8" style="text-align: right;">                             
                          <el-dropdown>
                            <span class="el-dropdown-link">
                              <i class="el-icon-s-custom" style="margin-right: 10px;"></i>admin
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>修改密码</el-dropdown-item>
                              <el-dropdown-item>退出</el-dropdown-item> 
                            </el-dropdown-menu>
                          </el-dropdown>                     
                    </el-col>
                  </el-row>
                
              </el-header> 
            <el-container>                      
              <el-main>
                    <router-view name="manage"></router-view>
              </el-main>
            </el-container>
          </el-container>
    </div>
</template>
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
    .logo {margin-top:16px;float: left;margin-right: 30px;outline: none;}
    i {color:#fff;position: relative;top:-1px;}
    li.el-submenu.is-active i {color:#66b1ff;}
    .el-menu-item-group__title {
        font-size: 14px;
        color: #333;
    }

    .el-menu-item {
        color: #888;
    }
    .el-dropdown-link {display: block;color:#fff;padding-top:20px;outline: none;}
  </style>
  
<script>
    //引入elementUi
    import Vue from 'vue';
    import ElementUI  from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    Vue.use(ElementUI)
    export default{
        data() {
        const item = {
          date: '2016-05-02',
          name: 'admin',
          address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
          tableData: Array(20).fill(item)
        }
      }
    }
</script>