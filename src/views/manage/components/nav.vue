<!-- 导航 -->
<template>
  <!-- unfold参数 控制导航收放 -->
  <el-aside
    class="nav_bl"
    :width="unfold?(64+'px'):(200+'px')"
  >
    <el-menu
      unique-opened
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="rgb(64, 158, 255)"
      :collapse="unfold"
      :default-active="activeIndex"
      :collapse-transition="true"
      router
    >
      <div
        class="bu_unfold"
        @click="unfold = !unfold"
      >
        <i class="el-icon-s-unfold" />
      </div>
      <!-- 二级导航 -->
      <div
        v-for="item in menulist"
        :key="item.id"
      >
        <el-submenu
          v-if="item.hasOwnProperty('children')"
          :index="item.id + ''"
        >
          <template slot="title">
            <i :class="icoList[item.id]" /><span
              v-show="!unfold"
              class="title"
            >{{ item.authName }}</span>
          </template>
          <el-menu-item
            v-for="it in item.children"
            :key="it.id"
            :index="it.path"
          >
            {{ it.authName }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="item.path"
        >
          <i :class="icoList[item.id]" /><span
            v-show="!unfold"
            class="title"
          >{{ item.authName }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </el-aside>
</template>

<!-- 导航 -->
<script>
    export default {
        data() {
            return {
                activeIndex: '/manage/content/banner',
                menulist: [{
                        id: 1,
                        authName: '首页(banner)',
                        path: 'banner'
                    }, { // 左侧菜单数据
                        id: 2,
                        authName: '品牌指引',
                        children: [{
                                id: '1_1',
                                authName: '楼层管理',
                                path: 'floor' // 路由参数
                            },
                            {
                                id: '1_2',
                                authName: '类别管理',
                                path: 'sort'
                            },
                            {
                                id: '1_3',
                                authName: '品牌管理',
                                path: 'store'
                            }
                        ]
                    },
                    {
                        id: 3,
                        authName: '活动精选',
                        path: 'news'
                    },
                    {
                        id: 4,
                        authName: '会员天地',
                        children: [{
                                id: '3_1',
                                authName: '会员活动',
                                path: 'active'
                            },
                            {
                                id: '3_2',
                                authName: '加入会员',
                                path: 'joinUs'
                            },
                            {
                                id: '3_3',
                                authName: '会员须知',
                                path: 'notice'
                            },
                            {
                                id: '3_4',
                                authName: '积分兑换',
                                path: 'conversion'
                            }
                        ]
                    },
                    {
                        id: 5,
                        authName: '关于我们',
                        path: 'news',
                        children: [{
                                id: '5_1',
                                authName: '项目简介',
                                path: 'synopsis'
                            },
                            {
                                id: '5_2',
                                authName: '交通指南',
                                path: 'traffic'
                            },
                            {
                                id: '5_3',
                                authName: '招商租赁',
                                path: 'attract'
                            },
                            {
                                id: '5_4',
                                authName: '场地合作',
                                path: 'site'
                            },
                            {
                                id: '5_5',
                                authName: '联系我们',
                                path: 'contact'
                            }
                        ]
                    }
                ],
                icoList: { // 左侧图标
                    1: 'iconfont icon-xiantiao-shouye',
                    2: 'iconfont icon-31pinpai',
                    3: 'iconfont icon-huodong',
                    4: 'iconfont icon-huiyuan_',
                    5: 'iconfont icon-guanyuwomen'
                },
                unfold: false
            }
        },
        mounted: function () {
            var hash = location.hash.split('/')
            hash = hash[hash.length - 1]
            this.activeIndex = hash
        }

    }

</script>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .iconfont {
        margin-right: 6px;
        font-size: 18px;
    }
    .nav_bl {background: rgb(84, 92, 100);}
    
</style>
