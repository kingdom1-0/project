<template>
    <!-- 数据修改模块 -->
    <el-dialog :title="alData.hasOwnProperty('add')?'添加':'编辑 '+alData.title" :visible="show" width="30%"
        :before-close="closeCompile" :fullscreen="true" :modal="false">
        <el-form :model="alData" :rules="rules" ref="alData" label-width="100px" class="demo-alData">
            <el-form-item label="所属楼层" prop="pId" v-show="typeof(alData.pId) != 'undefined'">
                <el-radio v-model="alData.pId" :label="fl.title | toNum" v-for="fl in floor" :key="fl.id">
                    {{fl.title}}
                </el-radio>
            </el-form-item>
            <el-form-item label="所属类别" prop="class" v-show="typeof(alData.class) != 'undefined'">
                <el-checkbox-group v-model="alData.class">
                    <el-checkbox :label="item.title" v-for="item in classDa" :key="item.id">
                        {{item.title}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="字母索引" prop="en" v-show="typeof(alData.en) != 'undefined'">
                <el-radio v-model="alData.en" :label="item" v-for="(item,n) in enDa" :key="n">{{item}}
                </el-radio>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="alData.title"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="text" v-show="typeof(alData.text) != 'undefined'">
                <el-input v-model="alData.text"></el-input>
            </el-form-item>
            <el-form-item label="店铺位置" prop="store" v-show="typeof(alData.store) != 'undefined'">
                <el-input v-model="alData.store"></el-input>
            </el-form-item>
            <el-form-item label="矩形热区" prop="area" v-show="typeof(alData.area) != 'undefined'">
                <el-input v-model="alData.area"></el-input>
            </el-form-item>
            <el-form-item label="内容" v-show="typeof(alData.value) != 'undefined'">
                <vue-neditor-wrap v-model="alData.value" :config="myConfig" :destroy="false"></vue-neditor-wrap>
            </el-form-item>
            <el-form-item label="主图" v-show="typeof(alData.img) != 'undefined'">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:2101/api/v1/file_upload"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="alData.img" :src="alData.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="配图" v-show="typeof(alData.images) != 'undefined'">
                <el-upload class="upload-demo" action="http://127.0.0.1:2101/api/v1/file_upload"
                    :on-success="imagesAvatarSuccess" :on-remove="handleRemove" :limit="6" accept=".jpg, .jpeg, .png"
                    :before-upload="beforeAvatarUpload" :file-list="fileList" list-type="picture-card">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否发布" prop="issue">
                <el-switch v-model="alData.issue"></el-switch>
            </el-form-item>
            <el-form-item label="是否置顶" prop="top">
                <el-switch v-model="alData.top"></el-switch>
            </el-form-item>
            <el-form-item label="数字排序" prop="sort">
                <el-input-number v-model="alData.sort" :min="1" :max="100" label="描述文字">
                </el-input-number>
            </el-form-item>
            <el-form-item label="发布时间" prop="date">
                <el-date-picker v-model="alData.date" type="datetime" placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                排序条件：置顶 》 数字排序（升序，0不参与排序） 》 发布时间（倒序）
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="closeCompile">取 消</el-button>
            <el-button type="primary" @click="submitForm('alData',alData.hasOwnProperty('add'))">确 定</el-button>
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
            show: { //显示控制
                type: Boolean
            },
            alData: { //传入数据
                type: Object
            }
        },
        data() {
            return {
                fileList: [], //多图缓存数据
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

        },
        filters: {
            toNum: function (val) { //字符串转单数字
                return val.match(/[0-9]/g)[0]
            }
        },
        methods: {
            handleClose(done) { //关闭数据修改页操作
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.closeCompile();
                        done();
                    })
                    .catch(_ => {
                        console.log(_)
                    });
            },
            closeCompile: function () { //关闭数据修改页
                this.$emit("close-compile", false);
                this.$emit("refresh") //刷新数据列表
            },
            submitForm(formName, add) { //提交表单                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.alData.class) {
                            this.alData.class = this.alData.class.toString(); //分类转字符串存储(多选按钮)
                        }
                        if (this.alData.images) { //多图合并URL成字符串存储
                            var images = "";
                            this.alData.images.forEach((item) => {
                                if (item.response) {
                                    images += "," + item.response.data;
                                } else {
                                    images += "," + item.url
                                }
                                images = images.slice(1);
                            })
                            this.alData.images = images;
                        }
                        if (typeof (this.alData.area) != 'undefined' && this.alData.area == null) {
                            this.alData.area = "0,0,0,0"; //矩形热区默认给值
                        }

                        if (!add) { //编辑提交
                            this.$http.put(this.$route.params.id, this.alData).then((res) => { //编辑数据提交
                                if (res.status == '200') {
                                    this.$message({ //修改成功提示
                                        message: '编辑成功',
                                        type: 'success'
                                    });
                                    this.closeCompile(); //关闭编辑页                                   
                                }
                            })
                        } else { //新增提交
                            delete this.alData.add;
                            this.$http.post(this.$route.params.id, this.alData).then((res) => { //新增数据提交
                                if (res.status == '200') {
                                    this.$message({ //修改成功提示
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.closeCompile(); //关闭编辑页
                                }
                            })
                        }

                    } else {
                        console.log('error submit!!'); //修改异常提示
                        return false;
                    }
                });
            },
            imagesAvatarSuccess(res, file, fileList) { //多图提交成功回调
                this.alData.images = fileList; //存储多图数据
                console.log(fileList)
            },
            handleAvatarSuccess(res) { //单图提交成功回调
                this.alData.img = res.data;
            },
            beforeAvatarUpload(file) { //图片限制函数
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleRemove(file, fileList) { //多图删除回调
                this.alData.images = fileList;
                console.log(fileList)
            }
        },
        watch: {
            alData: function () { //传值监控
                this.alData.issue = Boolean(this.alData.issue); //0 1  转换boolean值 
                this.alData.top = Boolean(this.alData.top);
                if (typeof (this.alData.class) == "string") { //多选按钮
                    this.alData.class = this.alData.class.split(",")
                }
                //多图字符串转数组       
                this.fileList = []; //清空多图缓存
                if (typeof (this.alData.images) == "string") {
                    var images = [];
                    if (this.alData.images.length > 0) {
                        var img = this.alData.images.split(",")
                        img.forEach((item, n) => {
                            images[n] = {
                                "url": item
                            };
                        })
                    }
                    this.fileList = images //多图组件附值
                    this.alData.images = images
                }
                if (typeof (this.alData.pId) != 'undefined') { //判断是否有楼层数据项
                    this.$http.get("floor").then((res) => { //楼层数据
                        this.floor = res.data;
                    })
                }
                if (typeof (this.alData.class) != 'undefined') { //判断是否有分类数据项
                    this.$http.get("sort").then((res) => { //分类数据
                        this.classDa = res.data;
                    })
                }
                console.log(this.alData);
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
