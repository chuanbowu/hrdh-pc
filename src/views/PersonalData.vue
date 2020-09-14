<template>
  <div class="PersonalData">
    <ul class="nav-bar">
      <li :class="$route.path==='/EditPersonalData'?'active':''" @click="go('/EditPersonalData')">个人资料</li>
      <li :class="$route.path==='/Authentication'?'active':''" @click="go('/Authentication')">认证</li>
      <li :class="$route.path==='/MyTakeDelivery'||$route.path==='/MyTakeDeliveryDetail'?'active':''" @click="go('/MyTakeDelivery')">我的取样</li>
      <li :class="$route.path==='/MyBalance'?'active':''" @click="go('/MyBalance')">我的余额</li>
      <li :class="$route.path==='/IncomeDetails'?'active':''" @click="go('/IncomeDetails')">收入明细</li>
      <li :class="$route.path==='/WithdrawalRecord'?'active':''" @click="go('/WithdrawalRecord')">提现记录</li>
      <li :class="$route.path==='/CustomerService'?'active':''" @click="go('/CustomerService')">联系客服</li>
    </ul>
    <div class="page">
      <router-view />
    </div>
    <div class="title">
      <img :src="require('@/assets/img/PC/money.png')" alt="">
      <span>返佣推荐</span>
      <img :src="require('@/assets/img/PC/money.png')" alt="">
    </div>
    <div class="list">
      <return-goods class="goods" v-for="(item, index) in bottomCommissionRecommendList" :item="item" :key="index" />
      <!-- <return-goods class="goods" v-for="(item, index) in bottomCommissionRecommendList" :item="item" :key="index" /> -->
    </div>
  </div>
</template>

<script>
import returnGoods from '@c/ReturnCommission'
import { sensationAttestationInfo, bottomCommissionRecommendList } from '@/api'
export default {
  name: 'PersonalData',
  components: {
    returnGoods
  },
  data () {
    return {
      detail: {},
      bottomCommissionRecommendList: []
    }
  },
  methods: {
    async go (url) {
      if (url === this.$route.path) return
      if (url === '/Authentication' && this.detail.status === 1) {
        const res = await bottomCommissionRecommendList({})
        if (res.result === '0') {
          this.detail = res.datas
          if (this.detail.status === 1) {
            this.$message({ type: 'warning', message: '请先完善个人资料' })
          } else {
            this.$router.push(url)
          }
        }
        return
      }
      this.$router.push(url)
    },
    async getsensationAttestationInfo () {
      const res = await sensationAttestationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
      }
    },
    async getbottomCommissionRecommendList () {
      const res = await bottomCommissionRecommendList({})
      if (res.result === '0') {
        this.bottomCommissionRecommendList = res.datas.list
      }
    }
  },
  created () {
    this.getsensationAttestationInfo()
    this.getbottomCommissionRecommendList()
  }
}
</script>

<style lang="less" scoped>
  .PersonalData {
    padding-top: 24px;
    margin: 0 auto;
    .nav-bar {
      width: 180px;
      box-sizing: border-box;
      padding: 23px 15px;
      display: inline-block;
      vertical-align: top;
      background-color: #fff;
      li {
        width: 150px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border-radius:4px;
        margin-bottom: 5px;
        font-size: 16px;
        color: #666;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        &.active {
          color: #fff;
          background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
          filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
        }
      }
    }
    .page {
      display: inline-block;
      vertical-align: top;
    }
    .title {
      height: 66px;
      line-height: 66px;
      text-align: center;
      background-color: #fff;
      position: relative;
      margin-bottom: 24px;
      &::before {
        content: '';
        position: absolute;
        width: 243px;
        height: 1px;
        background-color: #E05EE2;
        left: 172px;
        top: 50%;
        transform: translate(0, -50%);
      }
      &::after {
        content: '';
        position: absolute;
        width: 243px;
        height: 1px;
        background-color: #E05EE2;
        right: 172px;
        top: 50%;
        transform: translate(0, -50%);
      }
      span {
        display: inline-block;
        vertical-align: middle;
        width: 236px;
        text-align: center;
        font-size: 25px;
        color: #666;
      }
      img {
        width: 27px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .list {
      margin-bottom: 30px;
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
  }
</style>
