<template>
  <el-container class="man_content">
    <ma-nav></ma-nav>
    <!-- 数据列表 -->
    <el-main v-loading="loading">
      <el-row></el-row>
      <el-row>
        <div class="button_ul">
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
            <el-button type="success" @click="redactOption('issue',false)"><span
                class="iconfont icon-daifabu"></span>待发布
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除的数据无法找回，如不明确删除，建议待发布" placement="bottom">
            <el-button type="danger" @click="deleteDa()"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
          </el-tooltip>
        </div>
        <div class="seek_block">
          <el-input v-model="seek" class="seek_input"></el-input>
          <el-button type="success" @click="seekFun()"><span class="iconfont icon-chaxun"></span>查询</el-button>
        </div>
        <div class="clear"></div>
      </el-row>
      <el-row></el-row>
      <el-row>
        <el-table ref="multipleTable" :data="thisTable[thisPa-1]" tooltip-effect="dark" :border="true"
          :highlight-current-row="true" style="width: 100%" @selection-change="handleSelectionChange"
          @row-dblclick="redact">
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
        <el-row></el-row>
        <el-row></el-row>
        <el-row>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" v-if="tableData.length > 10" :total="tableData.length"
            align="center" @current-change="pageFilter" :current-page="thisPa"></el-pagination>
        </el-row>
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
        seek: "",
        thisPa: 1, //当前页
        loading: false, //加载中        
        input: '', //标题搜索
        tableData: [{}], //列表的数据
        thisTable: [], //分页列表的数据
        valTable: [], //当前显示列表的数据 
        selectData: [], //多选选中的数据
        dialogVisible: false, //编辑页开关
        alData: {} //传入编辑页数据
      }
    },
    created() {
      //console.log(this.id + this.arg) //this.id  直接对接口名
      //this.$route.params.id  直接访问router动态参数(用了以上props传参代替)
      this.refreshData(); //get对应id参数数据
    },
    methods: {
      seekFun() {
        var _this = this;
        console.log(this.seek)
        console.log(this.thisTable[this.thisPa - 1]);
        this.thisTable[this.thisPa - 1].filter((item) => {
          return item.title.indexOf(_this.seek)
        })
      },
      pageFilter(val) { //分页操作
        this.thisPa = val
      },
      issueFilter(value, row) { //发布筛选
        return row.issue == value;
      },
      topFilter(value, row) { //置顶筛选
        return row.top == value;
      },
      thisTableFun() { //列表数据分页拆分
        this.thisTable = [];
        for (var i = 0; i < Math.ceil(this.tableData.length / 10); i++) {
          this.thisTable.push(this.tableData.slice(10 * i, 10 * i + 10));
        }
        console.log(this.thisTable)
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
          _this.thisTableFun(); //列表数据分页拆分
          _this.thisPa = 1; //返回第一分页
        })
      },
      closeCompile: function (bo) { //关闭编辑
        this.dialogVisible = bo;
      },
      handleSelectionChange(val) { //表单change事件
        this.selectData = val;
      },
      thisDate() { //返回当前时间
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate()
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return date.getFullYear() + "-" + month + "-" + day + " " + date
          .getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      },
      addDate() { //添加数据     
        var _this = this;
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
              da[key] = _this.thisDate()
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
      }
    }
  }

</script>
<style>
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
