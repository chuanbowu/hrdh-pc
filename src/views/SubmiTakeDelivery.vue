<template>
  <div class="SubmiTakeDelivery">
    <div class="title">取样确认</div>
    <div>
      <div class="detail">
        <div class="headimg" @click="godetail"><img :src="detail.mainPic" alt=""></div>
        <div class="detailInfo">
          <p class="name" @click="godetail">{{detail.businessTitle}}</p>
          <div class="info"><span class="price">券后价￥{{detail.couponAfterPrice}}</span><span class="coupon"><img :src="require('@/assets/img/coupon.png')" alt="">{{detail.couponPrice}}元</span></div>
          <div class="return">佣金￥{{detail.commissionPrice}}，比例{{detail.proportion}}%</div>
          <div class="time">活动时间：{{detail.activityStartDate}}-{{detail.activityEndDate}}</div>
          <div class="num">剩余样品：{{detail.surplusNum}}件</div>
        </div>
      </div>
      <div class="shopDetail">
        <div>
          <img class="logo" :src="baseUrl+detail.headPic" alt="">
          <div class="name">{{detail.shopName}}</div>
          <template v-if="detail.reputationType<6"><img v-for="(item, index) in detail.reputationType" :key="index" class="icon" src="../assets/img/PC/level4.gif" alt=""></template>
          <template v-if="detail.reputationType>5&&detail.reputationType<11"><img class="icon" src="../assets/img/PC/level5.gif" alt=""></template>
          <template v-if="detail.reputationType>10&&detail.reputationType<16"><img class="icon" src="../assets/img/PC/level1.gif" alt=""></template>
          <template v-if="detail.reputationType>15"><img class="icon" src="../assets/img/PC/level2.png" alt=""></template>
          <ul>
            <li>
              <div>宝贝描述</div>
              <span>{{detail.babyDescription}}</span>
            </li>
            <li>
              <div>卖家服务</div>
              <span>{{detail.sellerServices}}</span>
            </li>
            <li>
              <div>物流服务</div>
              <span>{{detail.logisticsService}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="address">
      <div><span>收样人：{{detail.consigneeName}}</span><br><span>电话：{{detail.phone}}</span></div>
      <span>详细地址：{{detail.consigneeAddress}}</span>
    </div>
    <div class="tip">如需变更收样地址，请至个人资料详情中修改</div>
    <div class="pay-con" v-if="detail.paymentDeposit===1">
      <div class="payway">由于您的粉丝量级未达到商家设置的要求，请在下单前联系商家，否则商家有可能拒绝您的取样要求。</div>
      <!-- <div class="radio"><img @click="payway=1" :src="payway===1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">微信支付</div>
      <div class="radio"><img @click="payway=2" :src="payway===2?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">支付宝支付</div> -->
      <div class="btn" @click="dialogTableVisible=true">确认取样</div>
    </div>
    <div class="nopay" v-else>
      <div class="payway">您的粉丝数量已达取样标准，您可以：</div>
      <div class="btn" @click="addOrder">确认取样</div>
    </div>
    <el-dialog width="400px" title="提示" :visible.sync="dialogTableVisible">
      <div class="con">
        <p style="color:#eb453c;line-height:20px">由于您的粉丝量级未达到商家设置的要求，请在下单前联系商家，否则商家有可能拒绝您的取样要求。</p>
        <p style="padding: 10px;text-align:center">商家二维码</p>
        <template v-if="detail.customerWeChatPic">
          <img style="display:block;width: 250px;margin: 0 auto" :src="baseUrl+detail.customerWeChatPic" alt="">
        </template>
        <template v-if="detail.customerPhone">
          <div style="padding: 10px;text-align:center">商家联系电话：{{detail.customerPhone}}</div>
        </template>
        <div class="sure-btn">
          <div @click="dialogTableVisible=false">取消取样</div>
          <div @click="addOrder">确认取样</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderInfo, addOrder } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'SubmiTakeDelivery',
  data () {
    return {
      payway: '',
      needPay: false,
      detail: {},
      baseUrl: baseUrl,
      dialogTableVisible: false
    }
  },
  methods: {
    async getcommissionGoodsInfo () {
      const res = await getOrderInfo({ goodsId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        if (this.detail.reputationType > 5 && this.detail.reputationType < 11) this.detail.reputationType -= 5
        if (this.detail.reputationType > 10 && this.detail.reputationType < 16) this.detail.reputationType -= 10
        if (this.detail.reputationType > 15) this.detail.reputationType -= 15
      } else if (res.result === '403051') {
        this.$router.go(-1)
      }
    },
    async addOrder () {
      const res = await addOrder({ goodsId: this.detail.goodsId, paymentDeposit: this.detail.paymentDeposit })
      if (res.result === '1') {
        this.dialogTableVisible = false
        this.$message({ type: 'success', message: '申请取样成功' })
        this.$router.replace('/MyTakeDelivery')
      }
    },
    godetail () {
      window.open(this.detail.itemUrl)
    }
  },
  created () {
    this.getcommissionGoodsInfo()
  }
}
</script>

