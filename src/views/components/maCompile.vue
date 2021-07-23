<template>
    <!-- 数据修改模块 -->
    <el-dialog :title="thData.hasOwnProperty('add')?'添加':'编辑 '+thData.title" :visible="show" width="30%"
        :before-close="closeCompile" :fullscreen="true" :modal="false">
        <el-form :model="thData" :rules="rules" ref="thData" label-width="120px" class="demo-thData">
            <el-form-item label="所属楼层" prop="pId" v-if="typeof(thData.pId) != 'undefined'">
                <el-radio v-model="thData.pId" :label="fl.title | toNum" v-for="fl in floor" :key="fl.id">
                    {{fl.title}}
                </el-radio>
            </el-form-item>
            <el-form-item label="所属类别" prop="class" v-if="typeof(thData.class) != 'undefined'">
                <el-checkbox-group v-model="thData.class">
                    <el-checkbox :label="item.title" v-for="item in classDa" :key="item.id">
                        {{item.title}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="字母索引" prop="en" v-if="typeof(thData.en) != 'undefined'">
                <el-radio v-model="thData.en" :label="item" v-for="(item,n) in enDa" :key="n">{{item}}
                </el-radio>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="thData.title"></el-input>
            </el-form-item>
            <el-form-item label="英文标题" prop="enTitle" v-if="typeof(thData.enTitle) != 'undefined'">
                <el-input v-model="thData.enTitle"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="text" v-if="typeof(thData.text) != 'undefined'">
                <el-input v-model="thData.text"></el-input>
            </el-form-item>
            <el-form-item label="店铺位置" prop="store" v-if="typeof(thData.store) != 'undefined'">
                <el-input v-model="thData.store"></el-input>
            </el-form-item>
            <el-form-item label="矩形热区" prop="area" v-if="typeof(thData.area) != 'undefined'">
                <el-tooltip class="item" effect="dark" content="在图片里画矩形热区对应top,left,width,height，数据格式(0,0,0,0)"
                    placement="bottom-start">
                    <el-input v-model="thData.area"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="内容" v-if="typeof(thData.value) != 'undefined'">
                <vue-neditor-wrap v-model="thData.value" :config="myConfig" :destroy="false"></vue-neditor-wrap>
            </el-form-item>
            <el-form-item label="地图" v-if="typeof(thData.value2) != 'undefined'">
                <vue-neditor-wrap v-model="thData.value2" :config="myConfig" :destroy="true"></vue-neditor-wrap>
            </el-form-item>
            <el-form-item label="主图" v-if="typeof(thData.img) != 'undefined'">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:2101/api/v1/file_upload"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="thData.img" :src="thData.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">对应页面单图，只能上传jpg/png文件，且不超过500kb,</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="配图" v-if="typeof(thData.images) != 'undefined'">
                <el-upload class="upload-demo" action="http://127.0.0.1:2101/api/v1/file_upload"
                    :on-success="imagesAvatarSuccess" :on-remove="handleRemove" :limit="6" accept=".jpg, .jpeg, .png"
                    :before-upload="beforeAvatarUpload" :file-list="fileList" list-type="picture-card">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">对应页面多图，只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否发布" prop="issue">
                <el-tooltip class="item" effect="dark" content="发布则数据页面可见" placement="bottom">
                    <el-switch v-model="thData.issue"></el-switch>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="是否置顶" prop="top">
                <el-tooltip class="item" effect="dark" content="把数据顶到最先显示" placement="bottom">
                    <el-switch v-model="thData.top"></el-switch>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="数字排序" prop="sort">
                <el-tooltip class="item" effect="dark" content="数字超高，数据越显示于前" placement="bottom">
                    <el-input-number v-model="thData.sort" :min="1" :max="100" label="描述文字"></el-input-number>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="发布时间" prop="date">
                <el-tooltip class="item" effect="dark" content="时间越新，数据越显示于前" placement="bottom">
                    <el-date-picker v-model="thData.date" type="datetime" placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-tooltip>
            </el-form-item>
            <el-form-item>
                排序条件：置顶 》 数字排序（升序，0不参与排序） 》 发布时间（倒序）
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="closeCompile">取 消</el-button>
            <el-button type="primary" @click="submitForm('thData',thData.hasOwnProperty('add'))">确 定</el-button>
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
                thData: {}, //表单数据
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
                this.thData = {};
                this.$emit("refresh") //刷新数据列表
            },
            oplogInfo() {
                //this.$http.put('oplog',{username:})    
                console.log("kkk")
            },
            submitForm(formName, add) { //提交表单                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.thData.class) {
                            this.thData.class = this.thData.class.toString(); //分类转字符串存储(多选按钮)
                        }
                        if (this.thData.images) { //多图合并URL成字符串存储
                            var images = "";
                            this.thData.images.forEach((item) => {
                                if (item.response) {
                                    images += "," + item.response.data;
                                } else {
                                    images += "," + item.url
                                }
                            })
                            images = images.slice(1);
                            this.thData.images = images;
                        }
                        if (typeof (this.thData.area) != 'undefined' && this.thData.area == null) {
                            this.thData.area = "0,0,0,0"; //矩形热区默认给值
                        }

                        if (!add) { //编辑提交
                            //console.log(this.thData)
                            this.$http.put(this.$route.params.id, this.thData).then((res) => { //编辑数据提交
                                if (res.status == '200') {
                                    this.$message({ //修改成功提示
                                        message: '编辑成功',
                                        type: 'success'
                                    });
                                    this
                                        .closeCompile(); //关闭编辑页                                           
                                    this.oplogInfo();
                                }
                            })
                        } else { //新增提交
                            delete this.thData.add;
                            this.$http.post(this.$route.params.id, this.thData).then((res) => { //新增数据提交
                                if (res.status == '200') {
                                    this.$message({ //修改成功提示
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.closeCompile(); //关闭编辑页
                                    this.oplogInfo();
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
                this.thData.images = fileList; //存储多图数据
            },
            handleAvatarSuccess(res) { //单图提交成功回调
                this.thData.img = res.data;
            },
            beforeAvatarUpload(file) { //图片限制函数
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleRemove(file, fileList) { //多图删除回调
                this.thData.images = fileList;
            }
        },
        watch: {
            alData: function () { //传值监控
                this.thData = Object.assign(this.alData) //浅拷贝

                this.thData.issue = Boolean(this.thData.issue); //0 1  转换boolean值 
                this.thData.top = Boolean(this.thData.top);
                if (typeof (this.thData.class) == "string") { //多选按钮
                    this.thData.class = this.thData.class.split(",")
                }
                if (typeof (this.thData.value) != 'undefined' && this.thData.value == null) {
                    this.thData.value = '';
                }
                if (typeof (this.thData.value2) != 'undefined' && this.thData.value2 == null) {
                    this.thData.value2 = '';
                }
                //多图字符串转数组       
                this.fileList = []; //清空多图缓存
                if (typeof (this.thData.images) == "string") {
                    var images = [];
                    if (this.thData.images.length > 0) {
                        var img = this.thData.images.split(",")
                        img.forEach((item, n) => {
                            images[n] = {
                                "url": item
                            };
                        })
                    }
                    this.fileList = images //多图组件附值
                    this.thData.images = images
                }
                if (typeof (this.thData.pId) != 'undefined') { //判断是否有楼层数据项
                    this.$http.get("floor").then((res) => { //楼层数据
                        this.floor = res.data;
                    })
                }
                if (typeof (this.thData.class) != 'undefined') { //判断是否有分类数据项
                    this.$http.get("sort").then((res) => { //分类数据
                        this.classDa = res.data;
                    })
                }
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

    .el-form-item__content {
        padding-right: 40px;
    }

    .el-table .caret-wrapper {
        top: 10px;
    }

</style>
