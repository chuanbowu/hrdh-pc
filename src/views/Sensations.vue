<template>
  <div class="Sensations">
    <div class="swiper-box">
      <div class="left"><img :src="require('@/assets/img/left.png')" alt=""></div>
      <div class="swiper-container2">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in sensationRecommend" :key="index"><img :src="baseUrl+item.headPic" alt="" @click="$router.push('/SensationsDetail?id='+item.sensationId)"></div>
        </div>
      </div>
      <div class="right"><img :src="require('@/assets/img/right.png')" alt=""></div>
    </div>
    <div class="procedure">
      <img :src="require('@/assets/img/sessionIn.png')" alt="">
    </div>
    <div class="Handsome-selection">
      <div class='classify'>
        <label>内容分类</label>
        <div class="classify-list">
          <div class="nav-item" @click="changeClassify('type1', item.type)" v-for="(item, index) in classify1" :key="index" :class="contentType === item.type ? 'active' : ''">{{item.name}}</div>
        </div>
      </div>
      <div class='classify'>
        <label>粉丝数量</label>
        <div class="classify-list">
          <div class="nav-item" @click="changeClassify('type2', item.type)" v-for="(item, index) in classify2" :key="index" :class="followersType === item.type ? 'active' : ''">{{item.name}}</div>
        </div>
      </div>
      <div class='classify'>
        <label>粉丝分布</label>
        <div class="classify-list">
          <div class="nav-item" @click="changeClassify('type3', item.type)" v-for="(item, index) in classify3" :key="index" :class="followersSpreadType === item.type ? 'active' : ''">{{item.name}}</div>
        </div>
      </div>
      <div class='classify'>
        <label>获赞数量</label>
        <div class="classify-list">
          <div class="nav-item" @click="changeClassify('type4', item.type)" v-for="(item, index) in classify4" :key="index" :class="totalLikedType === item.type ? 'active' : ''">{{item.name}}</div>
        </div>
      </div>
      <div class='classify'>
        <label>所在省份</label>
        <div class="classify-list">
          <div class="nav-item" @click="changeClassify('type5', item.type)" v-for="(item, index) in classify5" :key="index" :class="provinceType === item.type ? 'active' : ''">{{item.name}}</div>
        </div>
      </div>
      <div class='classify'>
        <label>推广方式</label>
        <div class="classify-list">
          <div class="nav-item" @click="changeClassifys(item.type)" v-for="(item, index) in classify6" :key="index" :class="extensionType.indexOf(item.type) > -1 ||  extensionType.toString()===item.type? 'active' : ''">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in sensationSearchList" :key="index">
        <div class="img" @click="$router.push(`/SensationsDetail?id=${item.sensationId}`)">
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
      <div class="nodata" v-if="sensationSearchList.length===0" style="text-align: center;line-height:200px;color:#DF56E1;font-size: 13px;font-weight:700">
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
import Swiper from 'swiper'
import pager from '@c/Pager'
import { baseUrl } from '@/utils/commom'
import { sensationRecommend, sensationList, agentList } from '@/api'
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
      sensationRecommend: [],
      contentType: '',
      followersType: '',
      followersSpreadType: '',
      totalLikedType: '',
      provinceType: '',
      extensionType: [],
      page: { totalPage: 12, currentPage: 1 },
      classify1: [{ type: '', name: '全部内容' }, { type: 1, name: '搞笑娱乐' }, { type: 2, name: '萌宠动漫' }, { type: 3, name: '情感励志' }, { type: 4, name: '教育知识' }, { type: 5, name: '母婴玩具' }, { type: 6, name: '颜值才艺' }, { type: 7, name: '健康养生' }, { type: 8, name: '游戏电竞' }, { type: 9, name: '汽车周边' }, { type: 10, name: '科技生活' }, { type: 11, name: '新闻媒体' }, { type: 12, name: '美妆护肤' }, { type: 13, name: '旅游攻略' }, { type: 14, name: '美食攻略' }, { type: 15, name: '教程技术' }, { type: 16, name: '综合种草' }, { type: 17, name: '服装穿搭' }, { type: 18, name: '家居百货' }, { type: 19, name: '剧情故事' }, { type: 20, name: '音乐' }, { type: 21, name: '时尚' }, { type: 22, name: '创意' }],
      classify2: [{ type: '', name: '全部' }, { type: 1, name: '10W以内' }, { type: 2, name: '10W-30W' }, { type: 3, name: '30W-100W' }, { type: 4, name: '100W-300W' }, { type: 5, name: '300W-500W' }, { type: 6, name: '500W以上' }],
      classify3: [{ type: '', name: '全部' }, { type: 1, name: '男女平衡' }, { type: 2, name: '男粉较多' }, { type: 3, name: '女粉较多' }],
      classify4: [{ type: '', name: '全部' }, { type: 1, name: '10W以内' }, { type: 2, name: '10W-30W' }, { type: 3, name: '30W-100W' }, { type: 4, name: '100W-300W' }, { type: 5, name: '300W-500W' }, { type: 6, name: '500W以上' }],
      classify5: [{ type: '', name: '全部' }, { type: 110000, name: '北京市' }, { type: 120000, name: '天津市' }, { type: 130000, name: '河北省' }, { type: 140000, name: '山西省' }, { type: 210000, name: '辽宁省' }, { type: 220000, name: '吉林省' }, { type: 230000, name: '黑龙江省' }, { type: 310000, name: '上海市' }, { type: 320000, name: '江苏省' }, { type: 330000, name: '浙江省' }, { type: 340000, name: '安徽省' }, { type: 350000, name: '福建省' }, { type: 360000, name: '江西省' }, { type: 370000, name: '山东省' }, { type: 410000, name: '河南省' }, { type: 420000, name: '湖北省' }, { type: 430000, name: '湖南省' }, { type: 440000, name: '广东省' }, { type: 450000, name: '广西壮族自治区' }, { type: 460000, name: '海南省' }, { type: 500000, name: '重庆市' }, { type: 510000, name: '四川省' }, { type: 520000, name: '贵州省' }, { type: 530000, name: '云南省' }, { type: 540000, name: '西藏自治区' }, { type: 610000, name: '陕西省' }, { type: 620000, name: '青海省' }, { type: 630000, name: '宁夏回族自治区' }, { type: 650000, name: '新疆维吾尔族自治区' }, { type: 710000, name: '台湾省' }, { type: 810000, name: '香港特别行政区' }, { type: 31, name: '海外' }, { type: 620000, name: '甘肃省' }, { type: 150000, name: '内蒙古自治区' }],
      classify6: [{ type: '', name: '全部' }, { type: 1, name: '橱窗广告' }, { type: 2, name: '原创视频+发布' }, { type: 3, name: 'CPS分成' }, { type: 4, name: '直播带货' }]
    }
  },
  methods: {
    changeClassify (index, type) {
      this.contentType = ''
      this.followersType = ''
      this.followersSpreadType = ''
      this.totalLikedType = ''
      this.provinceType = ''
      this.extensionType = []
      this.page.currentPage = 1
      if (index === 'type1') this.contentType = type
      if (index === 'type2') this.followersType = type
      if (index === 'type3') this.followersSpreadType = type
      if (index === 'type4') this.totalLikedType = type
      if (index === 'type5') this.provinceType = type
      this.getsensationList()
    },
    changeClassifys (type) {
      this.contentType = ''
      this.followersType = ''
      this.followersSpreadType = ''
      this.totalLikedType = ''
      this.provinceType = ''
      if (this.extensionType.indexOf(type) > -1) {
        this.extensionType.splice(this.extensionType.indexOf(type), 1)
      } else {
        this.extensionType.push(type)
      }
      if (!type) this.extensionType = []
      this.getsensationList()
    },
    changepage (page) {
      console.log(page)
      this.page.currentPage = page
      if (this.$route.query.keywords) this.getsensationSearchList()
      else this.getsensationList()
    },
    async getsensationRecommend () {
      const res = await sensationRecommend({})
      if (res.result === '0') {
        this.sensationRecommend = res.datas.list
        this.$nextTick(() => {
          new Swiper ('.swiper-container2', {
            loop: true,
            allowTouchMove: false,
            slidesPerView: 9,
            spaceBetween: 20,
            // 如果需要分页器
            autoplay: {
              delay: 2000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    async getsensationList () {
      const res = await sensationList({ contentType: this.contentType, followersType: this.followersType, followersSpreadType: this.followersSpreadType, totalLikedType: this.totalLikedType, provinceType: this.provinceType, extensionType: this.extensionType.sort().toString(), pageNum: this.page.currentPage, pageSize: 12 })
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
    this.getsensationRecommend()
    this.getsensationList()
  }
}
</script>

<style lang="less" scoped>
  .Sensations {
    box-sizing: border-box;
    padding-top: 24px;
    margin: 0 auto;
  }
  .swiper-box {
    padding: 36px 0;
    height: 160px;
    background-color: #fff;
    border-radius: 2px;
    // background-color: #F7F2FF;
    box-sizing: border-box;
    margin-bottom: 24px;
    .swiper-container2 {
      width: calc(100% - 160px);
      overflow: hidden;
      height: 88px;
      display: inline-block;
      vertical-align: top;
      .swiper-slide {
        text-align: center;
        img {
          width: 88px;
          border-radius: 50%;
          user-select: none;
        }
      }
    }
    .left {
      display: inline-block;
      vertical-align: top;
      height: 88px;
      width: 80px;
      position: relative;
      img {
        width: 19px;
        position: absolute;
        top: 50%;
        left: 23px;
        transform: translate(0, -50%);
      }
    }
    .right {
      display: inline-block;
      vertical-align: top;
      height: 88px;
      position: relative;
      width: 80px;
      img {
        width: 19px;
        position: absolute;
        top: 50%;
        left: 23px;
        transform: translate(0, -50%);
      }
    }
  }
  .procedure {
    height: 225px;
    background-color: #fff;
    margin-bottom: 24px;
    img {
      width: 100%;
    }
  }
  .Handsome-selection {
    background-color: #fff;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 24px;
    .classify {
      label {
        display: inline-block;
        margin-right: 15px;
        vertical-align: top;
        line-height: 23px;
        font-size: 16px;
        color: #000;
      }
    }
    .classify-list {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 79px);
      .nav-item {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #666;
        height: 23px;
        line-height: 23px;
        border-radius: 4px;
        padding: 0 8px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        &:hover, &.active {
          color: #fff;
          background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
          filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
        }
      }
    }
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