<style lang="less" scoped>
  .SubmiTakeDelivery {
    padding-top: 24px;
    margin: 0 auto;
    .title {
      height: 61px;
      line-height: 61px;
      padding-left: 63px;
      font-size: 21px;
      color: #DF56E1;
      background-color: #fff;
      border-radius: 2px;
      margin-bottom: 24px;
    }
    .detail {
      width: 823px;
      height: 364px;
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      padding: 31px;
      background-color: #fff;
      margin-right: 24px;
      .headimg {
        width: 300px;
        height: 300px;
        overflow: hidden;
        position: relative;
        display: inline-block;
        margin-right: 30px;
        vertical-align: top;
        img {
          position: absolute;
          width: 100%;
          min-height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .detailInfo {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 330px);
        .name {
          height: 38px;
          font-size: 14px;
          line-height: 19px;
          color: #666;
          margin: 20px 0 35px;
        }
        .info {
          margin-bottom: 22px;
          .price {
            font-size: 14px;
            font-weight: 700;
            color: #666;
            padding-right: 45px;
          }
          .coupon {
            font-size: 14px;
            line-height: 19px;
            color: #E2801D;
            img {
              width: 12px;
            }
          }
        }
        .return {
          font-size: 12px;
          color: #666;
          margin-bottom: 50px;
        }
        .time {
          font-size: 12px;
          color: #666;
          line-height: 14px;
          margin-bottom: 4px;
        }
        .num {
          font-size: 12px;
          line-height: 14px;
          color: #666;
          margin-bottom: 30px;
        }
      }
    }
    .shopDetail {
      width: 315px;
      height: 364px;
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      line-height: 364px;
      background-color: #fff;
      overflow: hidden;
      > div {
        vertical-align: middle;
        display: inline-block;
        width: 100%;
        height: auto;
        text-align: center;
        line-height: 1;
        .logo {
          width: 84px;
        }
        .name {
          font-size: 14px;
          color: #666;
          margin-top: 11px;
          margin-bottom: 7px;
        }
        .icon {
          height: 17px;
          margin-right: 3px;
        }
        ul {
          margin-top: 23px;
          li {
            display: inline-block;
            vertical-align: top;
            margin-right: 35px;
            &:last-child {
              margin-right: 0;
            }
            div {
              color: #666;
              font-size: 12px;
              margin-bottom: 14px;
            }
            span {
              font-size: 12px;
              color: #1677FF;
            }
          }
        }
      }
    }
    .address {
      border-radius: 2px;
      background-color: #fff;
      padding: 25px 0;
      font-size: 14px;
      color: #666;
      margin-top: 24px;
      padding-left: 31px;
      span {
        line-height: 22px;
      }
      div {
        line-height: 22px;
      }
    }
    .tip {
      height: 56px;
      font-size: 12px;
      color: #DF56E1;
      line-height: 56px;
      user-select: none;
      padding-left: 31px;
    }
    .pay-con {
      border-radius: 2px;
      background-color: #fff;
      height: 209px;
      margin-bottom: 24px;
      .payway {
        padding-left: 31px;
        font-size: 14px;
        line-height: 19px;
        padding-top: 23px;
        padding-bottom: 17px;
        color: #666;
      }
      .radio {
        position: relative;
        padding-left: 68px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        margin-bottom: 17px;
        img {
          position: absolute;
          top: 50%;
          left: 44px;
          width: 16px;
          transform: translate(0, -50%);
          cursor: pointer;
        }
      }
      .btn {
        width: 189px;
        height: 33px;
        margin-left: 44px;
        font-size: 12px;
        text-align: center;
        line-height: 33px;
        color: #fff;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
        cursor: pointer;
      }
    }
    .nopay {
      border-radius: 2px;
      background-color: #fff;
      height: 138px;
      margin-bottom: 24px;
      .payway {
        padding-left: 31px;
        font-size: 14px;
        line-height: 19px;
        padding-top: 28px;
        padding-bottom: 26px;
        color: #666;
      }
      .btn {
        width: 189px;
        height: 33px;
        margin-left: 44px;
        font-size: 12px;
        text-align: center;
        line-height: 33px;
        color: #fff;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
        cursor: pointer;
      }
    }
  }
  .sure-btn {
    >div:nth-child(1) {
      display: inline-block;
      width: 100px;
      height: 33px;
      margin-left: 44px;
      font-size: 12px;
      text-align: center;
      line-height: 33px;
      color: #666;
      cursor: pointer;
      background-color: #e9e9e9;
    }
    >div:nth-child(2) {
      display: inline-block;
      width: 100px;
      height: 33px;
      margin-left: 44px;
      font-size: 12px;
      text-align: center;
      line-height: 33px;
      color: #fff;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      cursor: pointer;
    }
  }
</style>
