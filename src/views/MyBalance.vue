<template>
  <div class="MyBalance">
    <div class="title"><span><img :src="require('@/assets/img/PC/MyBalance.png')" alt="">我的余额</span></div>
    <div class="con">
      <div class="item">
        <span class="price">{{detail.balancePrice}}</span>
        <p>我的余额（元）</p>
        <div @click="gets">提现</div>
      </div>
      <div class="item">
        <span class="price">{{detail.estimatedRevenuePrice}}</span>
        <p>本月预估（元）</p>
      </div>
    </div>
    <el-dialog width="450px" title="提现" :visible.sync="dialogTableVisible">
      <div class="cons">
        <el-form ref="form" :model="Balance" :rules="Balancerules" label-width="110px">
          <el-form-item label="可提现余额" prop="totalmoneyPrice">
            <!-- <span style="position:absolute;left:-90px;color:#eb453c;">*</span> -->
            <span>{{Balance.totalmoneyPrice}}</span>
          </el-form-item>
          <el-form-item label="支付宝账号" prop="account">
            <span style="position:absolute;left:-92px;color:#eb453c;">*</span>
            <el-input min="0" style="width: 270px" v-model="Balance.account" placeholder="请输入支付宝账号"></el-input>
          </el-form-item>
          <el-form-item label="支付宝真实姓名" prop="trueName">
            <span style="position:absolute;left:-118px;color:#eb453c;">*</span>
            <el-input min="0" style="width: 270px" v-model="Balance.trueName" placeholder="请输入支付宝真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="提现金额" prop="moneyPrice">
            <span style="position:absolute;left:-77px;color:#eb453c;">*</span>
            <el-input type="number" min="0" style="width: 270px" v-model="Balance.moneyPrice" placeholder="请输入提现金额"></el-input>
          </el-form-item>
        </el-form>
        <div class="sure-btn">
          <div @click="dialogTableVisible=false">取消</div>
          <div :class="cansubmit?'active':''" @click="Withdrawal">确认</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sensationPrice, sensationWithdraw } from '@/api'
export default {
  name: 'MyBalance',
  data () {
    var checkInt2 = (rule, value, callback) => {
      if (!value) return callback(new Error('请输入提现金额'))
      if (value < 0) return callback(new Error('提现金额不能小于0'))
      if (value > this.detail.balancePrice) return callback(new Error('可提现余额不足'))
    }
    var checkaccount = (rule, value, callback) => {
      if (!value) return callback(new Error('请输入支付宝账号'))
    }
    var checktrueName = (rule, value, callback) => {
      if (!value) return callback(new Error('请输入真实姓名'))
    }
    return {
      detail: {},
      Balance: { totalmoneyPrice: '', moneyPrice: '', account: '', trueName: '' },
      dialogTableVisible: false,
      Balancerules: {
        moneyPrice: [
          { validator: checkInt2, trigger: 'change' }
        ],
        account: [
          { validator: checkaccount, trigger: 'change' }
        ],
        trueName: [
          { validator: checktrueName, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    cansubmit: function () {
      return this.Balance.moneyPrice === '' || this.Balance.account === '' || this.Balance.trueName === ''
    }
  },
  methods: {
    async getsensationPrice () {
      const res = await sensationPrice({})
      if (res.result === '0') {
        this.detail = res.datas
        this.Balance.totalmoneyPrice = this.detail.balancePrice
      }
    },
    gets () {
      this.getsensationPrice()
      this.dialogTableVisible = true
    },
    async Withdrawal () {
      if (this.cansubmit) return
      const res = await sensationWithdraw({ moneyPrice: this.Balance.moneyPrice, account: this.Balance.account, trueName: this.Balance.trueName })
      if (res.result === '1') {
        this.$message({ type: 'success', message: '提现申请已发出' })
        this.getsensationPrice()
        this.dialogTableVisible = false
      }
    }
  },
  created () {
    this.getsensationPrice()
  }
}
</script>

<style lang="less" scoped>
  .MyBalance {
    padding-left: 42px;
    width: 933px;
    margin-bottom: 70px;
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
    .con {
      height: 432px;
      position: relative;
      background-color: #fff;
      .item {
        display: inline-block;
        width: 50%;
        vertical-align: top;
        text-align: center;
        padding-top: 100px;
        .price {
          color: #AC7EF4;
          font-size: 74px;
          line-height: 97px;
        }
        p {
          color: #AC7EF4;
          font-size: 20px;
          line-height: 26px;
          margin-top: 13px;
        }
        div {
          width:224px;
          height:44px;
          background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
          filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
          text-align: center;
          line-height: 44px;
          color: #fff;
          font-size: 16px;
          margin: 30px auto 0;
          cursor: pointer;
        }
      }
    }
  }
  .sure-btn {
    text-align: center;
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
      &.active {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
</style>
