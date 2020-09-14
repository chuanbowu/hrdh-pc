<template>
  <div id="app">
    <router-view/>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { goodsTypeConfigList } from  '@/api'
export default {
  methods: {
    async getgoodsTypeConfigList () {
      const res = await goodsTypeConfigList({})
      if (res.result === '0') {
        this.$store.commit('typeList', res.datas.list)
      }
    }
  },
  created () {
    this.getgoodsTypeConfigList()
  }
}
</script>

<style lang="less">
@import 'styles/reset.css';
html,body{
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-width: 1200px;
  background-color: #F7F2FF;
  font-size: 0;
  line-height: 1;
}
.rotate1 {
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  border-top: 5px solid #DF56E1;
  border-left: 5px solid #DF56E1;
  top: -5px;
  left: -5px;
}
.rotate2 {
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  border-top: 5px solid #DF56E1;
  border-right: 5px solid #DF56E1;
  top: -5px;
  right: -5px;
}
.rotate3 {
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  border-bottom: 5px solid #DF56E1;
  border-right: 5px solid #DF56E1;
  bottom: -5px;
  right: -5px;
}
.rotate4 {
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  border-bottom: 5px solid #DF56E1;
  border-left: 5px solid #DF56E1;
  bottom: -5px;
  left: -5px;
}
</style>
