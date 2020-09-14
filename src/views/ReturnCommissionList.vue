<template>
  <div class="ReturnCommissionList">
    <div v-show="!$route.query.keywords" class="banner" @click="$router.push(`ReturnCommissionDetail?id=${goodsAdvert.goodsId}`)" :style="`background-image:url(${baseUrl + goodsAdvert.advertisementPic});background-repeat: no-repeat;background-size:100%;background-position: center center;`">
      <!-- <img src="https://img.darentui.com/dou+_banner.png" alt=""> -->
    </div>
    <div v-show="!$route.query.keywords">
      <tab-nav ref="type" @changeType="(data)=>{type = data}"/>
    </div>
    <div class="list">
      <return-goods class="goods" v-for="(item, index) in commissionGoodsList" :item="item" :key="index" />
      <div class="nodata" v-if="commissionGoodsList.length===0">
        抱歉，没有相关的商品
      </div>
    </div>
    <pager v-show="page.totalPage>0" class="pager" @changepage="changepage" :page="page" />
  </div>
</template>

<script>
import returnGoods from '@c/ReturnCommission'
import tabNav from '@c/tabNav'
import { baseUrl } from '@/utils/commom'
import { commissionGoodsList, commissionGoodsSearchList, goodsAdvertisementList } from '@/api'
import pager from '@c/Pager'
export default {
  name: 'ReturnCommissionList',
  components: {
    returnGoods,
    pager,
    tabNav
  },
  data () {
    return {
      page: { totalPage: 0, currentPage: 1 },
      baseUrl: baseUrl,
      commissionGoodsList: [],
      goodsAdvert: {},
      type: ''
    }
  },
  methods: {
    changepage (page) {
      this.page.currentPage = page
      if (this.$route.query.keywords) this.getcommissionGoodsSearchList()
      else this.getcommissionGoodsList()
    },
    async getcommissionGoodsList () {
      const res = await commissionGoodsList({ typeId: this.type, pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.commissionGoodsList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async getcommissionGoodsSearchList () {
      const res = await commissionGoodsSearchList({ goodsName: this.$route.query.keywords, pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.commissionGoodsList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async getgoodsAdvertisementList () {
      const res = await goodsAdvertisementList({ type: 1 })
      if (res.result === '0') {
        this.goodsAdvert = res.datas.list[0] || {}
      }
    }
  },
  created () {
    this.getcommissionGoodsList()
    this.getgoodsAdvertisementList()
    if (this.$route.query.keywords) this.getcommissionGoodsSearchList()
  },
  watch: {
    '$route.query.keywords': function (val) {
      if (val) {
        this.getcommissionGoodsSearchList()
      } else {
        this.$refs.type.resttype()
        this.getcommissionGoodsList()
      }
    },
    type: function () {
      this.page = { totalPage: 0, currentPage: 1 }
      this.getcommissionGoodsList()
    }
  }
}
</script>

<style lang="less">
  .ReturnCommissionList {
    box-sizing: border-box;
    padding-top: 24px;
    margin: 0 auto;
  }
  .banner {
    height: 200px;
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
