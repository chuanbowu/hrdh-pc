<template>
  <div class="ShakeData">
    <div class="tab">
      <div class="tab-item" :class="tab===1?'active':''" @click="changeTab(1)">品牌拿货</div>
      <div class="tab-item" :class="tab===2?'active':''" @click="changeTab(2)">品牌返佣</div>
    </div>
    <tab-nav ref="type" @changeType="(data)=>{type = data}"/>
    <div class="list">
      <template v-if="tab===1"><good-recommendation class="goods" v-for="(item, index) in brandTakeDeliveryGoodsList" :item="item" :key="index" /></template>
      <template v-if="tab===2"><return-goods class="goods" v-for="(item, index) in brandCommissionGoodsList" :item="item" :key="index" /></template>
      <div class="nodata" v-if="tab===1&&brandTakeDeliveryGoodsList.length===0">
        抱歉，没有相关的商品
      </div>
      <div class="nodata" v-if="tab===2&&brandCommissionGoodsList.length===0">
        抱歉，没有相关的商品
      </div>
    </div>
    <pager v-show="page.totalPage>0" class="pager" @changepage="changepage" :page="page" />
  </div>
</template>

<script>
import GoodRecommendation from '@c/GoodRecommendation'
import tabNav from '@c/tabNav'
import returnGoods from '@c/ReturnCommission'
import { brandCommissionGoodsList, brandTakeDeliveryGoodsList } from '@/api'
import pager from '@c/Pager'
export default {
  name: 'ShakeData',
  components: {
    GoodRecommendation,
    returnGoods,
    pager,
    tabNav
  },
  data () {
    return {
      page: { totalPage: 0, currentPage: 1 },
      tab: 1,
      type: '',
      brandCommissionGoodsList: [],
      brandTakeDeliveryGoodsList: []
    }
  },
  methods: {
    changeTab (index) {
      this.tab = index
      this.page = { totalPage: 0, currentPage: 1 }
      this.type = ''
      this.$refs.type.resttype()
      if (this.tab === 1) this.getbrandTakeDeliveryGoodsList()
      else this.getbrandCommissionGoodsList()
    },
    changepage (page) {
      this.page.currentPage = page
      if (this.tab === 1) this.getbrandTakeDeliveryGoodsList()
      else this.getbrandCommissionGoodsList()
    },
    async getbrandCommissionGoodsList () {
      const res = await brandCommissionGoodsList({ typeId: this.type, goodsName: this.$route.query.keywords || '', pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.brandCommissionGoodsList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async getbrandTakeDeliveryGoodsList () {
      const res = await brandTakeDeliveryGoodsList({ typeId: this.type, goodsName: this.$route.query.keywords || '', pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.brandTakeDeliveryGoodsList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    }
  },
  created () {
    this.getbrandTakeDeliveryGoodsList()
  },
  watch: {
    '$route.query.keywords': function (val) {
      this.page = { totalPage: 0, currentPage: 1 }
      this.$refs.type.resttype()
      if (this.tab === 1) this.getbrandTakeDeliveryGoodsList()
      else this.getbrandCommissionGoodsList()
    }
  }
}
</script>

<style lang="less" scoped>
.ShakeData {
  box-sizing: border-box;
  padding-top: 24px;
  margin: 0 auto;
}
.tab {
  text-align: center;
  .tab-item {
    display: inline-block;
    width: 298px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    color: #DF56E1;
    font-size: 20px;
    background:rgba(255,255,255,1);
    border-radius: 28px;
    position: relative;
    cursor: pointer;
    margin-right: 198px;
    &:last-of-type {
      margin-right: 0;
      &::before {
        left: 198px;
      }
      &.active {
        &::before {
          background: rgb(211, 95, 229);
        }
      }
    }
    &::before {
      content: '';
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      bottom: -7px;
      left: 70px;
      background:rgba(255,255,255,1);
    }
    &.active {
      color: #ffffff;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      &::before {
        background: rgb(186, 115, 239);
      }
    }
  }
}
.nav-list {
  height: 70px;
  line-height: 70px;
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
.list {
  .goods {
    margin-right: 40px;
    margin-bottom: 24px;
    display: inline-block;
    vertical-align: top;
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
.nodata {
    margin-bottom: 24px;
    line-height: 200px;
    background-color: #fff;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
.pager {
  padding: 16px 0 40px;
}
</style>
