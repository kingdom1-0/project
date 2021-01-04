<template>
    <div class="man_content">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '2']">
              <el-submenu index="1">
                <template slot="title">首 页</template>
                <el-menu-item index="1-1">视 频</el-menu-item>                 
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">智慧产城</template>
                <el-menu-item-group>
                  <template slot="title">锦绣产城</template>
                  <el-menu-item index="2-1">整体介绍</el-menu-item>
                  <el-menu-item index="2-2">锦绣荣誉</el-menu-item>
                  <el-menu-item index="2-3">锦绣科学园一期</el-menu-item>
                </el-menu-item-group>  
                <el-menu-item-group>
                  <template slot="title">产研大厦</template>
                  <el-menu-item index="3-1">简介</el-menu-item>
                  <el-menu-item index="-2">顶级配置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              
            </el-menu>
          </el-aside>  
    </div>
</template>