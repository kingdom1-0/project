<template>
    <el-main>
        <div class="manage_content">
            <table class="layui-table">
                <tbody>
                    <tr>
                        <td>服务器名</td>
                        <td>{{system.hostname}}</td>
                    </tr>
                    <tr>
                        <td>服务器IP</td>
                        <td>{{system.ip}}</td>
                    </tr>
                    <tr>
                        <td>nodeJs版本</td>
                        <td>{{system.node}}</td>
                    </tr>
                    <tr>
                        <td>文件目录</td>
                        <td>{{system.location}}</td>
                    </tr>
                    <tr>
                        <td>操作系统</td>
                        <td>{{system.system}}</td>
                    </tr>
                    <tr>
                        <td>系统架构</td>
                        <td>{{system.arch}}</td>
                    </tr>
                    <tr>
                        <td>CPU个数</td>
                        <td>{{system.cpus}} 个</td>
                    </tr>
                    <tr>
                        <td>开机运行时长</td>
                        <td>{{system.uptime}} 小时</td>
                    </tr>
                    <tr>
                        <td>内存占用</td>
                        <td>{{system.totalmem}} M</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </el-main>

</template>
<script>
    export default {
        data() {
            return {
                system: {} //系统信息
            }
        },
        created() {
            var _this = this;
            this.$http.get("system").then(function (res) {
                _this.system = res.data;
            })
        }
    }

</script>
<style>
    td:nth-child(1n) {
        text-align: right;
    }

    td:nth-child(2n) {
        text-align: left;
    }

    table.layui-table {
        width: 100%;
        border: 1px solid #ccc;
    }

    table.layui-table td {
        padding: 10px 30px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    table.layui-table tr:hover {
        background: rgb(216, 247, 157);
    }

</style>
