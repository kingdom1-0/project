<template>
    <!-- 数据修改模块 -->
    <el-dialog :title="'查看 '+alData.name" :visible="show" width="30%" :before-close="closeCompile" :fullscreen="true"
        :modal="false">
        <el-form :model="alData" label-width="200px" ref="alData" class="demo-alData" id="table-content">
            <el-form-item label="姓名:" prop="name">
                {{alData.name}}
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
                {{alData.phone}}
            </el-form-item>
            <el-form-item label="邮箱:" prop="Email">
                {{alData.Email}}
            </el-form-item>
            <el-form-item label="内容:" prop="text">
                {{alData.text}}
            </el-form-item>
            <el-form-item label="提交时间:" prop="date">
                {{alData.date}}
            </el-form-item>
            <el-form-item label="审核状态" prop="state">
                <el-radio v-model="alData.state" :label="fl" v-for="fl in stateDa" :key="fl.id">
                    {{fl}}
                </el-radio>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="closeCompile">取 消</el-button>
            <el-button type="primary" @click="printContent()">打 印</el-button>
            <el-button type="primary" @click="submitForm('alData')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            show: { // 显示控制
                type: Boolean
            },
            alData: { // 传入数据
                type: Object
            }
        },
        data() {
            return {
                stateDa: ['未阅', '已阅，通过', '已阅，未通过']
            }
        },
        created() {

        },
        filters: {
            toNum: function (val) { // 字符串转单数字
                return val.match(/[0-9]/g)[0]
            }
        },
        methods: {
            handleClose(done) { // 关闭数据修改页操作
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.closeCompile()
                        done()
                    })
                    .catch(_ => {
                        console.log(_)
                    })
            },
            closeCompile: function () { // 关闭数据修改页
                this.$emit('close-compile', false)
                this.$emit('refresh') // 刷新数据列表
            },
            submitForm(formName) { // 提交表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.put(this.$route.params.id, this.alData).then((res) => { // 编辑数据提交
                            if (res.status == '200') {
                                this.$message({ // 修改成功提示
                                    message: '审核完成',
                                    type: 'success'
                                })
                                this.closeCompile() // 关闭编辑页
                            }
                        })
                    } else {
                        console.log('error submit!!') // 修改异常提示
                        return false
                    }
                })
            },
            printContent() {
                // 这里就是打印的地方，用id包起来
                var print = document.getElementById('table-content')
                var newContent = print.innerHTML
                var oldContent = document.body.innerHTML
                // console.log(document.body.innerHTML);
                document.body.innerHTML = newContent
                document.getElementsByTagName('body')[0].style.zoom = 1.5
                document.getElementsByTagName('body')[0].style.paddingTop = '80px'
                window.print()
                window.location.reload()
                // 将原有页面还原到页面
                document.body.innerHTML = oldContent
                return false
            }
        }
    }

</script>
<style scoped>
    .el-form-item__label {
        padding-right: 40px;
    }

    @page {
        /*去掉表头打印*/
        size: auto;
        margin: 0mm;
    }

</style>
