<template>
  <el-container
    v-loading.fullscreen.lock="fullscreenLoading"
    class="man_content"
  >
    <ma-nav />
    <!-- 数据列表 -->
    <el-main>
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
            content="数据在页面最先显示"
            placement="bottom"
          >
            <el-button
              type="success"
              @click="redactOption('top',true)"
            >
              <span class="iconfont icon-zhiding" />置顶
            </el-button>
          </el-tooltip>
          <el-button
            type="success"
            @click="redactOption('top',false)"
          >
            <span
              class="iconfont icon-quxiaozhiding"
            />取消置顶
          </el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="只有发布的数据，才会显示在网站"
            placement="bottom"
          >
            <el-button
              type="success"
              @click="redactOption('issue',true)"
            >
              <span class="iconfont icon-fabu" />发布
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="内容不在网站显示，但存储于数据库"
            placement="bottom"
          >
            <el-button
              type="success"
              @click="redactOption('issue',false)"
            >
              <span
                class="iconfont icon-daifabu"
              />待发布
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
        <div class="seek_block">
          <el-input
            v-model="seek"
            class="seek_input"
            @change="seekFun()"
          />
          <el-button
            type="success"
            @click="seekFun()"
          >
            <span class="iconfont icon-chaxun" />查询
          </el-button>
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
            prop="title"
            label="标题"
            show-overflow-tooltip
            align="left"
            sortable
          />
          <el-table-column
            prop="sort"
            label="排序"
            width="120"
            align="center"
            sortable
          />
          <el-table-column
            prop="issue"
            label="发布"
            width="120"
            align="center"
            sortable
            :filters="[{text: '已发布', value: 1}, {text: '待发布', value: 0}]"
            :filter-method="issueFilter"
          >
            <span
              v-show="scope.row.issue"
              slot-scope="scope"
              class="iconfont el-icon-check"
            />
          </el-table-column>
          <el-table-column
            prop="top"
            label="置顶"
            width="120"
            align="center"
            sortable
            :filters="[{text: '置顶', value: 1}, {text: '末置顶', value: 0}]"
            :filter-method="topFilter"
          >
            <span
              v-show="scope.row.top"
              slot-scope="scope"
              class="iconfont el-icon-check"
            />
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间"
            width="200"
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
    <ma-compile
      :show="dialogVisible"
      :al-data="alData"
      @close-compile="closeCompile"
      @refresh="refreshData()"
    />
  </el-container>
