<template>
  <el-container class="man_content">
    <ma-nav></ma-nav>
    <!-- 数据列表 -->
    <el-main>
      <el-row>
        <el-button type="primary"><span class="iconfont icon-add-sy"></span>添加</el-button>
        <el-button type="primary"><span class="iconfont icon-bianji"></span>编辑</el-button>
        <el-button type="success"><span class="iconfont icon-zhiding"></span>置顶</el-button>
        <el-button type="success"><span class="iconfont icon-quxiaozhiding"></span>取消置顶</el-button>
        <el-button type="success"><span class="iconfont icon-fabu"></span>发布</el-button>
        <el-button type="success"><span class="iconfont icon-daifabu"></span>待发布</el-button>
        <el-button type="danger"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
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
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </el-row>
    </el-main>
    <ma-compile :show="dialogVisible" @close-compile="closeCompile"></ma-compile>
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
        tableData: [{ //列表数据
          title: 'L1',
          sort: '0',
          issue: true,
          top: false,
          date: '2020-09-15 16:28:39'
        }, {
          title: 'L2',
          sort: '0',
          issue: true,
          top: false,
          date: '2020-09-15 16:28:39'
        }, {
          title: 'L3',
          sort: '0',
          issue: true,
          top: false,
          date: '2020-09-15 16:28:39'
        }, {
          title: 'L4',
          sort: '0',
          issue: true,
          top: false,
          date: '2020-09-15 16:28:39'
        }, {
          title: 'L5',
          sort: '0',
          issue: true,
          top: true,
          date: '2020-09-15 16:28:39'
        }],
        multipleSelection: [],
        currentPage4: 4,
        dialogVisible: false, //弹出框
        ruleForm: { //修改表单模块
          name: '',
          date1: '',
          date2: '',
          issueRe: true,
          topRe: false,
          num: 0
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
        },
        fileList: []
      }
    },
    created() {

    },
    methods: {
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
        console.log(this.multipleSelection)
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
      showBlock(row) { //弹出页
        this.dialogVisible = true
        console.log(row)
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
