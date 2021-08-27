<template>
  <el-container class="man_content">
    <!-- 数据列表 -->
    <el-main v-loading="loading">
      <el-row />
      <el-row>
        <div class="button_ul">
          <el-tooltip
            class="item"
            effect="dark"
            content="添加新数据"
            placement="bottom"
          >
            <el-button
              type="primary"
              @click="addDate()"
            >
              <span class="iconfont icon-add-sy" />添加
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="一次只能单条编辑"
            placement="bottom"
          >
            <el-button
              type="primary"
              @click="redact(selectData)"
            >
              <span class="iconfont icon-bianji" />编辑
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除的数据无法找回，如不明确删除，建议待发布"
            placement="bottom"
          >
            <el-button
              type="danger"
              @click="openDelete()"
            >
              <span class="iconfont icon-shanchu" />批量删除
            </el-button>
          </el-tooltip>
        </div>
        <div class="clear" />
      </el-row>
      <el-row />
      <el-row>
        <el-table
          ref="multipleTable"
          :data="thisTable[thisPa-1]"
          tooltip-effect="dark"
          :border="true"
          :highlight-current-row="true"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-dblclick="redact"
        >
          <el-table-column
            type="selection"
            width="100"
            align="center"
          />
          <el-table-column
            prop="username"
            label="角色名"
            show-overflow-tooltip
            align="center"
            width="200px"
            sortable
          />
          <el-table-column
            prop="password"
            label="密码"
            align="left"
            width="200px"
            sortable
          /> 
          <el-table-column
            prop="text"
            label="权限描述"
            align="left"
            sortable
          />         
          <el-table-column
            prop="date"
            label="创建时间"
            width="200px"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.date }}
            </template>
          </el-table-column>
        </el-table>
        <el-row />
        <el-row />
        <el-row>
          <!-- 分页 -->
          <el-pagination
            v-if="tableData.length > 10"
            background
            layout="prev, pager, next"
            :total="tableData.length"
            align="center"
            :current-page="thisPa"
            @current-change="pageFilter"
          />
        </el-row>
      </el-row>
    </el-main>
    <ma-Power
      :show="dialogVisible"
      :al-data="alData"
      @close-compile="closeCompile"
      @refresh="refreshData()"
    />
  </el-container>
</template>
<script>
  import maPower from './components/Power.vue'
  import {
    oplogInfo
  } from './js/common.js' // 公共JS

  export default {
    components: {
      maPower
    },
    data() {
      return {
        seek: '',
        tableName: 'roles', // 数据库表名
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
    watch: {
      $route() {
        this.refreshData() // 监控路由参数，对应axios数据
      }
    },
    created() {
      // console.log(this.id + this.arg) //this.id  直接对接口名
      // this.$route.params.id  直接访问router动态参数(用了以上props传参代替)
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
      refreshData: function (seekInto) { // 刷新列表数据      
        var _this = this
        setTimeout(function(){
          _this.$http.get(_this.tableName).then(function (res) { // 字符串转换布尔值
            _this.tableData = res.data   
            if (seekInto) { // 搜索刷新
              seekInto()
            }
            _this.tableData.sort() // 响应式数据
            _this.thisTableFun() // 列表数据分页拆分
            _this.thisPa = 1 // 返回第一分页
          })
        },500)        
      },
      closeCompile: function (bo) { // 关闭编辑
        this.dialogVisible = bo
      },
      handleSelectionChange(val) { // 表单change事件
        this.selectData = val
      },
      addDate() { // 添加数据         
          var da = {
            add: true
          }
          this.alData = da
          this.dialogVisible = true       
      },
      redact(da) { // 编辑
        //this.refreshData() // 刷新数据列表
        var te = da.constructor.toString()
        if (te.indexOf('Object') > 0) {
          this.alData = da
          this.dialogVisible = true
        }
        if (te.indexOf('Array') > 0 && this.selectHint()) {
          if (da.length > 1) {
            this.$message({
              message: '一次只能编辑一条数据！',
              type: 'error'
            })
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
        const tiAr = []
        this.selectData.forEach((item) => {
          tiAr.push(item.username)
          if(item.username === 'admin'){
            this.$message({
              type: 'info',
              message: '管理员账号不可删'
            })
          }else{
            this.$http.delete(this.tableName, {
              params: {
                id: item.id // 对应ID删除
              }
            }).then((res) => {
              if (res.status == '200') {
                oplogInfo(tiAr, '删除内容：')
                this.refreshData() // 刷新数据列表
              }
            })
          }          
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

</style>
