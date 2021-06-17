<template>
    <!-- 数据修改模块 -->
    <el-dialog title="编辑" :visible="show" width="30%" :before-close="handleClose" :fullscreen="true" :modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属楼层" prop="pId" v-if="ruleForm.pId">
                <el-radio v-model="ruleForm.pId" :label="fl.title" v-for="fl in floor" :key="fl.id">{{fl.title}}
                </el-radio>
            </el-form-item>
            <el-form-item label="所属类别" prop="class" v-if="ruleForm.class">
                <el-checkbox-group v-model="ruleForm.class">
                    <el-checkbox :label="item.title" v-for="item in classDa" :key="item.id">
                        {{item.title}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="字母索引" prop="en" v-if="ruleForm.en">
                <el-radio v-model="ruleForm.en" :label="item" v-for="(item,n) in enDa" :key="n">{{item}}
                </el-radio>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="店铺位置" prop="store" v-if="ruleForm.store">
                <el-input v-model="ruleForm.store"></el-input>
            </el-form-item>

            <el-form-item label="内容" v-if="ruleForm.value">
                <vue-neditor-wrap v-model="ruleForm.value" :config="myConfig" :destroy="false"></vue-neditor-wrap>
            </el-form-item>
            <el-form-item label="图片" v-if="ruleForm.img">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:2101/api/v1/file_upload"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="多图" v-if="ruleForm.images">
                <el-upload class="upload-demo" action="http://127.0.0.1:2101/api/v1/file_upload"
                    :on-success="imagesAvatarSuccess" :on-remove="handleRemove" :limit="6" accept=".jpg, .jpeg, .png"
                    :before-upload="beforeAvatarUpload" :file-list="fileList" list-type="picture-card">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否发布" prop="issue">
                <el-switch v-model="ruleForm.issue"></el-switch>
            </el-form-item>
            <el-form-item label="是否置顶" prop="top">
                <el-switch v-model="ruleForm.top"></el-switch>
            </el-form-item>
            <el-form-item label="数字排序" prop="sort">
                <el-input-number v-model="ruleForm.sort" @change="handleChange" :min="1" :max="100" label="描述文字">
                </el-input-number>
            </el-form-item>
            <el-form-item label="发布时间" required prop="date">
                <el-date-picker v-model="ruleForm.date" type="datetime" placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
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
            show: { //
                type: Boolean
            },
            alData: { //传入数据
                type: Object
            }
        },
        data() {
            return {
                fileList: [], //多图
                classDa: [], //类别
                floor: [], //楼层
                enDa: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
                    "T", "U", "V", "W", "X", "Y", "Z"
                ], //首字母
                myConfig: { //编辑器配置
                    serverUrl: this.ueditorURL, //this.ueditorURL在main.js文件配置
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: "/neditor/",
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 关闭自动保存
                    enableAutoSave: false
                },
                dialogVisible: false, //弹出框
                ruleForm: {}, //修改表单模块
                rules: { //表单数据预验证
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
                    sort: [{
                            required: true,
                            message: '数字排序不能为空'
                        },
                        {
                            type: 'number',
                            message: '数字排序必须为数字值'
                        }
                    ],
                    date: [{
                        required: true,
                        message: '发布日期不能为空'
                    }]
                }
            }
        },
        created() {
            this.$http.get("floor").then((res) => { //楼层数据
                this.floor = res.data;
            })
            this.$http.get("sort").then((res) => { //分类数据
                this.classDa = res.data;
            })
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
                    .then(() => {
                        //console.log(_)
                        this.closeCompile();
                        done();
                    })
                    .catch(_ => {
                        console.log(_)
                    });
            },
            closeCompile: function () { //关闭数据修改页
                this.$emit("close-compile", false);
            },
            submitForm(formName) { //修改表单模块 (提交表单)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('submit!');
                        this.closeCompile();
                        if (this.ruleForm.class) {
                            this.ruleForm.class = this.ruleForm.class.toString(); //数组转字符串
                        }
                        if (this.ruleForm.images) {
                            var images = "";
                            this.fileList.forEach((item) => {
                                if (item.response) {
                                    images += "," + item.response.data;
                                } else {
                                    images += "," + item.url
                                }
                            })
                            this.ruleForm.images = images.slice(1);
                        }

                        console.log(this.ruleForm)
                        this.$http.put(this.$route.params.id, this.ruleForm).then((res) => { //编辑数据提交
                            if (res.status == '200') {
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleChange(value) {
                console.log(value);
            },
            imagesAvatarSuccess(res, file, fileList) { //传多图
                this.fileList = fileList;
                console.log(this.fileList)
            },
            handleAvatarSuccess(res) {
                this.ruleForm.img = res.data;
                console.log(res.data)
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleRemove(file, fileList) { //删除图片
                console.log(fileList)
            }
        },
        watch: {
            alData: function () {
                this.alData.issue = Boolean(this.alData.issue); //0 1  转换boolean值 
                this.alData.top = Boolean(this.alData.top);
                if (typeof (this.alData.class) == "string") { //多选按钮
                    this.alData.class = this.alData.class.split(",")
                }
                if (typeof (this.alData.images) == "string") { //多图转换数据
                    var img = this.alData.images.split(",")
                    var images = [];
                    img.forEach((item, n) => {
                        images[n] = {
                            "url": item
                        };
                    })

                    this.fileList = images
                    console.log(this.fileList)
                }
                this.ruleForm = this.alData;
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
        width: auto;
        height: 178px;
        display: block;
    }

    .el-checkbox-group {
        padding-top: 10px;
    }

</style>
