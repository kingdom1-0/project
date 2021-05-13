<!-- 导航 -->
<template>
    <el-aside class="nav_bl" :width="unfold?(200+''):(64+'')">
        <el-menu unique-opened default-active="2" class="el-menu-vertical-demo" background-color="#545c64"
            text-color="#fff" active-text-color="rgb(64, 158, 255)" :collapse="unfold" :collapse-transition="false">
            <div class="bu_unfold" @click="unfold = !unfold"><i class="el-icon-s-unfold"></i></div>
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                <template slot="title"><i :class="icoList[item.id]"></i><span
                        class="title">{{item.authName}}</span></template>
                <el-menu-item v-for="it in item.children" :index="it.id+''" :key="it.id">{{it.authName}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<!-- 导航 -->
<script>
    export default {
        data() {
            return {
                menulist: [{
                        id: 1,
                        authName: "首页(banner)"
                    }, { //左侧菜单数据
                        id: 2,
                        authName: "品牌指引",
                        children: [{
                                id: "1_1",
                                authName: "楼层管理"
                            },
                            {
                                id: "1_2",
                                authName: "类别管理"
                            },
                            {
                                id: "1_3",
                                authName: "品牌管理"
                            }
                        ]
                    },
                    {
                        id: 3,
                        authName: "活动精选"
                    },
                    {
                        id: 4,
                        authName: "会员天地",
                        children: [{
                                id: "3_1",
                                authName: "会员活动"
                            },
                            {
                                id: "3_2",
                                authName: "加入会员"
                            },
                            {
                                id: "3_3",
                                authName: "会员须知"
                            },
                            {
                                id: "3_4",
                                authName: "积分特权"
                            }
                        ]
                    }
                ],
                icoList: { //左侧图标
                    1: 'el-icon-user',
                    2: 'el-icon-help',
                    3: 'el-icon-goods',
                    4: 'el-icon-tickets',
                    5: 'el-icon-notebook-2',
                },
                unfold: false
            }
        }

    }

</script>
