# vue-selector

> a vue selector plugin

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
自定义选择器，支持自定义选择器标题，icon,以及组织树的快速搜索

使用方式
main.js引入
import selector from 'vue-selector'
Vue.use(selector)

在需要使用該選擇器的地方，使用 kz-selector 標簽引入，如下，点击输入框即弹出部门人员选择器
<template>
  <div id="app">
    <el-input type="text" v-model="quickSearch" @focus="showSelectDialog" placeholder="选择部门或人员"></el-input>
    <kz-selector :title="title" :model="model" :checkedDatas="checkedDatas" :datas="datas" @getSelectData="getSelectData"></kz-selector>
  </div>
</template>

说明：
``` bash
title         选择器模态框的标题（如：部门选择器、人员选择器、器材选择器等等）可以自定义

model         选择器是否显示

checkedDatas  已选择的数据或者默认选择的数据

datas         可供选择的数据

getSelectData 选择数据确定之后触发的操作
```

传输数据eg:
