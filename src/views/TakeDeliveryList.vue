<template>
  <div class="TakeDeliveryList">
    <div v-show="!$route.query.keywords" class="banner" @click="$router.push(`GoodsDetail?id=${goodsAdvert.goodsId}`)" :style="`background-image:url(${baseUrl + goodsAdvert.advertisementPic});background-repeat: no-repeat;background-size:100%;background-position: center center;`">
      <!-- <img src="https://img.darentui.com/dou+_banner.png" alt=""> -->
    </div>
    <div v-show="!$route.query.keywords">
      <tab-nav ref="type" @changeType="(data)=>{type = data}"/>
    </div>
    <div class="list">
      <good-recommendation class="goods" v-for="(item, index) in takeDeliveryGoodsList" :item="item" :key="index" />
      <div class="nodata" v-if="takeDeliveryGoodsList.length===0">
        抱歉，没有相关的商品
      </div>
    </div>
    <pager v-show="page.totalPage>0" class="pager" @changepage="changepage" :page="page" />
  </div>
</template>

<script>
import GoodRecommendation from '@c/GoodRecommendation'
import tabNav from '@c/tabNav'
import { baseUrl } from '@/utils/commom'
import { takeDeliveryGoodsList, takeDeliveryGoodsSearchList, goodsAdvertisementList } from '@/api'
import pager from '@c/Pager'
export default {
  name: 'TakeDeliveryList',
  components: {
    GoodRecommendation,
    pager,
    tabNav
  },
  data () {
    return {
      page: { totalPage: 0, currentPage: 1 },
      baseUrl: baseUrl,
      type: '',
      goodsAdvert: { },
      takeDeliveryGoodsList: []
    }
  },
  methods: {
    changepage (page) {
      this.page.currentPage = page
      if (this.$route.query.keywords) this.gettakeDeliveryGoodsSearchList()
      else this.gettakeDeliveryGoodsList()
    },
    async gettakeDeliveryGoodsList () {
      const res = await takeDeliveryGoodsList({ typeId: this.type, pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.takeDeliveryGoodsList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async gettakeDeliveryGoodsSearchList () {
      const res = await takeDeliveryGoodsSearchList({ goodsName: this.$route.query.keywords, pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.takeDeliveryGoodsList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async getgoodsAdvertisementList () {
      const res = await goodsAdvertisementList({ type: 2 })
      if (res.result === '0') {
        this.goodsAdvert = res.datas.list[0] || {}
      }
    }
  },
  created () {
    this.getgoodsAdvertisementList()
    this.gettakeDeliveryGoodsList()
    if (this.$route.query.keywords) this.gettakeDeliveryGoodsSearchList()
  },
  watch: {
    '$route.query.keywords': function (val) {
      if (val) {
        this.gettakeDeliveryGoodsSearchList()
      } else {
        this.$refs.type.resttype()
        this.gettakeDeliveryGoodsList()
      }
    },
    type: function () {
      this.page = { totalPage: 0, currentPage: 1 }
      this.gettakeDeliveryGoodsList()
    }
  }
}
</script>

<style lang="less" scoped>
.TakeDeliveryList {
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
