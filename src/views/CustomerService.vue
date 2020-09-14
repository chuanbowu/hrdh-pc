<template>
  <div class="CustomerService">
    <div class="title"><span><img :src="require('@/assets/img/PC/customer.png')" alt="">联系客服</span></div>
    <div class="scan-code">
      <div class="con">
        <div class="scan-title"><span>扫一扫添加客服微信</span></div>
        <div class="code" v-for="(item, index) in list" :key="index">
          <img :src="baseUrl + item.customerPic" alt="">
          <p>{{item.customerName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/commom'
import { customerList } from '@/api'
export default {
  name: 'CustomerService',
  data () {
    return {
      list: [],
      baseUrl: baseUrl
    }
  },
  methods: {
    async getcustomerList () {
      const res = await customerList({})
      if (res.result === '0') {
        this.list = res.datas.list
      }
    }
  },
  created () {
    this.getcustomerList()
  }
}
</script>

<style lang="less" scoped>
  .CustomerService {
    padding-left: 42px;
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
        width: 39px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
      }
    }
    .scan-code {
      width: 933px;
      .con {
        width: 550px;
        margin: 35px auto;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: 54px;
        text-align: center;
      }
    }
    .scan-title {
      height: 22px;
      line-height: 22px;
      text-align: center;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 87px;
        height: 1px;
        background-color: #DF56E1;
        left: 65px;
        top: 50%;
        transform: translate(0, -50%);
      }
      &::after {
        content: '';
        position: absolute;
        width: 87px;
        height: 1px;
        background-color: #DF56E1;
        right: 65px;
        top: 50%;
        transform: translate(0, -50%);
      }
      span {
        font-size: 17px;
        color: #DF56E1;
      }
    }
    .code {
      display: inline-block;
      vertical-align: top;
      margin: 30px;
      img {
        width: 192px;
      }
      p {
        text-align: center;
        font-size: 17px;
        color: #DF56E1;
      }
    }
  }
</style>
