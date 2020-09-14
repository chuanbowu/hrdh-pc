<template>
  <div class="Authentication">
    <div class="icon">
      <img :src="detail.status===2?require('@/assets/img/PC/staus1.png'):detail.status===3?require('@/assets/img/PC/staus2.png'):detail.status===5?require('@/assets/img/PC/staus4.png'):require('@/assets/img/PC/staus3.png')" alt="">
    </div>
    <div class="tip">
      <span v-if="detail.status===2">您的账号尚未认证，请提交资料认证（信息越完善，越利于商家对接）：</span>
      <span v-if="detail.status===3">您的账号认证审核中</span>
      <span v-if="detail.status===5">您的账号已认证</span>
      <span v-if="detail.status===4">您的账号认证被拒绝,拒绝理由：{{detail.refuseContent}}</span>
    </div>
    <div class="radio" style="margin-bottom:30px">
      <span><img @click="checkaudio(1)" :src="detail.extensionStatus===1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">抖音认证</span>
      <span><img @click="checkaudio(2)" :src="detail.extensionStatus===2?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">快手认证</span>
      <span><img @click="checkaudio(3)" :src="detail.extensionStatus===3?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">小红书</span>
      <span><img @click="checkaudio(4)" :src="detail.extensionStatus===4?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">淘宝</span>
      <span><img @click="checkaudio(5)" :src="detail.extensionStatus===5?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">今日头条</span>
      <span><img @click="checkaudio(6)" :src="detail.extensionStatus===6?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">微博</span>
      <span><img @click="checkaudio(7)" :src="detail.extensionStatus===7?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">B站</span>
    </div>
    <div class="url" style="margin-bottom: 9px">
      <input :readonly="detail.status>2" type="text" v-model="detail.authenticationLink" placeholder="请输入您的主页链接">
    </div>
    <div class="tip1">抖音主页链接复制方式：打开抖音—我—右上角—我的二维码—右上角—复制链接</div>
    <div class="tip1" style="margin-bottom: 12px">快手主页链接复制方式：打开快手—我—右上角—分享个人主页—复制链接</div>
    <div class="url">
      <select :disabled="detail.status>2" v-model="detail.contentType">
        <option value='' disabled selected style='display:none;'>请选择您的内容分类</option>
        <option :value="1">搞笑娱乐</option>
        <option :value="2">萌宠动漫</option>
        <option :value="3">情感励志</option>
        <option :value="4">教育知识</option>
        <option :value="5">母婴玩具</option>
        <option :value="6">颜值才艺</option>
        <option :value="7">健康养生</option>
        <option :value="8">游戏电竞</option>
        <option :value="9">汽车周边</option>
        <option :value="10">科技生活</option>
        <option :value="11">新闻媒体</option>
        <option :value="12">美妆护肤</option>
        <option :value="13">旅游攻略</option>
        <option :value="14">美食攻略</option>
        <option :value="15">教程技术</option>
        <option :value="16">综合种草</option>
        <option :value="17">服装穿搭</option>
        <option :value="18">家居百货</option>
        <option :value="19">剧情故事</option>
        <option :value="20">音乐</option>
        <option :value="21">时尚</option>
        <option :value="22">创意</option>
      </select>
    </div>
    <div class="url">
      <select :disabled="detail.status>2" v-model="detail.followersSpreadType">
        <option value='' disabled selected style='display:none;'>请选择您的粉丝分布</option>
        <option :value="1">男女平衡</option>
        <option :value="2">男粉较多</option>
        <option :value="3">女粉较多</option>
      </select>
    </div>
    <div class="url">
      <input :readonly="detail.status>2" type="text" v-model="detail.followersNum" placeholder="请输入您的粉丝数量">
    </div>
    <div class="url">
      <input :readonly="detail.status>2" type="text" v-model="detail.totalLikedNum" placeholder="请输入您的获赞总量">
    </div>
    <div class="url">
      <input :readonly="detail.status>2" type="text" v-model="detail.singleHighestNum" placeholder="请输入您的单条最高获赞">
    </div>
    <div class="url" style="height: 90px">
      <textarea :readonly="detail.status>2" type="text" v-model="detail.sensationSurvey" placeholder="请输入您的红人概况（非必填）"></textarea>
    </div>
    <div class="tip" style="margin-bottom: 11px"><span v-if="detail.status===2">请选择</span>您支持的推广方式（可多选）：</div>
    <div class="radio" style="margin-bottom: 14px">
      <span><img @click="chose('1')" :src="extensionType.indexOf('1')>-1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">橱窗广告</span>
      <span><img @click="chose('2')" :src="extensionType.indexOf('2')>-1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">原创视频+发布</span>
      <span><img @click="chose('3')" :src="extensionType.indexOf('3')>-1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">CPS分成</span>
      <span><img @click="chose('4')" :src="extensionType.indexOf('4')>-1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt="">直播带货</span>
    </div>
    <div class="tip" style="margin-bottom: 24px"><span v-if="detail.status===2">请上传</span>您的抖音/快手个人二维码或小红书/淘宝/今日头条我的页面截图：</div>
    <div class="upload">
      <img @click="upload" v-if="detail.authenticationPic" class="img" :src="baseUrl + detail.authenticationPic" alt="">
      <img v-if="!detail.authenticationPic" @click="upload" class="upload-btn" :src="require('@/assets/img/PC/upload.png')" alt="">
    </div>
    <div class="tip2">抖音/快手个人二维码查看方式：我—右上角—我的二维码</div>
    <div class="tip2">小红书/淘宝/今日头条我的页面截图：请截图包含个人昵称的页面</div>
    <div class="btn" v-if="detail.status===2" :class="this.canSave?'cant':''" @click="save">申请认证</div>
    <div class="btn" v-if="detail.status===4" :class="this.canSave?'cant':''" @click="authAgain">重新认证</div>
    <input style="display:none" type="file" ref="upload" @change="change" accept="image/*">
  </div>
