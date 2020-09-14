<template>
  <div class="MyTakeDelivery">
    <div class="title"><span><img :src="require('@/assets/img/PC/yp.png')" alt="">我的取样</span></div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index" @click="$router.push(`/MyTakeDeliveryDetail?id=${item.orderId}`)">
        <div class="img"><img :src="item.mainPic" alt=""></div>
        <div class="info">
          <p class="name">{{item.businessTitle}}</p>
          <!-- <div class="price1"><img :src="require('@/assets/img/PC/deposit.png')" alt=""><span>￥{{item.depositPrice}}</span></div> -->
          <div class="price2">商品券后价<span>￥{{item.couponAfterPrice}}</span></div>
          <div class="return">佣金￥{{item.commissionPrice}}，比例{{item.proportion}}%</div>
        </div>
      </div>
      <div class="nodata" v-if="list.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
        “暂无取样记录”
      </div>
    </div>
    <pager v-if="list.length>0" class="pager" @changepage="changepage" :page="page" />
  </div>
</template>

<script>
import pager from '@c/Pager'
import { orderList } from '@/api'
export default {
  name: 'MyTakeDelivery',
  components: {
    pager
  },
  data () {
    return {
      page: { totalPage: 12, currentPage: 1 },
      list: []
    }
  },
  methods: {
    changepage (page) {
      this.page.currentPage = page
      this.getorderList()
    },
    async getorderList () {
      const res = await orderList({ pageNum: this.page.currentPage, pageSize: 10 })
      if (res.result === '0') {
        this.list = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 10)
      }
    }
  },
  created () {
    this.getorderList()
  }
}
</script>

<style lang="less" scoped>
  .MyTakeDelivery {
    padding-left: 42px;
    width: 933px;
    margin-bottom: 4px;
    .title {
      height: 66px;
      text-align: center;
      color: #fff;
      background:linear-gradient(270deg,rgba(253,155,255,1) 0%,rgba(254,211,211,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#FD9BFF", endColorstr="#FED3D3", gradientType="1");
      font-size: 25px;
      margin-bottom: 22px;
      span {
        line-height: 66px;
        position: relative;
        display: inline-block;
        width: 158px;
        padding-left: 58px;
        box-sizing: border-box;
      }
      img {
        width: 40px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
      }
    }
    .list {
      .item {
        padding: 16px 20px;
        margin-bottom: 22px;
        background-color: #fff;
        .img {
          width: 197px;
          height: 167px;
          overflow: hidden;
          position: relative;
          display: inline-block;
          margin-right: 30px;
          vertical-align: top;
          margin-right: 22px;
          img {
            position: absolute;
            width: 100%;
            min-height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .info {
          width: calc(100% - 219px);
          display: inline-block;
          vertical-align: top;
          .name {
            font-size: 14px;
            color: #666;
            line-height: 19px;
            margin-top: 12px;
            margin-bottom: 14px;
          }
          .price1 {
            margin-bottom: 16px;
            img {
              width: 44px;
              vertical-align: bottom;
            }
            span {
              font-size: 22px;
              line-height: 29px;
              color: #E2801D;
              padding-left: 9px;
            }
          }
          .price2 {
            font-size: 14px;
            line-height: 19px;
            color: #666;
            margin-bottom: 14px;
            span {
              padding-left: 11px;
              color: #EB0000;
            }
          }
          .return {
            font-size: 12px;
            color: #666;
            line-height: 14px;
          }
        }
      }
    }
    .pager {
      padding: 16px 0 40px;
    }
  }
</style>
