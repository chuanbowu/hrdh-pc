<template>
  <div class="EditPersonalData">
    <div class="headimg" @click="upload"><img :src="detail.headPic?baseUrl+detail.headPic:require('@/assets/img/noavatar.png')" alt=""></div>
    <div class="from">
      <div class="phone">{{detail.phone}}</div>
      <div class="from-item nickName">
        <img style="width:20px" :src="require('@/assets/img/PC/edit.png')" alt="">
        <input type="text" v-model="detail.nickName" placeholder="我的昵称">
      </div>
      <div class="from-item sex">
        <img style="width:20px" :src="require('@/assets/img/PC/sex.png')" alt="">
        <select v-model="detail.sex">
          <option value='' disabled selected style='display:none;'>请选择性别</option>
          <option :value="1">男</option>
          <option :value="2">女</option>
          <option :value="3">无</option>
        </select>
      </div>
      <div class="from-area area">
        <select v-model="provinceId" @change="getcityList(provinceId)">
          <option value='' disabled selected style='display:none;'>请选择省份</option>
          <option :value="item.cid" v-for="(item, index) in provinceList" :key="index">{{item.name}}</option>
        </select>
        <select v-model="cityId" @change="getareaList(cityId)">
          <option value='' disabled selected style='display:none;'>请选择市</option>
          <option :value="item.cid" v-for="(item, index) in cityList" :key="index">{{item.name}}</option>
        </select>
        <select v-model="areaId">
          <option value='' disabled selected style='display:none;'>请选择地区</option>
          <option :value="item.cid" v-for="(item, index) in areaList" :key="index">{{item.name}}</option>
        </select>
      </div>
      <div class="from-item weixin">
        <img style="width:22px" :src="require('@/assets/img/PC/weixin.png')" alt="">
        <input type="text" v-model="detail.weChat" placeholder="请输入微信号">
      </div>
      <div class="from-item qq">
        <img style="width:20px" :src="require('@/assets/img/PC/qq.png')" alt="">
        <input type="text" v-model="detail.qq" placeholder="请输入qq号">
      </div>
      <div class="from-item name">
        <img style="width:20px" :src="require('@/assets/img/PC/name.png')" alt="">
        <input type="text" v-model="detail.consigneeName" placeholder="请输入姓名">
      </div>
      <div class="from-item address">
        <img style="width:20px" :src="require('@/assets/img/PC/address.png')" alt="">
        <textarea type="text" rows="4" v-model="detail.consigneeAddress" placeholder="请输入收样地址"></textarea>
      </div>
      <div class="btn" v-if="detail.status===1" :class="this.canSave?'cant':''" @click="save">完善个人资料</div>
      <div class="btn" v-else :class="this.canSave?'cant':''" @click="save">修改个人资料</div>
    </div>
    <input style="display: none" type="file" accept="image/*" ref="upload" @change="change">
  </div>
</template>

