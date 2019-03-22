<template>
  <transition name="fade-all">
    <div class="choose" v-show="model">
      <div class="select-dialog" :class="{scale: model}">
        <!--标题-->
        <div class="select-dialog-title">
            <span style="padding-left: 10px">{{title}}</span>
             <i class="el-icon-close" @click="closeItems"></i>
        </div>
        <div class="select-dialog-box">
            <!--待选-->
            <div class="select-dialog-left">
                <div class="search">
                  <el-autocomplete
                    class="auto-complete"
                    v-model="searchLeft"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入部门员工名称查询"
                    :trigger-on-focus="false"
                    @select="searchSelect"
                    clearable></el-autocomplete>
                </div>
                <v-bar wrapper="wrapper" vBar="" vBarInternal="" hBar="" hBarInternal="">
                  <div>
                    <div class="select-dialog-item-box">
                      <trees :datas="datas" @handleData="handleData"></trees>
                    </div>
                  </div>
                </v-bar>
            </div>
          <!--已选-->
          <div class="select-dialog-right">
            <div class="select-dialog-header">
              <span style="float: left;font-size: 12px;">已选</span>
              <el-button type="text" @click="removeAll"><span  style="float: right;margin-right: 5px;font-size: 12px;color:#409EFF;">全部删除</span></el-button>
            </div>
            <v-bar wrapper="wrapper" vBar="" vBarInternal="" hBar="" hBarInternal="">
              <div class="select-dialog-item-box">
                <ul>
                    <li v-for="item in checkDatas" :key="item.id" @click="removeItem(item)">
                      <i :class="item.icon"></i>
                      <span style="padding-left: 5px;font-size: 12px;">{{item.label}}</span>
                    </li>
                </ul>
              </div>
            </v-bar>
          </div>
        </div>
        <div class="select-dialog-foot">
          <el-button type="primary" @click="confirmItems"><span>确定</span></el-button>
          <el-button @click="closeItems"><span>取消</span></el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Trees from './Trees'
import VBar from 'v-bar'
export default {
  name: 'kz-selector',
  props: {
    model: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '选择器'
    },
    datas: {
      type: Array,
      default: []
    },
    // 初始化已选择数据
    checkedDatas: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      searchLeft: '',
      showValue: '',
      isLeftSearch: false,
      checkDatas: this.checkedDatas,
      restaurants: []
    }
  },
  created (){
    this.initSearchData(this.datas)
  },
  methods: {
    initSearchData (datas) {
      if(datas.length > 0){
        datas.forEach(item => {
          item.value = item.label
          this.restaurants.push(item)
          if (item.child) {
            this.initSearchData(item.child)
          }
        })
      }
    },
    // 选择数据
    handleData (node, ev) {
      var exist = false
      // 检查数据是否已经被选择
      if (this.checkDatas.length > 0) {
        this.checkDatas.every(item => {
          if (node.id === item.id) {
            this.$message('不能重复选择数据')
            exist = true
            return false
          } else {
            return true
          }
        })
        if (!exist) {
          this.checkDatas.push(node)
        }
      } else {
        this.checkDatas.push(node)
      }
    },
    // 全部删除
    removeAll () {
      this.$alert('确定全部删除？', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.checkDatas = []
        }
      })
    },
    // 移除数据
    removeItem (item) {
      this.checkDatas.forEach((data, index) => {
        if (data === item) {
          this.checkDatas.splice(index, 1)
          index--
        }
      })
    },
    // 确定提交数据
    confirmItems () {
      this.showValue = ''
      if (this.checkDatas.length > 0) {
        this.checkDatas.forEach(item => {
          this.showValue += item.label + ','
        })
        this.showValue = this.showValue.substring(0, this.showValue.length - 1)
      } else {
        this.showValue = ''
      }
      this.$emit('getSelectData', this.checkDatas, this.showValue)
    },
    // 取消选择数据
    closeItems () {
      // 清空选择数据
      this.checkDatas = []
      // 关闭
      this.$emit('getSelectData', this.checkDatas, this.showValue)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    searchSelect (item) {
      // 选择之后显示在右边选择列表
      this.handleData(item)
      // 清空输入框的数据
      this.searchLeft = ''
    }
  },
  components: {
    Trees,
    VBar
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import './icon/iconfont.css'
.choose
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  background: rgba(55, 55, 55, .6)
  z-index: 2
  .select-dialog
    width: 700px
    border: 1px solid #c7c6c6
    border-radius: 3px
    margin: 100px auto 0
    padding: 5px 5px
    color: #5a5e66
    background: #fff
    transform: scale(.6)
    transition: all .2s linear 0s
    &.scale
      animation: scaleTo .2s linear 0s
      transform: scale(1)
    .select-dialog-header
      font-size: 14px
    .select-dialog-title
      background-color: #000000
      width: 100%;
      color: white;
      height: 30px;
      text-align: left;
      line-height: 30px;
      border-radius: 4px;
    .select-dialog-title i
      padding-right: 10px;
      float: right;
      line-height: 30px;
      cursor: pointer
    .select-dialog-header button, .select-dialog-foot button
      float: right
      margin: 4.5px 15px
    .select-dialog-foot
      overflow: hidden
      padding: 15px 0 0
    .wrapper
      height: 330px
    .select-dialog-box
      display: flex
      padding-top: 10px;
      .select-dialog-left, .select-dialog-right
        flex: 1
        margin: 0 5px
        border: 1px solid #c7c6c6
        border-radius: 4px
        position: relative
        height:391px
      .select-dialog-header
        height: 40px
        line-height: 40px
        padding-left: 15px
        display: block
      .select-dialog-item-box ul
        padding: 0
        margin: 0
        overflow: auto
        float: left
      .select-dialog-right
        i
           float: left
        .select-dialog-item-box li
          height: 16px
          line-height: 16px
          margin-bottom: 5px
          padding-left: 15px
          cursor: pointer
          font-size: 12px
          &:hover
            color: #409eff
      .search
        position: relative
        input
          width: 90%
        ul
          margin-left: 33px
          width: 80%
          li
            word-break: break-all
            cursor: pointer
            &:hover
              color: #409eff
      .search .auto-complete
        width: 90%
        line-height: 1.5
        padding: 4px 7px
        font-size: 12px
</style>
