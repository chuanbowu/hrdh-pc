<template>
  <div class="SensationsDetail">
    <div class="detail">
      <div class="headimg"><img :src="baseUrl+detail.headPic" alt=""></div>
      <div class="detailInfo">
        <p class="name">{{detail.nickName}}</p>
        <div class="info">
          <ul class="info-1">
            <li>
              <span>{{detail.followersNum}}</span>
              <p>粉丝数量</p>
            </li>
            <li>
              <span>{{detail.totalLikedNum}}</span>
              <p>获赞总量</p>
            </li>
            <li>
              <span>{{detail.singleHighestNum}}</span>
              <p>单条最高获赞</p>
            </li>
          </ul>
          <div class="info-2">
            <span>{{detail.followersSpreadType===1?'男女平衡':detail.followersSpreadType===1?'男粉较多':'女粉较多'}}</span>
            <span>{{detail.provinceName}}</span>
          </div>
          <div class="info-3">
            <span class="label">推广方式：</span><span class="extension-item" :class="detail.extensionType.indexOf('1')>-1?'active':''">橱窗广告</span><span class="extension-item" :class="detail.extensionType.indexOf('2')>-1?'active':''">原创视频+发布</span><span class="extension-item" :class="detail.extensionType.indexOf('3')>-1?'active':''">CPS分成</span><span class="extension-item" :class="detail.extensionType.indexOf('4')>-1?'active':''">直播带货</span>
          </div>
        </div>
        <div class="btn">
          <div @click="openagentList=true">咨询经纪人</div>
          <div @click="openagentList=true">获取报价</div>
        </div>
      </div>
    </div>
    <div class="procedure">
      <h5>红人概况</h5>
      <div v-html="detail.sensationSurvey"></div>
    </div>
    <div class="procedure" style="padding: 0">
      <!-- <h5>交易流程</h5> -->
      <img :src="require('@/assets/img/del.png')" alt="">
    </div>
    <div class="procedure">
      <h5>常见问题</h5>
      <img :src="require('@/assets/img/problem.png')" alt="">
      <!-- <div class="question" v-for="(item, index) in problemList" :key="index">
        <p>1.{{item.askContent}}</p>
        <p>{{item.answerContent}}</p>
      </div> -->
    </div>
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
import { sensationDetails, problemList, agentList } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'SensationsDetail',
  data () {
    return {
      baseUrl: baseUrl,
      detail: {
        extensionType: ''
      },
      problemList: [],
      openagentList: false,
      list: []
    }
  },
  methods: {
    async getsensationDetails () {
      const res = await sensationDetails({ sensationId: this.$route.query.id })
      if (res.result === '0') {
        this.detail = res.datas
        this.detail.sensationSurvey = this.detail.sensationSurvey.replace(/\n/g, '<br>')
      }
    },
    async getproblemList () {
      const res = await problemList({})
      if (res.result === '0') {
        this.problemList = res.datas.list
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
    this.getsensationDetails()
    // this.getproblemList()
    this.getagentList()
  }
}
</script>

<style lang="less" scoped>
  .SensationsDetail {
    padding-top: 24px;
    margin: 0 auto;
  }
  .detail {
    padding: 29px;
    background-color: #fff;
    margin-bottom: 24px;
    .headimg {
      width: 300px;
      height: 300px;
      overflow: hidden;
      position: relative;
      display: inline-block;
      margin-right: 27px;
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
      width: 607px;
      .name {
        font-size: 28px;
        color: #DF56E1;
        line-height: 37px;
        margin-bottom: 14px;
      }
      .info {
        background-color: #F2F2F2;
        border-radius: 18px;
        padding: 19px 17px;
        .info-1 {
          margin-bottom: 36px;
          li {
            display:inline-block;
            vertical-align: top;
            width: 120px;
            span {
              font-size: 20px;
              color: #AC7EF4;
              line-height: 26px;
            }
            p {
              font-size: 12px;
              line-height: 16px;
              color: #666;
              margin-top: 4px;
            }
          }
        }
        .info-2 {
          margin-bottom: 14px;
          span {
            color: #DF56E1;
            font-size: 16px;
            line-height: 21px;
            padding-right: 10px;
          }
        }
        .info-3 {
          .label {
            font-size: 12px;
            line-height: 20px;
            color: #666;
            display: inline-block;
            vertical-align: top;
          }
          .extension-item {
            display: inline-block;
            box-sizing: border-box;
            vertical-align: top;
            font-size: 12px;
            color: #666;
            height: 20px;
            line-height: 20px;
            border-radius: 20px;
            padding: 0 8px;
            margin-right: 10px;
            border: 1px solid #DF56E1;
            &.active {
              color: #fff;
              border: none;
              background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
              filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
            }
          }
        }
      }
      .btn {
        margin-top: 27px;
        div:nth-child(1) {
          box-sizing: border-box;
          height: 42px;
          border: 1px solid #AC7EF4;
          text-align: center;
          line-height: 42px;
          color: #AC7EF4;
          font-size: 12px;
          width: 189px;
          display: inline-block;
          vertical-align: top;
          margin-right: 20px;
          cursor: pointer;
        }
        div:nth-child(2) {
          display: inline-block;
          vertical-align: top;
          width: 189px;
          height:42px;
          text-align: center;
          line-height: 42px;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          background-color: #DF56E1;
        }
      }
    }
  }
  .procedure {
    min-height: 212px;
    background-color: #fff;
    border-radius: 2px;
    padding: 19px 0;
    margin-bottom: 24px;
    >img {
      width: 100%;
    }
    >div {
      font-size: 12px;
      line-height: 20px;
      padding: 0 35px;
    }
    .question {
      padding: 5px 0 5px;
    }
    >.html {
      text-align: center;
      padding: 0 35px;
    }
    h5 {
      padding: 0 35px 15px;
      font-size: 14px;
      color: #666;
      line-height: 19px;
      border-bottom: 2px dashed #DF56E2;
      margin-bottom: 10px;
    }
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