<script>
import { sensationInfo, uploadImage, provinceList, cityList, areaList, updateSensation } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'EditPersonalData',
  data () {
    return {
      detail: {},
      provinceList: [],
      cityList: [],
      areaList: [],
      baseUrl: baseUrl,
      provinceId: '',
      cityId: '',
      areaId: '',
      subload: false
    }
  },
  computed: {
    canSave () {
      return this.detail.nickName === '' || this.detail.sex === '' || this.provinceId === '' || this.cityId === '' || this.areaId === '' || this.detail.weChat === '' || this.detail.qq === '' || this.detail.consigneeName === '' || this.detail.consigneeAddress === '' || this.subload
    }
  },
  methods: {
    async getsensationInfo () {
      const res = await sensationInfo({})
      if (res.result === '0') {
        this.detail = res.datas
        this.provinceId = this.detail.provinceId ? this.detail.provinceId : ''
        if (this.detail.cityId) {
          // this.cityId = this.detail.cityId
          this.getcityList(this.provinceId, this.detail.cityId)
          if (this.detail.areaId) {
            // this.areaId = this.detail.areaId
            this.getareaList(this.detail.cityId, this.detail.areaId)
          }
        }
      }
    },
    upload () {
      if (this.detail.status > 1) return
      this.$refs.upload.value = ''
      this.$refs.upload.click()
    },
    async change (e) {
      const key = new FormData()
      key.append('file', e.target.files[0])
      const res = await uploadImage(key)
      if (res.result === '1') {
        this.detail.headPic = res.datas.fileUrl
      }
    },
    async getprovinceList () {
      const res = await provinceList({})
      if (res.result === '0') {
        this.provinceList = res.datas.list
        this.areaList = []
      }
    },
    async getcityList (cid, id) {
      if (!cid) return
      const res = await cityList({ cid: cid })
      if (res.result === '0') {
        this.cityList = res.datas.list
        if (id) {
          this.cityId = id
        } else {
          this.cityId = ''
          this.areaId = ''
        }
      }
    },
    async getareaList (cid, id) {
      if (!cid) return
      const res = await areaList({ cid: cid })
      if (res.result === '0') {
        this.areaList = res.datas.list
        if (id) {
          this.areaId = id
        } else {
          this.areaId = ''
        }
      }
    },
    async save () {
      if (this.canSave) return
      this.subload = true
      const data = { nickName: this.detail.nickName, headPic: this.detail.headPic, sex: this.detail.sex, qq: this.detail.qq, weChat: this.detail.weChat, provinceId: this.provinceId, cityId: this.cityId, areaId: this.areaId, consigneeName: this.detail.consigneeName, consigneeAddress: this.detail.consigneeAddress }
      const res = await updateSensation(data)
      if (res.result === '1') {
        if (this.detail.status === 1) {
          this.$message({ type: 'success', message: '资料完善成功' })
        } else {
          this.$message({ type: 'success', message: '资料修改成功' })
        }
        this.getsensationInfo()
      }
      this.subload = false
    }
  },
  created () {
    this.getsensationInfo()
    this.getprovinceList()
  }
}
</script>

<style lang="less" scoped>
  .EditPersonalData {
    padding-top: 35px;
    padding-left: 64px;
    margin-bottom: 119px;
    .headimg {
      display: inline-block;
      vertical-align: top;
      width: 100px;
      height: 100px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 30px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .from {
      display: inline-block;
      vertical-align: top;
      .phone {
        padding-top: 22px;
        font-size: 16px;
        line-height: 22px;
        color: #666;
        padding-bottom: 10px;
      }
      .from-item {
        box-sizing: border-box;
        position: relative;
        width: 344px;
        height: 44px;
        border-radius:4px;
        border: 1px solid #DDDDDD;
        background-color: #fff;
        margin-bottom: 11px;
        img {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translate(0, -50%);
        }
        input, &.sex select, &.platform select {
          border: none;
          outline: none;
          box-sizing: border-box;
          background-color: transparent;
          padding: 10px 50px;
          font-size: 14px;
          color: #ccc;
          width: 342px;
          height: 42px;
          appearance: none;
          background: url(../assets/img/PC/select.svg) 96% 50% no-repeat;
        }
        &.address {
          margin-bottom: 0;
          height: auto;
          img {
            top: 10px;
            transform: translate(0, 0);
          }
          textarea {
            width: 100%;
            border: none;
            outline: none;
            box-sizing: border-box;
            background-color: transparent;
            resize: none;
            text-indent: 40px;
            font-size: 14px;
            color: #ccc;
            padding: 10px;
            line-height: 22px;
          }
        }
      }
      .from-area {
        margin-bottom: 11px;
        select {
          box-sizing: border-box;
          width: 108px;
          height: 44px;
          border: 1px solid #DDDDDD;
          margin-right: 10px;
          font-size: 14px;
          color: #ccc;
          outline: none;
          line-height: 42px;
          padding: 0 10px;
          appearance: none;
          background: #fff url(../assets/img/PC/select.svg) 94% 50% no-repeat;
          &:last-child {
            margin-right: 0px;
          }
        }
      }
      .btn {
        margin-top: 43px;
        width: 344px;
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
  }
</style>
