<template>
  <div class="MyTakeDeliveryDetail">
    <div class="title"><span><img :src="require('@/assets/img/PC/yp.png')" alt="">我的取样</span></div>
    <div class="status">
      <span>{{type[detail.status-1]}}</span>
    </div>
    <div class="TakeDelivery" v-if="detail.status>3">
      <div class="address" style="height:auto">
        <div style="padding: 20px 0;"><span style="padding-right: 10px;">商家发样快递公司：{{detail.businessExpressName}}</span><span>快递单号：{{detail.businessNum}}</span></div>
      </div>
    </div>
    <div class="item">
      <div class="img"><img :src="detail.mainPic" alt=""></div>
      <div class="info">
        <div class="name">
          <div class="name-text">{{detail.businessTitle}}</div>
          <div v-if="detail.status>3" class="copy" :data-clipboard-text="detail.couponShareUrl">复制推广链接</div>
        </div>
        <!-- <div class="price1"><img :src="require('@/assets/img/PC/deposit.png')" alt=""><span>￥50</span></div> -->
        <div class="price2">商品券后价<span>￥{{detail.couponAfterPrice}}</span></div>
        <div class="return">佣金￥{{detail.commissionPrice}}，比例{{detail.proportion}}%</div>
      </div>
      <div class="achievements">
        <div class="achievements-item">
          <div>{{detail.extensionNum}}</div>
          <span>已推广（件）</span>
        </div>
        <div class="achievements-item">
          <div>{{detail.profitPrice}}</div>
          <span>收益（元）</span>
        </div>
      </div>
    </div>
    <div class="sureTake" v-if="detail.status===4" @click="sureTake">确认收样</div>
    <div class="TakeDelivery" v-if="detail.status>4">
      <div class="status">
        <span>商家收样信息</span>
      </div>
      <div class="address">
        <div><span style="padding-right: 10px;">收样人：{{detail.businessConsigneeName}}</span><span>电话：{{detail.businessConsigneePhone}}</span></div>
        <span>详细地址：{{detail.businessConsigneeAddress}}</span>
      </div>
      <div class="explain" v-html="detail.businessExplain"></div>
      <div class="send-back" v-if="detail.status===5">
        <select v-model="expressId" @change="getcityList(provinceId)">
          <option value='' disabled selected style='display:none;'>请选择寄回快递公司</option>
          <option :value="item.expressId" v-for="(item, index) in expressList" :key="index">{{item.expressName}}</option>
        </select>
        <input v-model="sensationNum" type="text" placeholder="请输入快递单号">
        <div v-if="detail.status===5" class="send" :class="cansend?'active':''" @click="send">我已寄回</div>
      </div>
      <div class="send-info">
        <span>{{detail.sensationExpressName}}</span>
        <span>{{detail.sensationNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { orderInfo, expressList, sendOrder, receivingOrder } from '@/api'
import ClipboardJS from 'clipboard'
export default {
  name: 'MyTakeDeliveryDetail',
  data () {
    return {
      detail: {},
      expressList: [],
      expressId: '',
      sensationNum: '',
      type: ['等待商家审核', '商家审核失败', '待商家发样', '商家已发样', '已收样', '已寄回样品', '商家已收样']
    }
  },
  computed: {
    cansend: function () {
      return this.expressId === '' || this.sensationNum === ''
    }
  },
  mounted () {
    let that = this
    const clipboard1 = new ClipboardJS('.copy')
    clipboard1.on('success', function(e) {
      that.$message({ type: 'success', message: '复制成功' })
      e.clearSelection()
    })
  },
  methods: {
    async getorderInfo () {
      const res = await orderInfo({ orderId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        if (this.detail.businessExplain) this.detail.businessExplain = this.detail.businessExplain.replace(/\n/g, '<br>')
        if (this.detail.status === 5) this.getexpressList()
      }
    },
    async getexpressList () {
      const res = await expressList({})
      if (res.result === '0') {
        this.expressList = res.datas.list
      }
    },
    async sureTake () {
      const res = await receivingOrder({ orderId: this.$route.query.id })
      if (res.result === '1') {
        this.$message({ type: 'success', message: '确认收样成功，请及时寄回样品' })
        this.getorderInfo()
      }
    },
    async send () {
      const res = await sendOrder({ orderId: this.$route.query.id, sensationExpressId: this.expressId, sensationNum: this.sensationNum })
      if (res.result === '1') {
        this.$message({ type: 'success', message: '样品寄出成功，请等待商家收样' })
        this.getorderInfo()
      }
    }
  },
  created () {
    this.getorderInfo()
  }
}
</script>

<style lang="less" scoped>
  .MyTakeDeliveryDetail {
    padding-left: 42px;
    width: 933px;
    margin-bottom: 20px;
    .title {
      height: 66px;
      text-align: center;
      color: #fff;
      background:linear-gradient(270deg,rgba(253,155,255,1) 0%,rgba(254,211,211,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#FD9BFF", endColorstr="#FED3D3", gradientType="1");
      font-size: 25px;
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
    .status {
      width:97px;
      height:27px;
      line-height: 27px;
      text-align: center;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      border-radius:4px;
      margin: 31px 0;
      font-size: 12px;
      color: #fff;
    }
    .item {
      padding: 16px 20px;
      // margin-bottom: 22px;
      background-color: #fff;
      position: relative;
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
          position: relative;
          .name-text {
            width: calc(100% - 100px);
            font-size: 14px;
            color: #666;
            line-height: 19px;
            margin-top: 12px;
            margin-bottom: 14px;
          }
          .copy {
            cursor: pointer;
            position: absolute;
            top: 50%;
            right: 0px;
            transform: translate(0, -50%);
            width: 97px;
            height: 27px;
            line-height: 27px;
            text-align: center;
            background: linear-gradient(90deg, #ac7ef4 0%, #df56e1 100%);
            filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
            border-radius: 4px;
            font-size: 12px;
            color: #fff;
          }
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
      .achievements {
        position: absolute;
        right: 25px;
        bottom: 43px;
        .achievements-item {
          display: inline-block;
          vertical-align: top;
          width: 116px;
          height: 79px;
          box-sizing: border-box;
          border: 1px solid #AC7EF4;
          color: #AC7EF4;
          text-align: center;
          div {
            font-size: 24px;
            line-height: 31px;
            margin: 11px 0 7px;
          }
          span {
            font-size: 12px;
          }
          &:last-child {
            margin-left: 11px;
            border: 1px solid #DF56E1;
            color: #DF56E1;
          }
        }
      }
    }
  }
  .TakeDelivery {
    .status {
      margin: 18px 0;
    }
    .address {
      border-radius: 2px;
      background-color: #fff;
      height: 104px;
      font-size: 14px;
      color: #666;
      margin-top: 24px;
      padding-left: 31px;
      margin-bottom: 27px;
      span {
        line-height: 19px;
      }
      div {
        padding: 25px 0 17px;
      }
    }
    .explain {
      background-color: #fff;
      padding: 30px 23px;
      margin-bottom: 27px;
      font-size: 14px;
      line-height: 22px;
    }
    .send-back {
      select {
        border: none;
        outline: none;
        box-sizing: border-box;
        width: 200px;
        height: 44px;
        margin-right: 10px;
        background-color: #fff;
        padding-left: 20px;
        font-size: 14px;
        color: #666;
        appearance: none;
        line-height: 1;
        background: #fff url(../assets/img/PC/select.svg) 96% 50% no-repeat;
      }
      input {
        font-size: 14px;
        border: none;
        outline: none;
        box-sizing: border-box;
        width: 200px;
        height: 44px;
        margin-right: 10px;
        background-color: #fff;
        padding-left: 20px;
        color: #666;
      }
      .send {
        display: inline-block;
        width:97px;
        height:44px;
        line-height: 44px;
        text-align: center;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
        border-radius:4px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        &.active {
          cursor: not-allowed;
          background: #cccccc;
          filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#cccccc", endColorstr="#cccccc", gradientType="1");
        }
      }
    }
  }
  .send-info {
    span:nth-child(1) {
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 44px;
      line-height: 44px;
      margin-right: 10px;
      background-color: #fff;
      padding-left: 20px;
      font-size: 14px;
      color: #666;
    }
    span:nth-child(2) {
      font-size: 14px;
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 44px;
      margin-right: 10px;
      background-color: #fff;
      padding-left: 20px;
      line-height: 44px;
      color: #666;
    }
  }
  .sureTake {
    margin-top: 20px;
    width:97px;
    height:44px;
    line-height: 44px;
    text-align: center;
    background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
    border-radius:4px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
</style>
