<template>
  <div class="Home">
    <div class="title">
      <img :src="require('@/assets/img/money.png')" alt="">
      <span>返佣商品</span>
      <img :src="require('@/assets/img/money.png')" alt="">
    </div>
    <div class="list">
      <!-- <return-goods class="goods" v-for="(item, index) in 8" :key="index" /> -->
      <return-goods class="goods" v-for="(item, index) in commissionList" :item="item" :key="index" />
      <div class="nodata" v-if="commissionList.length===0">
        抱歉，没有搜索到‘<span style="color: #eb453c; font-weight:700">{{$route.query.keywords}}</span>’相关的商品
      </div>
    </div>
    <pager v-show="page1.totalPage>0" class="pager" @changepage="changepage1" :page="page1" />
    <div class="title">
      <img style="width: 33px" :src="require('@/assets/img/Recommend.png')" alt="">
      <span>拿货商品</span>
      <img style="width: 33px" :src="require('@/assets/img/Recommend.png')" alt="">
    </div>
    <div class="list">
      <good-recommendation class="goods" v-for="(item, index) in goodstakeDeliveryList" :item="item" :key="index" />
      <!-- <good-recommendation class="goods" v-for="(item, index) in 8" :key="index" /> -->
      <div class="nodata" v-if="goodstakeDeliveryList.length===0">
        抱歉，没有搜索到‘<span style="color: #eb453c; font-weight:700">{{$route.query.keywords}}</span>’相关的商品
      </div>
    </div>
    <pager v-show="page2.totalPage>0" class="pager" @changepage="changepage2" :page="page2" />
  </div>
</template>

<script>
import returnGoods from '@c/ReturnCommission'
import GoodRecommendation from '@c/GoodRecommendation'
import { commissionGoodsSearchList, takeDeliveryGoodsList, commissionGoodsList, takeDeliveryGoodsSearchList } from '@/api'
import pager from '@c/Pager'
export default {
  name: 'Home',
  data () {
    return {
      goodstakeDeliveryList: [],
      commissionList: [],
      page1: { totalPage: 0, currentPage: 1 },
      page2: { totalPage: 0, currentPage: 1 }
    }
  },
  components: {
    pager,
    returnGoods,
    GoodRecommendation
  },
  methods: {
    async getcommissionGoodsSearchList () {
      const res = await commissionGoodsSearchList({ goodsName: this.$route.query.keywords, pageNum: this.page1.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.commissionList = res.datas.list
        this.page1.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async gettakeDeliveryGoodsList () {
      const res = await takeDeliveryGoodsList({ typeId: '', pageNum: this.page2.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.goodstakeDeliveryList = res.datas.list
        this.page2.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async getcommissionGoodsList () {
      const res = await commissionGoodsList({ typeId: '', pageNum: this.page1.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.commissionList = res.datas.list
        this.page1.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    changepage1 (page) {
      this.page1.currentPage = page
      if (this.$route.query.keywords) this.getcommissionGoodsSearchList()
      else this.getcommissionGoodsList()
    },
    changepage2 (page) {
      this.page2.currentPage = page
      if (this.$route.query.keywords) this.gettakeDeliveryGoodsSearchList()
      else this.gettakeDeliveryGoodsList()
    },
    async gettakeDeliveryGoodsSearchList () {
      const res = await takeDeliveryGoodsSearchList({ goodsName: this.$route.query.keywords, pageNum: this.page2.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.goodstakeDeliveryList = res.datas.list
        this.page2.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    go (item) {
      if (item.type === 1) {
        this.$router.push(`/GoodsDetail?id=${item.goodsId}`)
      } else {
        this.$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)
      }
    }
  },
  created () {
    if (this.$route.query.keywords) {
      this.getcommissionGoodsSearchList()
      this.gettakeDeliveryGoodsSearchList()
    } else {
      this.getcommissionGoodsList()
      this.gettakeDeliveryGoodsList()
    }
  },
  watch: {
    '$route.query.keywords': function (val) {
      this.page1 = { totalPage: 0, currentPage: 1 }
      this.page2 = { totalPage: 0, currentPage: 1 }
      if (val) {
        this.getcommissionGoodsSearchList()
        this.gettakeDeliveryGoodsSearchList()
      } else {
        this.getcommissionGoodsList()
        this.gettakeDeliveryGoodsList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .Home {
    padding-top: 24px;
  }
  .title {
    height: 78px;
    line-height: 78px;
    text-align: center;
    margin-bottom: 24px;
    background:linear-gradient(270deg,rgba(253,155,255,1) 0%,rgba(254,211,211,1) 100%);
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#FD9BFF", endColorstr="#FED3D3", gradientType="1");
    span {
      display: inline-block;
      vertical-align: middle;
      width: 236px;
      text-align: center;
      font-size: 25px;
      color: #fff;
    }
    img {
      width: 27px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .list {
    margin-bottom: 24px;
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
    margin-bottom: 10px;
  }
</style>
