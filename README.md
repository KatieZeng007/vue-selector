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
title         选择器模态框的标题（如：部门选择器、人员选择器、器材选择器等等）可以自定义
model         选择器是否显示
checkedDatas  为数组，已被选择的数据或者默认选择的数据
datas         可供选择的数据
getSelectData 选择数据确定之后触发的操作


传输数据eg:
export default {
  name: 'app',
  data () {
    return {
      model: false,
      title: '部门人员选择器',
      quickSearch: '',
      // 已选择数据
      checkedDatas: [{
        label: '小曹',
        id: 4,
        parentId: 3,
        icon: 'el-icon-self-nvxing'
      },
      {
        label: '吴敏',
        id: 18,
        parentId: 16,
        icon: 'el-icon-self-nanxing'
      }],
      curLists: [],
      datas: [
        {
          label: '事业部',
          id: 2,
          parentId: 1,
          icon: 'el-icon-self-bumenguanli',
          child: [
            {
              label: '数据中心',
              id: 3,
              parentId: 2,
              icon: 'el-icon-self-bumenguanli',
              child: [
                {
                  label: '小曹',
                  id: 4,
                  parentId: 3,
                  icon: 'el-icon-self-nvxing'
                },
                {
                  label: '数据维护',
                  id: 5,
                  parentId: 3,
                  icon: 'el-icon-self-bumenguanli',
                  child: [
                    {
                      label: '数据安全',
                      id: 16,
                      parentId: 5,
                      icon: 'el-icon-self-bumenguanli',
                      child: [
                        {
                          label: '杨越',
                          id: 17,
                          parentId: 16,
                          icon: 'el-icon-self-nvxing'
                        },
                        {
                          label: '吴敏',
                          id: 18,
                          parentId: 16,
                          icon: 'el-icon-self-nanxing'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label: '开发一部',
              id: 6,
              parentId: 2,
              icon: 'el-icon-self-bumenguanli',
              child: [
                {
                  label: '教务开发组',
                  id: 7,
                  parentId: 6,
                  icon: 'el-icon-self-bumenguanli',
                  child: [
                    {
                      label: '教务产品中心',
                      id: 19,
                      parentId: 7,
                      icon: 'el-icon-self-bumenguanli',
                      child: [
                        {
                          label: '周武',
                          id: 20,
                          parentId: 19,
                          icon: 'el-icon-self-nanxing'
                        },
                        {
                          label: '任平',
                          id: 21,
                          parentId: 19,
                          icon: 'el-icon-self-nanxing'
                        }
                      ]
                    }
                  ]
                },
                {
                  label: '教务维护组',
                  id: 8,
                  parentId: 6,
                  icon: 'el-icon-self-bumenguanli',
                  child: [
                    {
                      label: '运维中心',
                      id: 22,
                      parentId: 8,
                      icon: 'el-icon-self-bumenguanli',
                      child: [
                        {
                          label: '尹佳伟',
                          id: 23,
                          parentId: 22,
                          icon: 'el-icon-self-nanxing'
                        },
                        {
                          label: '蔡姐',
                          id: 24,
                          parentId: 22,
                          icon: 'el-icon-self-nvxing'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '财务部',
          id: 9,
          parentId: 1,
          icon: 'el-icon-self-bumenguanli',
          child: [
            {
              label: '税务管理',
              id: 10,
              parentId: 9,
              icon: 'el-icon-self-bumenguanli',
              child: [
                {
                  label: '王浩',
                  id: 11,
                  parentId: 10,
                  icon: 'el-icon-self-nanxing'
                },
                {
                  label: '老谈',
                  id: 12,
                  parentId: 10,
                  icon: 'el-icon-self-nanxing'
                },
                {
                  label: '老张',
                  id: 13,
                  parentId: 10,
                  icon: 'el-icon-self-nvxing'
                }
              ]
            },
            {
              label: '财务管理',
              id: 13,
              parentId: 9,
              icon: 'el-icon-self-bumenguanli',
              child: [
                {
                  label: '老汪',
                  id: 14,
                  parentId: 13,
                  icon: 'el-icon-self-nvxing'
                },
                {
                  label: '小星星',
                  id: 15,
                  parentId: 13,
                  icon: 'el-icon-self-nvxing'
                },
                {
                  label: '狒狒',
                  id: 15,
                  parentId: 13,
                  icon: 'el-icon-self-nvxing'
                },
                {
                  label: '小萍',
                  id: 16,
                  parentId: 13,
                  icon: 'el-icon-self-nvxing'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    showSelectDialog () {
      console.info('a')
      this.model = !this.model
    },
    // 获取选择数据
    getSelectData (datas, showValue) {
      // 清空历史选择数据
      this.model = false
      this.quickSearch = showValue
    }
  }
}

