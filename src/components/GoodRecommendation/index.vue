<template>
  <div class="item">
    <div class="img" @click.stop="$router.push(`/GoodsDetail?id=${item.goodsId}`)">
      <img :src="baseUrl+item.mainPic" alt="">
    </div>
    <p class="name" @click.stop="$router.push(`/GoodsDetail?id=${item.goodsId}`)">{{item.businessTitle}}</p>
    <div class="return">拿货价<span>{{item.goodsPrice}}</span>元</div>
    <div class="btn">
      <div @click.stop="getNow">立即拿货</div>
      <div @click="$router.push(`/GoodsDetail?id=${item.goodsId}`)">查看详情</div>
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
import { baseUrl } from '@/utils/commom'
import { getToken } from '@/utils/auth'
import { takeDeliveryGoodsInfo } from '@/api'
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
      baseUrl: baseUrl,
      detail: {},
      dialogTableVisible: false
    }
  },
  methods: {
    async getNow () {
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
      } else if (this.detail.customerPhone) {
        this.dialogTableVisible = true
      } else {
        const res = await takeDeliveryGoodsInfo({ goodsId: this.item.goodsId })
        if (res.result === '0') {
          this.detail = res.datas
          this.dialogTableVisible = true
        }
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
    padding-top: 20px;
    .img {
      width: 220px;
      height: 220px;
      overflow: hidden;
      position: relative;
      margin: 0 auto 8px;
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
      font-weight: 700;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 38px;
      margin-bottom: 15px;
      padding: 0 20px;
    }
    .return {
      font-size: 14px;
      color: #666;
      margin-bottom: 30px;
      line-height: 31px;
      padding: 0 20px;
      span {
        font-size: 24px;
        color: #FF5000;
      }
    }
    .btn {
      div:nth-child(1) {
        box-sizing: border-box;
        height: 37px;
        border: 1px solid #AC7EF4;
        text-align: center;
        line-height: 37px;
        color: #AC7EF4;
        font-size: 12px;
        width: 50%;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
      }
      div:nth-child(2) {
        display: inline-block;
        vertical-align: top;
        width: 50%;
        height:37px;
        text-align: center;
        line-height: 37px;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
        background-color: #DF56E1;
      }
    }
  }
</style>
