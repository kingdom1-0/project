本项目使用 node 来为集团官网、项目宣传站点、内部系统，构建后台信息管理，相关使用 mysql（数据库）、SQLyog Community - 64 bit（数据库管理）、phpstudy_pro（服务器环境配置，主要把 mysql 运行起来）、vue、nodeJS、elementUi（搭后台资讯管理系统）、UEditor(资讯编辑器) 。
配好环境，下载下去，用 SQLyog Community - 64 bit（数据库管理）建个对应数据的表，就可以直接 axios 或 ajax 访问表名，关健时候，轮子都不用你造，一个人相当一个团队，不考虑超大访问量（互联网类集团），一般集团没问题

# 数据库 sql 文件存放路径

public/sql/project.sql

# 运行 node 访问数据库

node public/app.js

# 后台资讯管理路径

/manage/

# project

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
