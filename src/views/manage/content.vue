<template>
  <el-container class="man_content">
    <ma-nav></ma-nav>
    <!-- 数据列表 -->
    <el-main v-loading="loading">
      <el-row></el-row>
      <el-row>
        <el-tooltip class="item" effect="dark" content="添加新数据" placement="bottom">
          <el-button type="primary" @click="addDate()"><span class="iconfont icon-add-sy"></span>添加</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="一次只能单条编辑" placement="bottom">
          <el-button type="primary" @click="redact(selectData)"><span class="iconfont icon-bianji"></span>编辑
          </el-button>
        </el-tooltip>
        <el-button type="success" @click="redactOption('top',true)"><span class="iconfont icon-zhiding"></span>置顶
        </el-button>
        <el-button type="success" @click="redactOption('top',false)"><span
            class="iconfont icon-quxiaozhiding"></span>取消置顶
        </el-button>
        <el-tooltip class="item" effect="dark" content="只有发布的数据，在会显示在网站" placement="bottom">
          <el-button type="success" @click="redactOption('issue',true)"><span class="iconfont icon-fabu"></span>发布
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="内容不在网站显示，但存储于数据库" placement="bottom">
          <el-button type="success" @click="redactOption('issue',false)"><span class="iconfont icon-daifabu"></span>待发布
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除的数据无法找回，如不明确删除，建议待发布" placement="bottom">
          <el-button type="danger" @click="deleteDa()"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
        </el-tooltip>
      </el-row>
      <el-row></el-row>
      <el-row></el-row>
      <el-row>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :border="true"
          :default-sort="{prop: 'sort', order: 'descending'}" :highlight-current-row="true" style="width: 100%"
          @selection-change="handleSelectionChange" @row-dblclick="redact">
          <el-table-column type="selection" width="100" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题" show-overflow-tooltip align="left" sortable>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="120" align="center" sortable>
          </el-table-column>
          <el-table-column prop="issue" label="发布" width="120" align="center" sortable
            :filters="[{text: '已发布', value: 1}, {text: '待发布', value: 0}]" :filter-method="issueFilter">
            <span class="iconfont el-icon-check" slot-scope="scope" v-show="scope.row.issue"></span>
          </el-table-column>
          <el-table-column prop="top" label="置顶" width="120" align="center" sortable
            :filters="[{text: '置顶', value: 1}, {text: '末置顶', value: 0}]" :filter-method="topFilter">
            <span class="iconfont el-icon-check" slot-scope="scope" v-show="scope.row.top"></span>
          </el-table-column>
          <el-table-column prop="date" label="创建时间" width="200" align="center" sortable>
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div> -->
      </el-row>
    </el-main>
    <ma-compile :show="dialogVisible" :al-data="alData" @close-compile="closeCompile" @refresh="refreshData">
    </ma-compile>
  </el-container>
</template>
<script>
  import maNav from '../components/maNav.vue'
  import maCompile from '../components/maCompile.vue'
  export default {
    components: {
      maNav,
      maCompile
    },
    props: ['id', 'arg'], //router props传参(取参)
    data() {
      return {
        loading: false, //加载中        
        input: '', //标题搜索
        tableData: [{}], //列表的数据
        selectData: [], //多选选中的数据
        currentPage4: 4,
        dialogVisible: false, //编辑页开关
        alData: {} //传入编辑页数据
      }
    },
    created() {
      //console.log(this.id + this.arg) //this.id  直接对就接口名
      //this.$route.params.id  直接访问router动态参数(用了以上props传参代替)
      this.refreshData(); //get对应id参数数据
    },
    methods: {
      issueFilter(value, row) { //发布筛选
        return row.issue == value;
      },
      topFilter(value, row) { //置顶筛选
        return row.top == value;
      },
      refreshData: function () { //刷新列表数据
        var _this = this;
        this.$http.get(this.id).then(function (res) { //字符串转换布尔值 
          _this.tableData = res.data;
          _this.tableData.forEach((item) => {
            item.issue = Boolean(parseInt(item.issue));
            item.top = Boolean(parseInt(item.top));
          })
          console.log(_this.tableData)
        })
      },
      closeCompile: function (bo) { //关闭编辑
        this.dialogVisible = bo;
      },
      handleSelectionChange(val) { //表单change事件
        this.selectData = val;
      },
      addDate() { //添加数据             
        this.$http.get(this.id + "Head").then((res) => { //读取列名显示对应的数据项
          var da = {
            add: true
          };
          res.data.forEach(function (item) {
            let key = item.COLUMN_NAME
            if (key == "value") { //编辑器的值不能为空
              da[key] = "";
            } else if (key == "class" || key == "images") {
              da[key] = [];
            } else if (key == "issue") { //默认发布
              da[key] = 1;
            } else if (key == "date") { //默认当前时间
              var date = new Date();
              da[key] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date
                .getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            } else {
              da[key] = null;
            }
          })
          console.log(da)
          this.alData = da;
          this.dialogVisible = true;
        })
      },
      redact(da) { //编辑
        this.refreshData(); //刷新数据列表
        var te = da.constructor.toString();
        if (te.indexOf("Object") > 0) {
          this.alData = da;
          this.dialogVisible = true;
        }
        if (te.indexOf("Array") > 0) {
          if (da.length > 1) {
            alert("一次只能编辑一条数据！");
          } else {
            this.alData = da[0]
            this.dialogVisible = true;
          }
        }
      },
      redactOption(op, val) { //置顶、取消置顶、发布、待发布
        this.selectData.forEach((item) => {
          var thDate = this.tableData.find((age) => {
            return age.id == item.id
          });
          thDate[op] = val;
          this.loading = true;
          this.$http.put(this.$route.params.id, thDate).then((res) => {
            if (res.status == "200") {
              this.loading = false;
            }
          })
        })
      },
      deleteDa() { //批量删除
        this.selectData.forEach((item) => {
          this.$http.delete(this.$route.params.id, {
            params: {
              id: item.id //对应ID删除
            }
          }).then((res) => {
            if (res.status == "200") {
              this.refreshData(); //刷新数据列表
            }
          })
        })
      }
    },
    watch: {
      $route() {
        this.refreshData(); //监控路由参数，对应axios数据
        this.$router.go(0); //刷新当前页(为了清掉编辑页编辑器缓存)
      }
    }
  }

</script>
<style>
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
