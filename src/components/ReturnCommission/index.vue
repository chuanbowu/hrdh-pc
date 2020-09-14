<template>
  <div class="item">
    <div class="img" @click="$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)">
      <img :src="item.mainPic" alt="">
    </div>
    <p class="name" @click="$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)">{{item.businessTitle}}</p>
    <div class="info"><span class="price">券后价￥{{item.couponAfterPrice}}</span><span class="coupon"><img :src="require('@/assets/img/coupon.png')" alt="">{{item.couponPrice}}元</span></div>
    <div class="return">佣金￥{{item.commissionPrice}}，比例{{item.proportion}}%</div>
    <div class="btn" @click="getsample">申请取样</div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getsample () {
      if (!getToken()) { // 未登录
        this.$alert('您还未登录，请先去登录', '', {
          showClose: false,
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/Login')
          }
        })
      } else if (this.$store.getters.detail.status === 1) { // 未完善资料
        this.$alert('您的个人资料还未完善，请先去完善个人资料', '', {
          showClose: false,
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/EditPersonalData')
          }
        })
      } else if (this.$store.getters.detail.status !== 5 && this.$store.getters.detail.status !== 1) { // 未认证
        this.$alert('您还未进行红人认证，请先去认证', '', {
          showClose: false,
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/Authentication')
          }
        })
      } else {
        this.$router.push(`/ReturnCommissionDetail?id=${this.item.goodsId}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
    width: 260px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    .img {
      width: 220px;
      height: 220px;
      overflow: hidden;
      position: relative;
      margin-bottom: 8px;
      img {
        position: absolute;
        width: 100%;
        min-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .name {
      font-size: 14px;
      color: #666;
      line-height: 19px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 38px;
      margin-bottom: 7px;
      font-weight: 700;
    }
    .info {
      line-height: 19px;
      margin-bottom: 10px;
      .price {
        color: #666;
        font-size: 14px;
        display: inline-block;
        width: 144px;
      }
      .coupon {
        font-size: 14px;
        color: #E2801D;
        display: inline-block;
        vertical-align: top;
        line-height: 19px;
      }
      img {
        width: 12px;
        margin-right: 4px;
        // vertical-align: middle;
      }
    }
    .return {
      font-size: 12px;
      color: #666;
      margin-bottom: 10px;
    }
    .btn {
      height:33px;
      text-align: center;
      line-height: 33px;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
    }
  }
</style>
