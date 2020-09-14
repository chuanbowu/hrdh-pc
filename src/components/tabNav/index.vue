<template>
  <div class="nav-list">
    <div :style="'left: '+x+'px'" ref="con">
      <div ref="item" class="nav-item" @click.stop="changetab($event, '')" :class="typeId === '' ? 'active' : ''">全部</div>
      <div ref="item" class="nav-item" @click.stop="changetab($event, item.goodsTypeConfigId)"  v-for="(item, index) in $store.getters.typeList" :key="index" :class="typeId === item.goodsTypeConfigId ? 'active' : ''">{{item.typeName}}</div>
    </div>
  </div>
</template>

<script>
var w = 1162
export default {
  data () {
    return {
      typeId: '',
      x: 0,
      x1: 0
    }
  },
  methods: {
    changetab (e, type, index) {
      this.typeId = type
      let W = this.$refs.con.clientWidth
      if (W > 1162) { // 超出
        let x = e.target.offsetLeft + e.target.offsetWidth + 21
        if (x - w >= 0) {
          this.x = 1162 - W
        } else {
          this.x = 0
        }
      }
      this.$emit('changeType', type)
    },
    resttype () {
      this.typeId = ''
    },
  }
}
</script>

<style scoped lang="less">
  .nav-list {
    height: 70px;
    overflow: hidden;
    position: relative;
    >div {
      position: absolute;
      top: 0;
      left: 0;
      height: 70px;
      transition: all 0.2s;
      line-height: 70px;
      width: auto;
      white-space: nowrap;
    }
    .nav-item {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: #666;
      height: 21px;
      line-height: 21px;
      border-radius: 4px;
      padding: 0 8px;
      margin-right: 21px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &:hover, &.active {
        color: #fff;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      }
    }
  }
</style>