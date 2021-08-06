<template>
  <el-container class="man_content">
    <!-- 数据列表 -->
    <el-main v-loading="loading">
      <el-row></el-row>
      <el-row>
        <el-tooltip class="item" effect="dark" content="删除的数据无法找回，如不明确删除，建议待发布" placement="bottom">
          <el-button type="danger" @click="openDelete()"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导出Excel表格" placement="bottom">
          <el-button type="primary" @click="exportExcel"><span class="iconfont icon-fabu"></span>导出</el-button>
        </el-tooltip>
      </el-row>
      <el-row></el-row>
      <el-row></el-row>
      <el-row>
        <el-table ref="multipleTable" :data="thisTable[thisPa-1]" tooltip-effect="dark" :border="true" id="out-table"
          :highlight-current-row="true" style="width: 100%" @selection-change="handleSelectionChange"
          @row-dblclick="redact">
          <el-table-column type="selection" width="100" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" show-overflow-tooltip align="left" sortable>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" sortable>
          </el-table-column>
          <el-table-column prop="Email" label="邮箱" align="center" sortable>
          </el-table-column>
          <el-table-column prop="text" label="内容" align="center" sortable>
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center" sortable
            :filters="[{text: '未阅', value: '未阅'}, {text: '已阅，通过', value: '已阅，通过'}, {text: '已阅，未通过', value: '已阅，未通过'}]"
            :filter-method="issueFilter">
          </el-table-column>
          <el-table-column prop="date" label="提交时间" align="center" sortable>
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        </el-table>
        <el-row></el-row>
        <el-row></el-row>
        <el-row>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" v-if="tableData.length > 10" :total="tableData.length"
            align="center" @current-change="pageFilter" :current-page="thisPa"></el-pagination>
        </el-row>
      </el-row>
    </el-main>
    <ma-message :show="dialogVisible" :al-data="alData" @close-compile="closeCompile" @refresh="refreshData">
    </ma-message>
  </el-container>
</template>
<script>
  import maMessage from './components/message.vue'
  // 引入导出Excel表格依赖
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    components: {
      maMessage
    },
    props: ['id', 'arg'], // router props传参(取参)
    data() {
      return {
        axiosTable: 'message', // 操作的数据库表名
        thisPa: 1, // 当前页
        loading: false, // 加载中
        input: '', // 标题搜索
        tableData: [{}], // 列表的数据
        thisTable: [], // 当前显示列表的数据（分页）
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
      issueFilter(value, row) { // 状态筛选
        return row.state == value
      },
      pageFilter(val) { // 分页操作
        this.thisPa = val
      },
      thisTableFun() { // 列表数据分页拆分
        this.thisTable = []
        for (var i = 0; i < Math.ceil(this.tableData.length / 10); i++) {
          this.thisTable.push(this.tableData.slice(10 * i, 10 * i + 10))
        }
        // console.log(this.thisTable)
      },
      refreshData: function () { // 刷新列表数据
        var _this = this
        this.$http.get(this.axiosTable).then(function (res) { // 字符串转换布尔值
          _this.tableData = res.data
          _this.tableData.forEach((item) => {
            if (item.state == null) {
              item.state = '未阅'
            }
          })
          console.log(_this.tableData)
          _this.thisTableFun() // 列表数据分页拆分
          _this.thisPa = 1 // 返回第一分页
        })
      },
      closeCompile: function (bo) { // 关闭编辑
        this.dialogVisible = bo
      },
      handleSelectionChange(val) { // 表单change事件
        this.selectData = val
      },
      redact(da) { // 编辑
        this.refreshData() // 刷新数据列表
        var te = da.constructor.toString()
        if (te.indexOf('Object') > 0) {
          this.alData = da
          this.dialogVisible = true
        }
        if (te.indexOf('Array') > 0) {
          if (da.length > 1) {
            alert('一次只能编辑一条数据！')
          } else {
            this.alData = da[0]
            this.dialogVisible = true
          }
        }
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
      },
      // 定义导出Excel表格事件
      exportExcel() {
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'), {
          raw: true
        })
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(
            // Blob 对象表示一个不可变、原始数据的类文件对象。
            // Blob 表示的不一定是JavaScript原生格式的数据。
            // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], {
              type: 'application/octet-stream'
            }),
            // 设置导出文件名称
            'sheetjs.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      }
    }
  }

</script>
<style scoped>
  span.iconfont {
    margin-right: 6px;
  }

  .el-row {
    margin-bottom: 15px;
  }

  .el_li {
    float: left;
    margin-right: 15px;
  }

  .el_input {
    float: left;
  }

  .el_button {
    float: left;
    margin-left: 10px;
  }

  .el_button button.el-button {
    padding-top: 10px;
  }

  .el-table .cell,
  .el-table--border td:first-child .cell {
    padding-left: 14px;
  }

  th.el-table_1_column_2.is-leaf .cell {
    text-align: left;
  }

  .page {
    margin-top: 20px;
    text-align: center;
  }

  .el-dialog {
    min-width: 1000px;
    padding: 10px 40px 10px 0px;
  }

  .el-input-number i {
    color: #666;
  }

  .line.el-col.el-col-2 {
    text-align: center;
    padding-top: 8px;
  }

  i.el-icon {
    color: #666;
    padding-top: 2px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  li.el-submenu.is-active .title,
  li.el-submenu.is-active i:before,
  li.el-submenu.is-active a:before {
    color: #409EFF;
  }

  span.caret-wrapper {
    top: 9px;
    margin-right: -6px;
  }

  span.el-table__column-filter-trigger {
    margin-left: 6px;
  }

</style>