</template>
<script>
  import maNav from './components/Nav.vue'
  import maCompile from './components/Compile.vue'
  import {
    thisDate, // 返回当前时间
    oplogInfo
  } from './js/common.js' // 公共JS

  export default {
    components: {
      maNav,
      maCompile
    },
    props:{
      id:{
        type:String,
        default:""
      }
    },
    data() {
      return {
        seek: '',
        thisPa: 1, // 当前页
        input: '', // 标题搜索
        tableData: [{}], // 列表的数据
        thisTable: [], // 分页列表的数据
        valTable: [], // 当前显示列表的数据
        selectData: [], // 多选选中的数据
        dialogVisible: false, // 编辑页开关
        alData: {}, // 传入编辑页数据
        fullscreenLoading:false, //加载开关
        time:0 //用于时间差
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
            duration:1000,
            type: 'error'
          })
          return false
        } else {
          return true
        }
      },
      seekFun() { // 搜索
        var _this = this

        function seekInto() {
          if (_this.seek.length > 0) {
            var da = _this.tableData.filter((item) => {
              return item.title.includes(_this.seek)
            })
            _this.tableData = da
          }
        }
        this.refreshData(seekInto) // 刷新搜索数据
      },
      pageFilter(val) { // 分页操作
        this.thisPa = val
      },
      issueFilter(value, row) { // 发布筛选
        return row.issue == value
      },
      topFilter(value, row) { // 置顶筛选
        return row.top == value
      },
      thisTableFun() { // 列表数据分页拆分
        this.thisTable = []
        for (let i = 0; i < Math.ceil(this.tableData.length / 10); i++) {
          this.thisTable.push(this.tableData.slice(10 * i, 10 * i + 10))
        }
        // console.log(this.thisTable)
      },
      openFullScreen() { //1秒加载中提示
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        },500);
      },
      refreshData: function (seekInto) { // 刷新列表数据
        let _this = this;   
        if(new Date().getTime()){
          setTimeout(function(){
            _this.$http.get(_this.id+"?all=1").then(function (res) { // 字符串转换布尔值
              _this.tableData = res.data
              _this.tableData.forEach((item) => {
                item.issue = Boolean(parseInt(item.issue))
                item.top = Boolean(parseInt(item.top))
              })
              if (seekInto) { // 搜索刷新
                seekInto()
              }
              _this.tableData.sort() // 响应式数据
              _this.thisTableFun() // 列表数据分页拆分
              _this.thisPa = 1 // 返回第一分页
            })          
          },500)    
        }
            
      },
      closeCompile: function (bo) { // 关闭编辑
        this.dialogVisible = bo
      },
      handleSelectionChange(val) { // 表单change事件
        this.selectData = val
      },
      addDate() { // 添加数据
        this.$http.get(this.id + 'Head').then((res) => { // 读取列名显示对应的数据项
          var da = {
            add: true
          }
          res.data.forEach(function (item) {
            let key = item.COLUMN_NAME
            if (key == 'value') { // 编辑器的值不能为空
              da[key] = ''
            } else if (key == 'class' || key == 'images') {
              da[key] = []
            } else if (key == 'issue') { // 默认发布
              da[key] = 1
            } else if (key == 'date') { // 默认当前时间
              da[key] = thisDate()
            } else {
              da[key] = null
            }
          })
          // console.log(da)
          this.alData = da
          this.dialogVisible = true
        })
      },
      redact(da) { // 编辑
        this.refreshData() // 刷新数据列表
        var te = da.constructor.toString()
        if (te.indexOf('Object') > 0) {
          this.alData = da
          this.dialogVisible = true
        }
        if (te.indexOf('Array') > 0 && this.selectHint()) {
          if (da.length > 1) {
            this.$message({
              message: '一次只能编辑一条数据！',
              duration:1000,
              type: 'error'
            })
          } else {
            this.alData = da[0]
            this.dialogVisible = true
          }
        }
      },
      redactOption(op, val) { // 置顶、取消置顶、发布、待发布
        const tiAr = []
        let text = ''
        if (op == 'top' && val) {
          text = '置顶:'
        } else if (op == 'top' && !val) {
          text = '取消置顶：'
        } else if (op == 'issue' && val) {
          text = '发布：'
        } else if (op == 'issue' && !val) {
          text = '待发布：'
        }
        var thDate = {}
        if (this.selectHint()) {
          this.selectData.forEach((item) => {
            tiAr.push(item.title)            
            thDate = this.tableData.find((age) => {//根据ID返回改动对应数据
              return age.id == item.id
            })
            thDate[op] = val //操作参数（置顶、取消置顶、发布、待发布）      

            this.$http.put(this.$route.params.id, thDate).then((res) => {
              if (res.status == '200') {
                oplogInfo(tiAr, text)  
                this.$message({
                  type: 'success',
                  duration:1000,
                  message: text + '成功!'
                })
                this.selectData = [];
                this.refreshData()
              }
            })
          })
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
              duration:1000,
              message: '删除成功!'
            })
            this.deleteDa()
          }).catch(() => {
            this.$message({
              type: 'info',
              duration:1000,
              message: '已取消删除'
            })
          })
        }
      },
      deleteDa() { // 批量删除
        const tiAr = []
        this.selectData.forEach((item) => {
          tiAr.push(item.title)
          this.$http.delete(this.$route.params.id, {
            params: {
              id: item.id // 对应ID删除
            }
          }).then((res) => {
            if (res.status == '200') {
              oplogInfo(tiAr, '删除内容：')
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

</style>
