<template>
  <el-container class="man_content">
    <ma-nav></ma-nav>
    <!-- 数据列表 -->
    <el-main>
      <el-row>
        <el-tooltip class="item" effect="dark" content="添加新数据" placement="bottom">
          <el-button type="primary"><span class="iconfont icon-add-sy"></span>添加</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="一次只能单条编辑" placement="bottom">
          <el-button type="primary"><span class="iconfont icon-bianji"></span>编辑</el-button>
        </el-tooltip>
        <el-button type="success"><span class="iconfont icon-zhiding"></span>置顶</el-button>
        <el-button type="success"><span class="iconfont icon-quxiaozhiding"></span>取消置顶</el-button>
        <el-tooltip class="item" effect="dark" content="只有发布的数据，在会显示在网站" placement="bottom">
          <el-button type="success"><span class="iconfont icon-fabu"></span>发布</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="内容不在网站显示，但存储于数据库" placement="bottom">
          <el-button type="success"><span class="iconfont icon-daifabu"></span>待发布</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除的数据无法找回，如不明确删除，建议待发布" placement="bottom">
          <el-button type="danger"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
        </el-tooltip>
      </el-row>
      <el-row>
        <div class="el_li">
          <el-select v-model="value">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="el_li">
          <el-select v-model="value2">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="el_li">
          <div class="el_input">
            <el-input v-model="input" placeholder="请输入标题关键字"></el-input>
          </div>
          <div class="el_button">
            <el-button type="primary"><span class="iconfont icon-chaxun"></span>查询</el-button>
          </div>
          <div style="clear:both;"></div>
        </div>
        <div style="clear:both;"></div>
      </el-row>
      <el-row></el-row>
      <el-row>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :border="true"
          :highlight-current-row="true" style="width: 100%" @selection-change="handleSelectionChange"
          @row-dblclick="showBlock">
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题" show-overflow-tooltip align="left">
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="80" align="center">
          </el-table-column>
          <el-table-column prop="issue" label="发布" width="80" align="center">
            <span class="iconfont el-icon-check" slot-scope="scope" v-show="scope.row.issue"></span>
          </el-table-column>
          <el-table-column prop="top" label="置顶" width="80" align="center">
            <span class="iconfont el-icon-check" slot-scope="scope" v-show="scope.row.top"></span>
          </el-table-column>
          <el-table-column prop="date" label="创建时间" width="200" align="center">
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
    <ma-compile :show="dialogVisible" :al-data="alData" @close-compile="closeCompile"></ma-compile>
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
        options: [{ //发布状态
          value: '选项1',
          label: '发布状态'
        }, {
          value: '选项2',
          label: '待发布'
        }, {
          value: '选项3',
          label: '已发布'
        }],
        value: '选项1',
        options2: [{ //置顶
          value: '选项1',
          label: '置顶状态'
        }, {
          value: '选项2',
          label: '未置顶'
        }, {
          value: '选项3',
          label: '置顶'
        }],
        value2: '选项1',
        input: '', //标题搜索
        tableData: [{
          value: '',
          sort: '',
          issue: 0,
          top: 0,
          date: ''
        }],
        multipleSelection: [],
        currentPage4: 4,
        dialogVisible: false, //弹出框
        alData: {
          date: "",
          id: "",
          img: "",
          issue: true,
          sort: "",
          title: "",
          top: true
        }
      }
    },
    created() {
      console.log(this.id + this.arg) //this.id  直接对就接口名
      //this.$route.params.id  直接访问router动态参数(用了以上props传参代替)
      this.axioxGet(this.id); //get数据
    },
    methods: {
      axioxGet: function (url) {
        var _this = this;
        this.$http.get(url).then(function (res) {
          console.log(res.data);
          _this.tableData = res.data;
        })
      },
      closeCompile: function (bo) { //关闭编辑
        this.dialogVisible = bo;
      },
      toggleSelection(rows) { //表格
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //console.log(this.multipleSelection)
      },
      handleSizeChange(val) { //分页
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            console.log(_)
            done();
          })
          .catch(_ => {
            console.log(_)
          });
      },
      showBlock(row) { //数据修改页显示与传递数据
        this.alData = row;
        this.alData.issue = Boolean(row.issue); //0 1  转换boolean值 
        this.alData.top = Boolean(row.top);
        if (typeof (row.class) == "string") {
          this.alData.class = row.class.split(",")
        }
        //console.log(this.alData)
        this.dialogVisible = true;
      },
      submitForm(formName) { //修改表单模块 (提交表单)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.dialogVisible = false;
      },
      handleChange(value) {
        console.log(value);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    watch: {
      $route(to) {
        this.axioxGet(to.params.id); //监控路由参数，对应axios数据
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

</style>
