<template>
  <div class="GoodsDetail">
    <div>
      <div class="detail">
        <div class="headimg"><img :src="baseUrl+detail.mainPic" alt=""></div>
        <div class="detailInfo">
          <p class="name">{{detail.businessTitle}}</p>
          <div class="info">
            拿货价<span>{{detail.goodsPrice}}</span>元
          </div>
          <div class="btn" @click="getNow">申请拿货</div>
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
    <div class="swiper-container1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in samplingList" :key="index">{{item.content}}</div>
      </div>
    </div>
    <div class="procedure">
      <h5>商品详情</h5>
      <div class="html" v-html="detail.details"></div>
    </div>
    <el-dialog width="400px" :visible.sync="dialogTableVisible">
      <div class="con" style="text-align:center">
        <p style="padding: 10px;">商家二维码</p>
        <template v-if="detail.customerWeChatPic">
          <img style="width: 250px" :src="baseUrl+detail.customerWeChatPic" alt="">
        </template>
        <template v-if="detail.customerPhone">
          <div style="padding: 10px;">商家联系电话：{{detail.customerPhone}}</div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Swiper from 'swiper'
import { baseUrl } from '@/utils/commom'
import { rollPropagandaList, takeDeliveryGoodsInfo } from '@/api'
import { getToken } from '@/utils/auth'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      baseUrl: baseUrl,
      dialogTableVisible: false,
      detail: {},
      samplingList: ['135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！']
    }
  },
  methods: {
    async getrollPropagandaList () {
      const res = await rollPropagandaList({ type: 2 })
      if (res.result === '0') {
        this.samplingList = res.datas.list
        this.$nextTick(() => {
          new Swiper ('.swiper-container1', {
            loop: true,
            direction: 'vertical',
            allowTouchMove: false,
            // 如果需要分页器
            autoplay: {
              delay: 2000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    async gettakeDeliveryGoodsInfo () {
      const res = await takeDeliveryGoodsInfo({ goodsId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        if (this.detail.reputationType > 5 && this.detail.reputationType < 11) this.detail.reputationType -= 5
        if (this.detail.reputationType > 10 && this.detail.reputationType < 16) this.detail.reputationType -= 10
        if (this.detail.reputationType > 15) this.detail.reputationType -= 15
      }
    },
    getNow () {
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
        this.dialogTableVisible = true
      }
    }
  },
  created () {
    this.getrollPropagandaList()
    this.gettakeDeliveryGoodsInfo()
  }
}
</script>

<style lang="less">
  .GoodsDetail {
    padding-top: 24px;
    margin: 0 auto;
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
        width: calc(100% - 330px);
        display: inline-block;
        vertical-align: top;
        .name {
          font-size: 14px;
          line-height: 19px;
          color: #666;
          margin-top: 20px;
          margin-bottom: 70px;
          height: 38px;
        }
        .info {
          font-size: 14px;
          color: #666;
          margin-bottom: 110px;
          span {
            font-size: 24px;
            color: #FF5000;
          }
        }
        .btn {
          width: 189px;
          height: 33px;
          margin-left: 33px;
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
    .swiper-container1 {
      height: 48px;
      overflow: hidden;
      .swiper-slide {
        font-size: 12px;
        color: #DF56E1;
        line-height: 48px;
        user-select: none;
      }
    }
    .procedure {
      min-height: 212px;
      background-color: #fff;
      border-radius: 2px;
      padding: 19px 35px;
      margin-bottom: 24px;
      >.html {
        text-align: center;
        font-size: 12px;
        line-height: 22px;
      }
      h5 {
        font-size: 14px;
        color: #666;
        line-height: 19px;
        padding-bottom: 15px;
        border-bottom: 2px dashed #DF56E2;
        margin-bottom: 10px;
      }
    }
  }
</style>
