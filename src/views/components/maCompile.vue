<template>
    <!-- 数据修改模块 -->
    <el-dialog title="编辑" :visible.sync="show" width="30%" :before-close="handleClose" :fullscreen="true"
        :modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <vue-neditor-wrap v-model="msg" :config="myConfig" :destroy="false"></vue-neditor-wrap>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload class="upload-demo" action="http://127.0.0.1:2101/api/v1/file_upload"
                    :on-success="handleAvatarSuccess" :on-remove="handleRemove" list-type="picture-card" :limit="3"
                    accept=".jpg, .jpeg, .png" :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否发布" prop="issueRe">
                <el-switch v-model="ruleForm.issueRe"></el-switch>
            </el-form-item>
            <el-form-item label="是否置顶" prop="topRe">
                <el-switch v-model="ruleForm.topRe"></el-switch>
            </el-form-item>
            <el-form-item label="数字排序" prop="num">
                <el-input-number v-model="ruleForm.num" @change="handleChange" :min="1" :max="100" label="描述文字">
                </el-input-number>
            </el-form-item>
            <el-form-item label="发布时间" required>
                <el-col :span="6">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="6">
                    <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;">
                        </el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                排序条件：置顶 》 数字排序（升序，0不参与排序） 》 发布时间（倒序）
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="closeCompile">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import VueNeditorWrap from 'vue-neditor-wrap'
    export default {
        components: {
            VueNeditorWrap
        },
        props: {
            show: {
                type: Boolean
            }
        },
        data() {
            return {
                msg: '',
                myConfig: {
                    serverUrl: this.ueditorURL, //this.ueditorURL在main.js文件配置
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: "/neditor/",
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 关闭自动保存
                    enableAutoSave: false
                },
                imageUrl: '',
                multipleSelection: [],
                currentPage4: 4,
                dialogVisible: false, //弹出框
                ruleForm: { //修改表单模块
                    name: '',
                    date1: '',
                    date2: '',
                    issueRe: true,
                    topRe: false,
                    num: 0,
                    images: []
                },
                rules: {
                    name: [{
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 500,
                            message: '长度在 1 到 500 个字符',
                            trigger: 'blur'
                        }
                    ],
                    date1: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    date2: [{
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    num: [{
                            required: true,
                            message: '数字排序不能为空'
                        },
                        {
                            type: 'number',
                            message: '数字排序必须为数字值'
                        }
                    ],
                }
            }
        },
        created() {
            // this.$http.get("http://127.0.0.1:2101/api/v1/ueditor").then(function (res) {
            //     console.log(res.data)
            // })
        },
        methods: {
            toggleSelection(rows) { //表格
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        console.log(_)
                        this.closeCompile();
                        done();
                    })
                    .catch(_ => {
                        console.log(_)
                    });
            },
            closeCompile: function () {
                this.$emit("close-compile", false);
            },
            submitForm(formName) { //修改表单模块 (提交表单)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.closeCompile();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleChange(value) {
                console.log(value);
            },
            handleAvatarSuccess(res) {
                this.ruleForm.images.push(res.filename);
                console.log(this.ruleForm.images)
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleRemove(file) { //删除图片
                var _thisImg = this.ruleForm.images
                _thisImg.forEach(function (item, n) {
                    if (item.indexOf(file.name) > 0) {
                        _thisImg.splice(n, 1)
                    }
                })
                console.log(this.ruleForm.images)
            }
        }
    }

</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
