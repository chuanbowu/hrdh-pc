<template>
  <div class="index" :class="$route.path==='/TipGoods'?'active':''">
    <header class="head">
      <div class="login">
        <span v-if="!token" @click="go('/Register')">注册</span>
        <span v-if="!token" @click="go('/Login')">登录</span>
        <span @click="$router.push('/EditPersonalData')" v-if="token"><img style="width:40px;border-radius:50%;vertical-align:middle;cursor:pointer" :src="detail.headPic?baseUrl+detail.headPic:require('@/assets/img/noavatar.png')" alt=""></span>
        <span @click="$router.push('/EditPersonalData')" v-if="token" class="name" style="">Hi，{{detail.nickName?detail.nickName:detail.phone}}</span>
        <span @click="loginout" v-if="token" class="loginout" style="">退出登录</span>
      </div>
      <div class="search-container">
        <div class="logo" @click="goindex"><img style="width: 225px;cursor: pointer" :src="require('@/assets/img/logo.png')" alt=""></div>
        <div class="search-box">
          <div class="search-input">
            <input v-if="$route.path==='/Sensations'||$route.path==='/SensationsDetail'" v-model="keywords" type="text" placeholder="请输入红人昵称进行搜索" @keyup.enter="find">
            <input v-else v-model="keywords" type="text" placeholder="请输入商品名称进行搜索" @keyup.enter="find">
            <!-- <input v-if="$route.path==='/TakeDeliveryList'||$route.path==='/GoodsDetail'||$route.path==='/SubmiTakeDelivery'" v-model="keywords" type="text" placeholder="请输入商品名称进行搜索" @keyup.enter="find">
            <input v-if="$route.path==='/ReturnCommissionList'||$route.path==='/ReturnCommissionDetail'" v-model="keywords" type="text" placeholder="请输入商品名称进行搜索" @keyup.enter="find">
            <input v-if="$route.path==='/ShakeData'" v-model="keywords" type="text" placeholder="请输入商品名称进行搜索" @keyup.enter="find"> -->
            <img :src="require('@/assets/img/search.png')" @click="find" alt="">
          </div>
          <button @click="openagentList=true">商家入驻</button>
          <button @click="go('/Register')">红人入驻</button>
        </div>
      </div>
    </header>
    <nav>
      <div class="nav-box">
        <div :class="$route.path==='/Home' || $route.path==='/Search'?'active':''" @click="go('/Home')">首页</div>
        <div :class="$route.path==='/Sensations'||$route.path==='/SensationSearch'||$route.path==='/SensationsDetail'?'active':''" @click="go('/Sensations')">红人场</div>
        <div :class="$route.path==='/TakeDeliveryList'||$route.path==='/GoodsDetail'||$route.path==='/SubmiTakeDelivery'?'active':''" @click="go('/TakeDeliveryList')">拿货专区</div>
        <div :class="$route.path==='/ReturnCommissionList'||$route.path==='/ReturnCommissionDetail'?'active':''" @click="go('/ReturnCommissionList')">返佣专区</div>
        <div :class="$route.path==='/ShakeData'?'active':''" @click="go('/ShakeData')">好物榜</div>
        <div :class="$route.path==='/TipGoods'?'active':''" @click="go('/TipGoods')">快抖数据</div>
      </div>
    </nav>
    <iframe v-if="$route.path==='/TipGoods'" src="https://dy.feigua.cn/?chl=feigua2_baidu-dy" frameborder="0"></iframe>
    <section>
      <router-view></router-view>
    </section>
    <footer v-show="$route.path!=='/TipGoods'">
      <div class="footer">
        <ul>
          <li>
            <h5>关于我们</h5>
            <div class="aboutus">广州市传播物网络科技有限公司，以下简称“传播物”，是国内首家以网红达人直播带货，红人孵化及培训，互联网大数据为一体的互联网技术创新企业。公司位于天河CBD核心，拥有专业的，完整的技术研发团队和项目运营团队，深入挖掘企业与网红带货之间的合作价值，致力于将公司旗下平台“传播物”网打造为国内最具有价值的网红生态基地。</div>
          </li>
          <li>
            <h5>联系我们</h5>
            <div class="phone">15917409003</div>
            <div class="address">地址：广东省广州市天河区珠江新城花城大道建滔广场702C</div>
          </li>
          <li>
            <div class="Consultation">
              <span>商家咨询</span>
              <img :src="require('@/assets/img/bussines-qrcode.jpg')" alt="">
            </div>
            <div class="Consultation">
              <span>红人咨询</span>
              <img :src="require('@/assets/img/hr-qrcode.jpg')" alt="">
            </div>
          </li>
        </ul>
        <div class="have">广州传播物网络科技有限公司版权所有 @2020 <a target="_blank" href="http://www.beian.miit.gov.cn" rel="nofollow">粤ICP备20035711号-1</a></div>
      </div>
    </footer>
    <transition name="fade">
      <div v-show="openagentList" class="agent-box">
        <div class="agent-con">
          <div class="rotate1"></div>
          <div class="rotate2"></div>
          <div class="rotate3"></div>
          <div class="rotate4"></div>
          <div class="con">
            <i class="el-icon-close close" @click="openagentList=false"></i>
            <div class="scan-title"><span>扫一扫添加客服微信</span></div>
            <div class="code" v-for="(item, index) in list" :key="index">
              <img :src="baseUrl + item.customerPic" alt="">
              <p>{{item.customerName}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { sensationInfo, sensationLoginOut, getTaoBaoUrl, customerList } from '@/api'
import { getToken, removeToken } from '@/utils/auth'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'Index',
  data () {
    return {
      routeactive: '',
      keywords: '',
      token: getToken(),
      detail: {},
      baseUrl: baseUrl,
      openagentList: false,
      list: []
    }
  },
  methods: {
    go (url) {
      if (this.$route.path !== url) {
        this.$router.push(url)
      }
    },
    goindex () {
      if (this.$route.path !== '/Home') {
        this.$router.push('/Home')
      }
    },
    async loginout () {
      const res = await sensationLoginOut({})
      if (res.result === '1') {
        removeToken()
        this.token = ''
        this.$router.push('/Login')
      }
    },
    find () {
      if (this.$route.path === '/Home') {
        this.$router.push(`Search?keywords=${this.keywords}`)
      } else if (this.$route.path === '/Sensations') {
        this.$router.push(`SensationSearch?keywords=${this.keywords}`)
      } else {
        this.$router.push(`${this.$route.path}?keywords=${this.keywords}`)
      }
    },
    async getsensationInfo () {
      const res = await sensationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
        this.$store.commit('detail', this.detail)
        if (this.detail.status === 5 && this.detail.relationStatus === 1) { // 淘宝客未授权
          this.$alert('您还未进行淘宝客授权，请先授权', '', {
            showClose: false,
            confirmButtonText: '确定',
            callback: action => {
              this.getTheTaoBaoUrl()
            }
          })
        }
      }
    },
    async getTheTaoBaoUrl () {
      const res = await getTaoBaoUrl({ clientUrl: location.href })
      if (res.result === '0') {
        location.href = res.datas.taoBaoTbkUrl
      }
    },
    async getcustomerList () {
      const res = await customerList({})
      if (res.result === '0') {
        this.list = res.datas.list
      }
    }
  },
  created () {
    this.getcustomerList()
    if (getToken()) this.getsensationInfo()
    if (this.$route.query.keywords) this.keywords = this.$route.query.keywords
    if (this.$route.query.content) this.$message({ type: 'warning', message: this.$route.query.content })
  },
  watch: {
    '$route.query.keywords': function (val) {
      this.keywords = val
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  background-color: #F7F2FF;
  min-height: 100%;
  &.active {
    height: 100%;
  }
  // overflow: auto;
}
.head {
  width: 1200px;
  margin: 0 auto;
}
.login {
  padding-top: 10px;
  padding-bottom: 24px;
  text-align: right;
  font-size: 16px;
  span:nth-child(1) {
    display: inline-block;
    margin-right: 24px;
    color: #AD80F4;
    cursor: pointer;
  }
  span:nth-child(2) {
    display: inline-block;
    margin-right: 42px;
    color: #DF56E1;
    cursor: pointer;
  }
  span.name:nth-child(2) {
    color: #666;
    vertical-align: middle;
    margin-right: 20px;
    &:hover {
      color: #DF56E1;
    }
  }
  span:nth-child(3) {
    display: inline-block;
    margin-right: 42px;
    color: #666;
    cursor: pointer;
    vertical-align: middle;
    &:hover {
      color: #DF56E1;
    }
  }
}
.search-container {
  overflow: hidden;
  margin-bottom: 36px;
  .logo {
    float: left;
  }
  .search-box {
    float: right;
    margin-right: 42px;
    button {
      width:118px;
      height:44px;
      text-align: center;
      line-height: 44px;
      color: #fff;
      font-size: 14px;
      -webkit-appearance: none;
      outline: none;
      transition: all 0.1s;
      user-select: none;
      vertical-align: top;
      border: none;
      cursor: pointer;
      &:nth-child(2) {
        background:rgba(172,126,244,1);
        margin-right: 10px;
      }
      &:nth-child(3) {
        background:rgba(223,86,225,1);
      }
    }
  }
  .search-input {
    display: inline-block;
    margin-right: 160px;
    width: 338px;
    // height: 42px;
    border: 1px solid #DF56E1;
    position: relative;
    vertical-align: top;
    input {
      width: 100%;
      border: none;
      outline: none;
      box-sizing: border-box;
      background-color: transparent;
      font-size: 16px;
      line-height: 1;
      padding: 12px 40px 12px 10px;
      color: #DF56E1;
      &::-webkit-input-placeholder{
        color: #DF56E1;
      }
      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #DF56E1;
      }
      &::-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #DF56E1;
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
nav {
  // width: 100%;
  background:linear-gradient(270deg,rgba(79,80,152,1) 0%,rgba(223,87,226,1) 66%,rgba(244,225,225,1) 100%,rgba(173,125,243,1) 100%);
  filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#4F5098", endColorstr="#DF57E2", gradientType="1");
  display: block;
  .nav-box {
    padding-left: 40px;
    width: 1200px;
    box-sizing: border-box;
    margin: 0 auto;
    div {
      display: inline-block;
      vertical-align: top;
      width: 134px;
      height: 66px;
      line-height: 66px;
      text-align: center;
      font-size: 21px;
      color: #fff;
      cursor: pointer;
      &.active {
        background-color: #fff;
        color: #DF57E2;
      }
    }
  }
}
iframe {
  width: 100%;
  height: calc(100% - 238px);
}
section {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 19px;
  // min-height: calc(100% - 497px);
  background-color: #F7F2FF;
}
footer {
  background: #fff;
}
.footer {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 40px 68px 30px 28px;
  ul {
    margin-bottom: 50px;
    li {
      display: inline-block;
      vertical-align: top;
      &:nth-child(1) {
        margin-right: 126px;
        width: 356px;
      }
      &:nth-child(2) {
        margin-right: 66px;
        width: 230px;
      }
      h5 {
        font-size: 20px;
        color: #666;
        padding-bottom: 14px;
      }
      .aboutus {
        font-size: 12px;
        color: #666;
        line-height: 18px;
      }
      .phone {
        font-size: 18px;
        color: #666;
        margin-bottom: 4px;
      }
      .address {
        font-size: 13px;
        line-height: 17px;
        color: #666;
      }
    }
    .Consultation {
      display: inline-block;
      vertical-align: top;
      width: 102px;
      margin-right: 32px;
      &:last-child {
        margin-right: 0;
      }
      span {
        font-size: 20px;
        color: #666;
        padding-bottom: 14px;
        display: inline-block;
        width: 100%;
        text-align: center;
      }
      img {
        width: 102px;
        height: 102px;
      }
    }
  }
  .have {
    text-align: center;
    font-size: 16px;
    color: #666;
    a {
      color: #666;
      text-decoration: none;
      &:hover {
        color: #DF56E1;
      }
    }
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
