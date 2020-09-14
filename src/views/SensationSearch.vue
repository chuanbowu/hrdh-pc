<template>
  <div class="Sensations">
    <div class="list">
      <div class="item" v-for="(item, index) in sensationSearchList" :key="index">
        <div class="img">
          <img :src="baseUrl+item.headPic" alt="">
        </div>
        <p class="name">{{item.nickName}}</p>
        <p class="fans">粉丝：{{item.followersNum}}人</p>
        <div class="info">
          <div>
            <div>{{item.totalLikedNum}}</div>
            <span>获赞总量</span>
          </div>
          <div>
            <div>{{item.singleHighestNum}}</div>
            <span>单条最高获赞</span>
          </div>
        </div>
        <div class="info" style="margin-top:15px">
          <div>
            <div>{{item.followersSpreadType===1?'男女平衡':item.followersSpreadType===2?'男粉较多':'女粉较多'}}</div>
            <span>粉丝偏向</span>
          </div>
          <div>
            <div>{{item.provinceName}}</div>
            <span>所在地区</span>
          </div>
        </div>
        <div class="btn">
          <div @click="openagentList=true">咨询经纪人</div>
          <div @click="$router.push(`/SensationsDetail?id=${item.sensationId}`)">查看详情</div>
        </div>
      </div>
      <div class="nodata" v-if="sensationSearchList.length===0" style="text-align: center;line-height:400px;color:#DF56E1;font-size: 13px;font-weight:700">
        “没有相关结果”
      </div>
    </div>
    <pager v-if="sensationSearchList.length>0" class="pager" @changepage="changepage" :page="page" />
    <transition name="fade">
      <div v-show="openagentList" class="agent-box">
        <div class="agent-con">
          <div class="rotate1"></div>
          <div class="rotate2"></div>
          <div class="rotate3"></div>
          <div class="rotate4"></div>
          <div class="con">
            <i class="el-icon-close close" @click="openagentList=false"></i>
            <div class="scan-title"><span>扫一扫添加经纪人微信</span></div>
            <div class="code" v-for="(item, index) in list" :key="index">
              <img :src="baseUrl + item.agentPic" alt="">
              <p>{{item.agentName}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import pager from '@c/Pager'
import { baseUrl } from '@/utils/commom'
import { sensationList, sensationSearchList, agentList } from '@/api'
export default {
  name: 'Sensations',
  components: {
    pager
  },
  data () {
    return {
      baseUrl: baseUrl,
      openagentList: false,
      list: [],
      sensationSearchList: [],
      page: { totalPage: 12, currentPage: 1 }
    }
  },
  methods: {
    changepage (page) {
      this.page.currentPage = page
      if (this.$route.query.keywords) this.getsensationSearchList()
      else this.getsensationList()
    },
    async getsensationList () {
      const res = await sensationList({ contentType: '', followersType: '', followersSpreadType: '', totalLikedType: '', provinceType: '', extensionType: '', pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.sensationSearchList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async getsensationSearchList () {
      const res = await sensationSearchList({ nickName: this.$route.query.keywords, pageNum: this.page.currentPage, pageSize: 12 })
      if (res.result === '0') {
        this.sensationSearchList = res.datas.list
        this.page.totalPage = Math.ceil(res.datas.totalRow / 12)
      }
    },
    async getagentList () {
      const res = await agentList({})
      if (res.result === '0') {
        this.list = res.datas.list
      }
    }
  },
  created () {
    this.getagentList()
    if (this.$route.query.keywords) {
      this.getsensationSearchList()
    } else {
      this.getsensationList()
    }
  },
  watch: {
    '$route.query.keywords': function (val) {
      if (val) this.getsensationSearchList()
      else this.getsensationList()
    }
  }
}
</script>

<style lang="less" scoped>
  .Sensations {
    box-sizing: border-box;
    padding-top: 24px;
    margin: 0 auto;
  }
  .list {
    .item {
      width: 260px;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 18px;
      margin-right: 40px;
      margin-bottom: 24px;
      display: inline-block;
      vertical-align: top;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .img {
        width: 136px;
        height: 136px;
        overflow: hidden;
        position: relative;
        margin: 0 auto 6px;
        img {
          position: absolute;
          width: 100%;
          min-height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
      }
      .name {
        font-size: 16px;
        color: #000;
        text-align: center;
        line-height: 21px;
      }
      .fans {
        font-size: 14px;
        color: #666;
        text-align: center;
        line-height: 19px;
        margin-bottom: 10px;
      }
      .info {
        >div {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          text-align: center;
          font-size: 12px;
          color: #666;
          div {
            line-height: 20px;
          }
        }
      }
      .btn {
        margin-top: 30px;
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
  }
  .pager {
    padding: 16px 0 40px;
  }
  .agent-box {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    z-index: 1;
    .agent-con {
      position: absolute;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border: 5px solid rgba(223,86,225,.5);
    }
    .con {
      position: relative;
      z-index: 10;
      width: 550px;
      margin: 35px auto;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 20px;
      text-align: center;
      .close {
        position: absolute;
        top: -20px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
        color: #666;
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
          margin-top: 10px;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
