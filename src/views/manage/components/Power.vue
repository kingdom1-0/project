<template>
  <!-- 数据修改模块 -->
  <el-dialog
    :title="thData.hasOwnProperty('add')?'添加':'编辑 '+thData.username"
    :visible="show"
    width="60%"
    :before-close="closeCompile"    
    :modal="true"
  >
    <el-form
      ref="thData"
      :model="thData"
      label-width="120px"
      class="demo-thData"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="thData.username" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="thData.password" />
      </el-form-item>
      <el-form-item
        label="权限描述"
        prop="text"
      >
        <el-input v-model="thData.text" />
      </el-form-item>
      <el-form-item
        label="菜单权限设置"
        prop="menu"
      >
        <el-tree
          ref="tree"
          :data="menu"
          show-checkbox
          :default-checked-keys="thData.menu"
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps"
        />
      </el-form-item>
      <el-form-item
        label="内容权限设置"
        prop="content"
      >
        <el-tree
          ref="tree2"
          :data="content"
          show-checkbox
          :default-checked-keys="thData.content"
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps"
        />
      </el-form-item>
    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeCompile">取 消</el-button>
      <el-button
        type="primary"
        @click="submitForm('thData',thData.hasOwnProperty('add'))"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
    import {
        thisDate, //当前时间
        oplogInfo // 记录操作日志
    } from '../js/common.js' // 调用公共js
    export default {       
        filters: {
            toNum: function (val) { // 字符串转单数字
                return val.match(/[0-9]/g)[0]
            }
        },
        props: {
            show: { // 显示控制
                type: Boolean
            },
            alData: { // 传入数据
                type: Object,
                default: function () {
                  return {}
                }
            }
        },
        data() {
            return {
                thData: {}, // 表单数据     
                tableName: 'roles', // 数据库表名    
                dialogVisible: false, // 弹出框 
                menu: [{//菜单权限设置
                  id: 1,
                  label: '后台首页',
                  children: [{
                    id: 11,
                    label: '系统信息',                    
                  },{
                    id: 12,
                    label: '统计流量',                    
                  }]
                }, {
                  id: 2,
                  label: '内容管理'                 
                }, {
                  id: 3,
                  label: '留言管理'                  
                },{
                  id: 4,
                  label: '系统设置',
                  children: [{
                    id: 41,
                    label: '登陆日志',                    
                  },{
                    id: 42,
                    label: '操作日志',                    
                  },{
                    id: 43,
                    label: '角色管理',                    
                  },{
                    id: 44,
                    label: '管理员管理',                    
                  },{
                    id: 45,
                    label: 'SEO设置',                    
                  }]
                }, {
                  id: 5,
                  label: '操作说明'                 
                }, {
                  id: 6,
                  label: '外链'                 
                }],
                content: [{//内容权限设置
                  id: 1,
                  label: '操作权限',
                  children: [{
                    id: 11,
                    label: '添加/编辑权限',                    
                  },{
                    id: 12,
                    label: '删除权限',                    
                  },{
                    id: 13,
                    label: '发布权限',                    
                  }]
                },{
                  id: 2,
                  label: '首页(banner)'
                },{
                  id: 3,
                  label: '品牌指引',
                  children: [{
                    id: 31,
                    label: '楼层管理',                    
                  },{
                    id: 32,
                    label: '类别管理',                    
                  },{
                    id: 33,
                    label: '品牌管理',                    
                  }]
                },{
                  id: 4,
                  label: '活动精选'
                },{
                  id: 5,
                  label: '会员天地',
                  children: [{
                    id: 51,
                    label: '会员活动',                    
                  },{
                    id: 52,
                    label: '加入会员',                    
                  },{
                    id: 53,
                    label: '会员须知',                    
                  },{
                    id: 54,
                    label: '积分兑换',                    
                  }]
                },{
                  id: 6,
                  label: '关于我们',
                  children: [{
                    id: 61,
                    label: '项目简介',                    
                  },{
                    id: 62,
                    label: '交通指南',                    
                  },{
                    id: 63,
                    label: '招商租赁',                    
                  },{
                    id: 64,
                    label: '场地合作',                    
                  },{
                    id: 65,
                    label: '联系我们',                    
                  }]
                }],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                }              
            }
        },
        watch: {
            alData: function () { // 传值监控
                this.thData = Object.assign(this.alData) // 浅拷贝     
                this.menuContenttoArray();
            }
        },
        created() {
         
        },
        methods: {
            menuContenttoArray(){ //权限数据String 转 Array
                if(typeof this.thData.menu === 'string'){
                  this.thData.menu = this.alData.menu.split(",")
                }else{
                  this.thData.menu = [];
                }
                if(typeof this.thData.content === 'string'){
                  this.thData.content = this.alData.content.split(",")
                } else{
                  this.thData.content = [];
                }
            },
            handleClose(done) { // 关闭数据修改页操作
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.closeCompile()
                        done()
                    })
            },
            closeCompile: function () { // 关闭数据修改页
                this.$emit('close-compile', false)
                this.thData = {};
                this.$refs.tree.setCheckedKeys([]); //清空树形控件
                this.$refs.tree2.setCheckedKeys([]);//清空树形控件
                this.$emit('refresh') // 刷新数据列表
            },
            addValue:function(){
              this.thData.date = thisDate();
              this.thData.menu = this.$refs.tree.getCheckedKeys().toString();
              this.thData.content = this.$refs.tree2.getCheckedKeys().toString();              
            },
            submitForm(formName, add) { // 提交表单
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!add) { // 编辑提交  
                            this.addValue();            
                            this.$http.put(this.tableName, this.thData).then((res) => { // 编辑数据提交
                                if (res.status == '200') {       
                                    this.$message({ // 修改成功提示
                                        message: '编辑成功',
                                        type: 'success'
                                    })
                                    oplogInfo(this.thData.username, '编辑角色权限：')
                                    this.closeCompile() // 关闭编辑页
                                }
                            })   
                            _this.menuContenttoArray();//处理数据转换报错                
                        } else { // 新增提交                            
                            delete this.thData.add
                            this.addValue();
                            this.$http.post(this.tableName, this.thData).then((res) => { // 新增数据提交
                                if (res.status == '200') {
                                    this.$message({ // 修改成功提示
                                        message: '新增成功',
                                        type: 'success'
                                    })
                                    oplogInfo(this.thData.username, '新增角色：')
                                    this.closeCompile() // 关闭编辑页
                                }
                            })
                        }
                    } else {
                        //console.log('error submit!!') // 修改异常提示
                        return false
                    }
                })
            }  
        }
    }

</script>
<style scoped>
   

</style>
