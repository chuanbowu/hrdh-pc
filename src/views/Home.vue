<template>
  <div class="Home">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :style="`background-image:url(${baseUrl + item.advertPic})`" v-for="(item, index) in advertList" :key="index" @click="go(item)"></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <ul class="recomend">
      <li v-for="(item, index) in advertisementList" :key="index" @click="go(item)">
        <img :src="item.mainPic.indexOf('https://')>-1?item.mainPic:baseUrl+item.mainPic" alt="">
        <!-- <p>{{item.businessTitle}}</p> -->
      </li>
      <li>
        <div class="swiper-container1">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in samplingList" :key="index">{{item.content}}</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="Sensation">
      <div class="search-box">
        <h5>传播物</h5>
        <h5>全国网红都在传播物</h5>
        <div class="search-input">
          <input type="text" v-model="keywords" placeholder="找红人" @keyup.enter="find">
          <img @click="find" :src="require('@/assets/img/search.png')" alt="">
        </div>
      </div>
      <div class="swiper-box">
        <div class="left"><img :src="require('@/assets/img/left.png')" alt=""></div>
        <div class="swiper-container3">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in sensationRecommend" :key="index"><img :src="baseUrl+item.headPic" alt="" @click="$router.push('/SensationsDetail?id='+item.sensationId)"></div>
          </div>
        </div>
        <div class="right"><img :src="require('@/assets/img/right.png')" alt=""></div>
      </div>
    </div>
    <div class="procedure">
      <img :src="require('@/assets/img/take.png')" alt="">
    </div>
    <div class="title">
      <img :src="require('@/assets/img/money.png')" alt="">
      <span>返佣推荐</span>
      <img :src="require('@/assets/img/money.png')" alt="">
    </div>
    <tab-nav @changeType="(data)=>{type1 = data}"/>
    <!-- <div class="nav-list">
      <div class="nav-item" @click="type1=item.type" v-for="(item, index) in nav" :key="index" :class="type1 === item.type ? 'active' : ''">{{item.name}}</div>
    </div> -->
    <div class="list">
      <return-goods class="goods" v-for="(item, index) in commissionRecommendList" :item="item" :key="index" />
    </div>
    <div class="title">
      <img style="width: 33px" :src="require('@/assets/img/Recommend.png')" alt="">
      <span>拿货推荐</span>
      <img style="width: 33px" :src="require('@/assets/img/Recommend.png')" alt="">
    </div>
    <tab-nav @changeType="(data)=>{type2 = data}"/>
    <!-- <div class="nav-list">
      <div class="nav-item" @click="type2=item.type" v-for="(item, index) in nav" :key="index" :class="type2 === item.type ? 'active' : ''">{{item.name}}</div>
    </div> -->
    <div class="list">
      <good-recommendation class="goods" v-for="(item, index) in takeDeliveryRecommendList" :item="item" :key="index" />
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import tabNav from '@c/tabNav'
import returnGoods from '@c/ReturnCommission'
import GoodRecommendation from '@c/GoodRecommendation'
import { advertList, samplingPropagandaList, advertisementList, sensationRecommend, commissionRecommendList, takeDeliveryRecommendList } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'Home',
  data () {
    return {
      baseUrl: baseUrl,
      advertList: [],
      advertisementList: [],
      sensationRecommend: [],
      commissionRecommendList: [],
      takeDeliveryRecommendList: [],
      type1: '',
      type2: '',
      keywords: '',
      samplingList: ['135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！', '135**1234的红人取样成功！']
    }
  },
  components: {
    returnGoods,
    GoodRecommendation,
    tabNav
  },
  methods: {
    find () {
      this.$router.push(`SensationSearch?keywords=${this.keywords}`)
    },
    async getAdvertList () {
      const res = await advertList({})
      if (res.result === '0') {
        this.advertList = res.datas.list
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            observer: true,
            observeParents: true,
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },
            autoplay: {
              delay: 3000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    async getSamplingPropagandaList () {
      const res = await samplingPropagandaList({})
      if (res.result === '0') {
        this.samplingList = res.datas.list
        this.$nextTick(() => {
          new Swiper('.swiper-container1', {
            loop: true,
            direction: 'vertical',
            allowTouchMove: false,
            slidesPerView: 4,
            centeredSlides: true,
            grabCursor: true,
            // 如果需要分页器
            autoplay: {
              delay: 2000, // 时间 毫秒
              disableOnInteraction: false // 用户操作之后是否停止自动轮播
            }
          })
        })
      }
    },
    go (item) {
      if (item.type === 2) {
        this.$router.push(`/GoodsDetail?id=${item.goodsId}`)
      } else {
        this.$router.push(`/ReturnCommissionDetail?id=${item.goodsId}`)
      }
    },
    async getadvertisementList () {
      const res = await advertisementList({})
      if (res.result === '0') {
        this.advertisementList = res.datas.list
      }
    },
    async getsensationRecommend () {
      const res = await sensationRecommend({})
      if (res.result === '0') {
        this.sensationRecommend = res.datas.list
        this.$nextTick(() => {
          new Swiper('.swiper-container3', {
            loop: true,
            allowTouchMove: false,
            slidesPerView: 8,
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
    async getcommissionRecommendList () {
      const res = await commissionRecommendList({ typeId: this.type1 })
      if (res.result === '0') {
        this.commissionRecommendList = res.datas.list
      }
    },
    async gettakeDeliveryRecommendList () {
      const res = await takeDeliveryRecommendList({ typeId: this.type2 })
      if (res.result === '0') {
        this.takeDeliveryRecommendList = res.datas.list
      }
    }
  },
  created () {
    this.getAdvertList()
    this.getadvertisementList()
    this.getsensationRecommend()
    this.getSamplingPropagandaList()
    this.getcommissionRecommendList()
    this.gettakeDeliveryRecommendList()
  },
  watch: {
    type1: function (val) {
      this.getcommissionRecommendList()
    },
    type2: function (val) {
      this.gettakeDeliveryRecommendList()
    }
  }
}
</script>

<style lang="less" scoped>
  .Home {
    padding-top: 24px;
  }
  .swiper-container {
    height: 318px;
    margin-bottom: 24px;
    .swiper-slide {
      background-size: 100% 100%;
    }
  }
  .recomend {
    margin-bottom: 24px;
    li {
      display: inline-block;
      width: 275px;
      height: 255px;
      position: relative;
      margin-right: 20px;
      overflow: hidden;
      box-sizing: border-box;
      vertical-align: top;
      &:last-child {
        padding: 35px 0;
        margin-right: 0;
      }
      img {
        position: absolute;
        width: 100%;
        min-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      p {
        position: absolute;
        bottom: 7px;
        width: calc(100% - 30px);
        padding: 0 15px;
        font-size: 25px;
        color: #fff;
        line-height: 33px;
      }
    }
  }
  .swiper-container1 {
    height: 185px;
    overflow: hidden;
    .swiper-slide {
      font-size: 12px;
      color: #DF56E1;
      text-align: center;
      user-select: none;
    }
  }
  .Sensation {
    padding: 5px;
    box-sizing: border-box;
    background-color: #fff;
    height: 160px;
    margin-bottom: 24px;
    overflow: hidden;
    .search-box {
      width: 262px;
      height: 150px;
      background-color: #F1F1F1;
      padding: 26px 15px 28px;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      h5 {
        font-size: 16px;
        color: #2B2B2B;
      }
      h5:nth-child(1) {
        margin-bottom: 10px;
      }
      h5:nth-child(2) {
        margin-bottom: 12px;
      }
      .search-input {
        width: 231px;
        border: 1px solid #DDDDDD;
        position: relative;
        input {
          width: 100%;
          border: none;
          outline: none;
          box-sizing: border-box;
          background-color: transparent;
          font-size: 16px;
          line-height: 1;
          padding: 8px 40px 8px 10px;
          color: #6E6D6E;
          &::-webkit-input-placeholder{
            color: #6E6D6E;
          }
          &::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color: #6E6D6E;
          }
          &::-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color: #6E6D6E;
          }
        }
        img {
          position: absolute;
          top: 50%;
          right: 22px;
          transform: translate(0, -50%);
          width: 17px;
          cursor: pointer;
        }
      }
    }
    .swiper-box {
      width: calc(100% - 262px);
      display: inline-block;
      vertical-align: top;
      padding: 35px 0;
      // background-color: #F7F2FF;
      .swiper-container3 {
        width: calc(100% - 108px);
        overflow: hidden;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        .swiper-slide {
          text-align: center;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            user-select: none;
          }
        }
      }
      .left {
        display: inline-block;
        vertical-align: top;
        height: 80px;
        width: 34px;
        position: relative;
        margin-left: 20px;
        img {
          width: 17px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .right {
        display: inline-block;
        vertical-align: top;
        height: 80px;
        position: relative;
        width: 34px;
        margin-right: 20px;
        img {
          width: 17px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .procedure {
    height: 225px;
    font-size: 0;
    background-color: #fff;
    margin-bottom: 24px;
    img {
      width: 100%;
    }
  }
  .title {
    height: 78px;
    line-height: 78px;
    text-align: center;
    background:linear-gradient(270deg,rgba(253,155,255,1) 0%,rgba(254,211,211,1) 100%);
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#FD9BFF", endColorstr="#FED3D3", gradientType="1");
    span {
      display: inline-block;
      vertical-align: middle;
      width: 236px;
      text-align: center;
      font-size: 25px;
      color: #fff;
    }
    img {
      width: 27px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .list {
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
</style>

<style>
  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 10px;
  }
  .swiper-pagination-bullet {
    width: 11px;
    height: 11px;
    opacity: 1;
    background: #fff;
  }
  .swiper-pagination-bullet-active {
    background: #DF56E1;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 20px;
  }
</style>
