<template>
  <el-container class="man_content">
    <div
      id="table-content"
      class="bl_ul"
    >      
      <div class="bl_li">
        <div class="bl_title">
          后台首页
        </div>
        <div class="bl_text">
          系统和服务器的一些信息,跳转第三方流量统计
        </div>
      </div>
      <div class="bl_li">
        <div class="bl_title">
          内容管理
        </div>
        <div class="bl_text">
          <p>添加：新增新数据，新增后，前端页面重新刷新就会生效</p>
          <p>编辑：对现有的数据进行修改，双击相应的数据或勾选数据后点编辑按钮</p>
          <p>置顶：最高优先级，把数据放在最前面显示</p>
          <p>取消置顶：取消置顶优先级，让数据按其它的排序规则排列（置顶 》 数字排序（升序，0不参与排序） 》 发布时间（时间越新数据越前））</p>
          <p>发布：让数据显示于网站</p>
          <p>待发布：数据存在于数据库，后台可见，但不显示于网站</p>
          <p>批量删除：删除所有勾选的数据,删除的数据无法找回，如不明确，建议先待发布</p>
          <p>查询：按标题查询数据进行筛选显示</p>
        </div>
      </div>
      <div class="bl_li">
        <div class="bl_title">
          留言管理
        </div>
        <div class="bl_text">
          收集网站用户的留言信息，进行用户服务
        </div>
      </div>
      <div class="bl_li">
        <div class="bl_title">
          留言管理
        </div>
        <div class="bl_text">
          收集网站用户的留言信息，进行用户服务，支持打印留存
        </div>
      </div>
      <div class="bl_li">
        <div class="bl_title">
          系统设置 
        </div>
        <div class="bl_text">
          <p>登陆日志：对所有登陆操作进行记录</p>
          <p>操作日志：记录对网站所有操作</p>
          <p>角色管理：管理员账户（admin）对登陆用户进行增、删、改、查、权限设定，让不同的用户访问和操作其角色权限范围内容</p>
        </div>
      </div>
      <div class="bl_li">
        <div class="bl_title">
          外链 
        </div>
        <div class="bl_text">
          <p>链接到GitHub原码，开发者可以对原码进行功能开发</p>          
        </div>
      </div>
      <div class="bl_li">
        <div class="bl_title">
          admin
        </div>
        <div class="bl_text">
          <p>修改密码：对当前登陆账号进行密码修改（限管理员admin）</p>     
          <p>退出：退出当前账号</p>     
        </div>
      </div>
      <div class="button">
        <el-button
          type="primary"
          @click="printContent()"
        >
          打 印
        </el-button>  
      </div>
    </div>    
  </el-container>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods:{
          printContent() {
              // 这里就是打印的地方，用id包起来
              var print = document.getElementById('table-content')
              var newContent = print.innerHTML
              var oldContent = document.body.innerHTML
              // console.log(document.body.innerHTML);
              document.body.innerHTML = newContent
              document.getElementsByTagName('body')[0].style.zoom = 1.2
              document.getElementsByTagName('body')[0].style.paddingTop = '40px'
              window.print()
              window.location.reload()
              // 将原有页面还原到页面
              document.body.innerHTML = oldContent
              return false
          }
        }
    }

</script>
<style scoped>
  .bl_ul {position: relative;width:90%;padding-top:60px;margin:0 auto;padding-bottom:60px;}
  .bl_li {position: relative;width:100%;margin-bottom:30px;border: 1px solid #ddd;box-shadow: 0 0 10px 0 #ccc;padding: 2%;padding-bottom:3%;}
  .bl_title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .button {text-align:right;}
</style>
