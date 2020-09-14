<template>
  <div class="WithdrawalRecord">
    <div class="title"><span><img :src="require('@/assets/img/PC/WithdrawalRecord.png')" alt="">提现记录</span></div>
    <div class="con">
      <table class="table">
        <thead>
          <tr>
            <th><div class="cell">提现时间</div></th>
            <th width="580"><div class="cell">提现状态</div></th>
            <th><div class="cell">金额(元)</div></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td><div class="cell">{{item.withdrawDate}}</div></td>
            <td><div class="cell">{{item.status==1?'提现中':item.status==2?'已提现':'提现失败'}}</div></td>
            <td><div class="cell">{{item.moneyPrice}}</div></td>
          </tr>
          <tr v-if="list.length===0">
            <td colspan="3"><div class="nodata">暂无数据</div></td>
          </tr>
        </tbody>
      </table>
      <pager v-if="list.length>0" class="pager" @changepage="changepage" :page="page" />
    </div>
  </div>
</template>

<script>
import pager from '@c/Pager'
import { sensationWithdrawInfoList } from '@/api'
export default {
  name: 'WithdrawalRecord',
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
      this.getsensationWithdrawInfoList()
    },
    async getsensationWithdrawInfoList () {
      const res = await sensationWithdrawInfoList({ pageNum: this.page.currentPage, pageSize: 10 })
      if (res.result === '0') {
        this.list = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 10)
      }
    }
  },
  created () {
    this.getsensationWithdrawInfoList()
  }
}
</script>

<style lang="less" scoped>
  .WithdrawalRecord {
    padding-left: 42px;
    width: 911px;
    margin-bottom: 44px;
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
      padding: 0 48px;
      background-color: #fff;
    }
    .table {
      width: 100%;
      thead {
        border-bottom: 1px solid #FFE5E5;
        th {
          font-size: 16px;
          color: #F16363;
          text-align: center;
          .cell {
            padding: 32px 0 10px;
          }
        }
      }
      tbody {
        tr {
          border-bottom: 1px solid #FFE5E5;
          td {
            text-align: center;
            &:nth-child(3) .cell {
              color: #EB0000;
              font-weight: 700;
            }
          }
          .cell {
            line-height: 57px;
            font-size: 16px;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .nodata {
            text-align: center;
            line-height: 300px;
            font-size: 16px;
            color: #999;
          }
        }
      }
    }
    .page {
      padding: 30px 0;
      text-align: center;
      div {
        display: inline-block;
        box-sizing: border-box;
        width:82px;
        height:38px;
        background:rgba(255,255,255,1);
        border-radius:1px;
        border:1px solid rgba(223,86,225,1);
        font-size: 16px;
        color: #DF56E1;
        line-height: 39px;
        text-align: center;
        &:first-child {
          margin-right: 150px;
        }
      }
    }
  }
</style>