</template>

<script>
import { sensationAttestationInfo, updateSensationAttestation, uploadImage } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'Authentication',
  data () {
    return {
      detail: {},
      subload: false,
      extensionType: [],
      baseUrl: baseUrl
    }
  },
  computed: {
    canSave () {
      return this.detail.extensionStatus === '' || this.detail.authenticationLink === '' || this.detail.authenticationPic === '' || this.detail.followersNum === '' || this.detail.totalLikedNum === '' || this.detail.singleHighestNum === '' || this.detail.contentType === '' || this.detail.followersSpreadType === '' || this.extensionType.length === 0 || this.subload
    }
  },
  methods: {
    upload () {
      if (this.detail.status > 2) return
      this.$refs.upload.value = ''
      this.$refs.upload.click()
    },
    async change (e) {
      const key = new FormData()
      key.append('file', e.target.files[0])
      const res = await uploadImage(key)
      if (res.result === '1') {
        this.detail.authenticationPic = res.datas.fileUrl
      }
    },
    chose (index) {
      if (this.detail.status > 2) return
      if (this.extensionType.indexOf(index) > -1) {
        this.extensionType.splice(this.extensionType.indexOf(index), 1)
      } else {
        this.extensionType.push(index)
      }
      this.detail.extensionType = this.extensionType
    },
    async getsensationAttestationInfo () {
      const res = await sensationAttestationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
        this.detail.followersNum = this.detail.followersNum ? this.detail.followersNum : ''
        this.detail.totalLikedNum = this.detail.totalLikedNum ? this.detail.totalLikedNum : ''
        this.detail.singleHighestNum = this.detail.singleHighestNum ? this.detail.singleHighestNum : ''
        this.extensionType = this.detail.extensionType ? this.detail.extensionType.split(',') : []
        if (this.detail.status === 1) {
          this.$message({ type: 'warning', message: '请先完善个人资料' })
          setTimeout(() => {
            this.$router.push('/EditPersonalData')
          }, 15000)
        }
      }
    },
    checkaudio (type) {
      if (this.detail.status > 2) return
      this.detail.extensionStatus = type
    },
    async save () {
      if (this.canSave) return
      this.subload = true
      const data = { extensionStatus: this.detail.extensionStatus, authenticationLink: this.detail.authenticationLink, authenticationPic: this.detail.authenticationPic, followersNum: this.detail.followersNum, totalLikedNum: this.detail.totalLikedNum, singleHighestNum: this.detail.singleHighestNum, contentType: this.detail.contentType, followersSpreadType: this.detail.followersSpreadType, extensionType: this.extensionType.toString(), sensationSurvey: this.detail.sensationSurvey }
      const res = await updateSensationAttestation(data)
      if (res.result === '1') {
        this.subload = false
        this.$message({ type: 'success', message: '认证申请提交成功，审核中' })
        document.documentElement.scrollTop = 0
        this.getsensationAttestationInfo()
      }
    },
    authAgain () {
      document.documentElement.scrollTop = 0
      this.detail.status = 2
    }
  },
  created () {
    this.getsensationAttestationInfo()
  }
}
</script>

<style lang="less" scoped>
  .Authentication {
    padding-top: 40px;
    padding-left: 58px;
    margin-bottom: 70px;
    .icon {
      margin-bottom: 40px;
      img {
        width: 78px;
      }
    }
    .tip {
      font-size: 16px;
      color: #666;
      line-height: 22px;
      margin-bottom: 30px;
    }
    .radio {
      padding-left: 20px;
      span {
        position: relative;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        padding: 0 22px 0 24px;
        &:last-child {
          padding-right: 0;
        }
      }
      img {
        position: absolute;
        top: 50%;
        left: 0px;
        width: 16px;
        transform: translate(0, -50%);
        cursor: pointer;
      }
    }
    .url {
      box-sizing: border-box;
      position: relative;
      width: 498px;
      height: 44px;
      border-radius:4px;
      border: 1px solid #DDDDDD;
      background-color: #fff;
      margin-bottom: 11px;
      input, select {
        border: none;
        outline: none;
        box-sizing: border-box;
        background-color: transparent;
        padding: 10px 28px;
        font-size: 14px;
        color: #ccc;
        width: 498px;
        height: 42px;
        line-height: normal;
      }
      select {
        appearance: none;
        line-height: 1;
        background: url(../assets/img/PC/select.svg) 96% 50% no-repeat;
      }
      textarea {
        width: 100%;
        height: 88px;
        border: none;
        outline: none;
        box-sizing: border-box;
        background-color: transparent;
        resize: none;
        text-indent: 18px;
        font-size: 14px;
        color: #ccc;
        padding: 10px;
        line-height: 22px;
      }
    }
    .tip1 {
      font-size: 12px;
      line-height: 17px;
      color: #DC57E1;
      padding-left: 26px;
      margin-bottom: 10px;
    }
    .upload {
      margin-bottom: 24px;
      padding-left: 23px;
    }
    .img {
      width: 171px;
    }
    .upload-btn {
      width: 201px;
      cursor: pointer;
    }
    .tip2 {
      font-size: 14px;
      line-height: 20px;
      color: #DC57E1;
      padding-left: 23px;
      margin-bottom: 3px;
    }
    .btn {
      margin-top: 40px;
      margin-top: 43px;
      width: 498px;
      height: 44px;
      font-size: 12px;
      text-align: center;
      line-height: 44px;
      color: #fff;
      background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
      cursor: pointer;
      &.cant {
        cursor: not-allowed;
      }
    }
  }
</style>
