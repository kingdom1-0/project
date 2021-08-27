<template>
  <!-- 数据修改模块 -->
  <el-dialog
    :title="thData.hasOwnProperty('add')?'添加':'编辑 '+thData.title"
    :visible="show"
    width="60%"
    :before-close="closeCompile"    
    :modal="true"
  >
    <el-form
      ref="thData"
      :model="thData"
      :rules="rules"
      label-width="120px"
      class="demo-thData"
    >
      <el-form-item
        v-if="!(thData.pId === void 0)"
        label="所属楼层"
        prop="pId"
      >
        <el-radio
          v-for="fl in floor"
          :key="fl.id"
          v-model="thData.pId"
          :label="fl.title | toNum"
        >
          {{ fl.title }}
        </el-radio>
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
                dialogVisible: false, // 弹出框               
            }
        },
        watch: {
            alData: function () { // 传值监控
                this.thData = Object.assign(this.alData) // 浅拷贝
               
            }
        },
        created() {

        },
        methods: {
            handleClose(done) { // 关闭数据修改页操作
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.closeCompile()
                        done()
                    })
            },
            closeCompile: function () { // 关闭数据修改页
                this.$emit('close-compile', false)
                this.thData = {}
                this.$emit('refresh') // 刷新数据列表
            },
            submitForm(formName, add) { // 提交表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!add) { // 编辑提交
                            oplogInfo(this.thData.title, '编辑内容：')
                            this.$http.put(this.$route.params.id, this.thData).then((res) => { // 编辑数据提交
                                if (res.status == '200') {
                                    this.$message({ // 修改成功提示
                                        message: '编辑成功',
                                        type: 'success'
                                    })
                                    this
                                        .closeCompile() // 关闭编辑页
                                }
                            })
                        } else { // 新增提交
                            delete this.thData.add
                            this.$http.post(this.$route.params.id, this.thData).then((res) => { // 新增数据提交
                                if (res.status == '200') {
                                    this.$message({ // 修改成功提示
                                        message: '新增成功',
                                        type: 'success'
                                    })
                                    oplogInfo(this.thData.title, '新增内容：')
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
