<template>
  <el-tree :data="datas"
           :highlight-current="true"
           :expand-on-click-node="false"
           :check-on-click-node="true"
           node-key="id"
           :props="defaultProps"
           @node-click="nodeClick">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <i :class="data.icon"></i><span style="padding-left: 5px;font-size: 12px;">{{ data.label }}</span>
    </span>
  </el-tree>
</template>

<script>
export default {
  name: 'trees',
  props: {
    datas: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      open: false,
      checkedNames: [],
      defaultProps: {
        children: 'child',
        label: 'label'
      }
    }
  },
  methods: {
    // 节点点击事件
    nodeClick (node, ev) {
      this.$emit('handleData', node, ev)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './icon/iconfont.css'
  i
    float: left
  ul
    padding: 0
    li
      user-select: none
      list-style: none
      padding-left: 15px
      cursor: pointer
      div
        overflow: hidden
        margin: 5px 0
        line-height: 1
      label
        cursor: pointer
        display: flex
        align-items: flex-start
        input
          cursor: pointer
          float: left
          display: none
          &:checked + .original-checkbox
            background: #409eff
            i
              display: block
        span
          flex: 1
          &.original-checkbox
            margin: 0 5px
            position: relative
            flex: 0 0 16px
            height: 16px
            background: #fff
            z-index: 1
            transition: border-color .15s cubic-bezier(.71, -.46, .29, 1.46)
            border-radius: 4px
            border: 1px solid #bfcbd9
            cursor: pointer
            box-sizing: border-box
            i
              position: absolute
              left: 2px
              top: 2px
              width: 9px
              height: 5px
              display: none
              border: 1px solid #fff
              border-top: 0
              border-right: 0
              transform: rotate(-45deg)
              &.hasChecked
                border: 0
                transform: rotate(0)
                display: block
                background: #409eff
                width: 8px
                height: 8px
                left: 3px
                top: 3px
            &:hover
              border-color: #409eff
          &.item-name
            font-size: 12px
            line-height: 16px
            &:hover
              color: #409eff
</style>
