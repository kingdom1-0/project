<template>
    <el-container class="man_content">
        <!-- 数据列表 -->
        <el-main v-loading="loading">
            <el-row></el-row>
            <el-row>
                <div class="button_ul">
                    <el-tooltip class="item" effect="dark" content="删除的数据无法找回，如不明确删除，建议待发布" placement="bottom">
                        <el-button type="danger" @click="openDelete()"><span class="iconfont icon-shanchu"></span>批量删除
                        </el-button>
                    </el-tooltip>
                </div>
                <div class="seek_block">
                    <el-input v-model="seek" class="seek_input" @change="seekFun()"></el-input>
                    <el-button type="success" @click="seekFun()"><span class="iconfont icon-chaxun"></span>查询
                    </el-button>
                </div>
                <div class="clear"></div>
            </el-row>
            <el-row></el-row>
            <el-row>
                <el-table ref="multipleTable" :data="thisTable[thisPa-1]" tooltip-effect="dark" :border="true"
                    :highlight-current-row="true" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="username" label="用户名" align="center" width="300" sortable :filters="nameDa"
                        :filter-method="nameFilter">
                    </el-table-column>
                    <el-table-column prop="text" label="操作信息">
                    </el-table-column>
                    <el-table-column prop="date" label="操作时间" align="center" sortable>
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                </el-table>
                <el-row></el-row>
                <el-row></el-row>
                <el-row>
                    <!-- 分页 -->
                    <el-pagination background layout="prev, pager, next" v-if="tableData.length > 10"
                        :total="tableData.length" align="center" @current-change="pageFilter" :current-page="thisPa">
                    </el-pagination>
                </el-row>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        props: ['id', 'arg'], // router props传参(取参)
        data() {
            return {
                axiosTable: 'oplog', // 操作的数据库表名
                nameDa: [{
                    text: 'admin',
                    value: 'admin'
                }, {
                    text: 'kingdom',
                    value: 'kingdom'
                }],
                seek: '', // 搜索框值
                thisPa: 1, // 当前页
                loading: false, // 加载中
                input: '', // 标题搜索
                tableData: [{}], // 列表的数据
                thisTable: [], // 分页列表的数据
                valTable: [], // 当前显示列表的数据
                selectData: [], // 多选选中的数据
                dialogVisible: false, // 编辑页开关
                alData: {} // 传入编辑页数据
            }
        },
        created() {
            this.refreshData() // get对应id参数数据
        },
        methods: {
            selectHint() { // 最少勾选一条数据
                if (this.selectData.length < 1) {
                    this.$message({
                        message: '请勾选数据！',
                        type: 'error'
                    })
                    return false
                } else {
                    return true
                }
            },
            handleSelectionChange(val) { // 表单change事件
                this.selectData = val
            },
            seekFun() { // 搜索
                var _this = this

                function seekInto() {
                    if (_this.seek.length > 0) {
                        var da = _this.tableData.filter((item) => {
                            return item.text.includes(_this.seek)
                        })
                        _this.tableData = da
                    }
                }
                this.refreshData(seekInto) // 刷新搜索数据
            },
            nameFilter(value, row) { // 置顶筛选
                console.log(row.name == value)
                return row.name == value
            },
            pageFilter(val) { // 分页操作
                this.thisPa = val
            },
            thisTableFun() { // 列表数据分页拆分
                this.thisTable = []
                for (var i = 0; i < Math.ceil(this.tableData.length / 10); i++) {
                    this.thisTable.push(this.tableData.slice(10 * i, 10 * i + 10))
                }
                console.log(this.thisTable)
            },
            refreshData: function (seekInto) { // 刷新列表数据
                var _this = this
                this.$http.get(_this.axiosTable).then(function (res) { // 字符串转换布尔值
                    console.log(res.data)
                    _this.tableData = res.data
                    if (seekInto) { // 搜索刷新
                        seekInto()
                    }
                    _this.tableData.sort() // 响应式数据
                    _this.thisTableFun() // 列表数据分页拆分
                    _this.thisPa = 1 // 返回第一分页
                })
            },
            openDelete() { // 提示删除
                if (this.selectHint()) {
                    this.$confirm('删除的数据无法找回，是否删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.deleteDa()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }
            },
            deleteDa() { // 批量删除
                this.selectData.forEach((item) => {
                    this.$http.delete(this.axiosTable, {
                        params: {
                            id: item.id // 对应ID删除
                        }
                    }).then((res) => {
                        if (res.status == '200') {
                            this.refreshData() // 刷新数据列表
                        }
                    })
                })
            }
        }
    }

</script>
<style scoped>
    .el-row {
        min-height: 20px;
    }

    .iconfont {
        margin-right: 6px;
    }

    .seek_input {
        width: 165px;
    }

    .button_ul {
        float: left;
        margin-right: 30px;
        margin-bottom: 20px;
    }

    .seek_block {
        float: left;
    }

    .el-table .caret-wrapper {
        top: 8px;
    }

</style>
