<template>
  <div class="Register">
    <div id="login">
      <div class="main">
        <div class="beg-login-box">
          <header><h1>红人注册</h1></header>
          <div class="beg-login-main">
            <div class="login-form">
              <div class="back" @click="$router.push('/Home')"><img :src="require('@/assets/img/back.svg')" alt=""><span>首页</span></div>
              <div class="login" @click="$router.push('/Login')">已有账号？<span>去登录</span></div>
              <div class="form-item">
                <input type="text" v-model="phone" placeholder="请输入手机号" @keyup.enter="submit">
              </div>
              <div class="code-item">
                <div class="form-item">
                  <input type="text" v-model="code" placeholder="请输入验证码" @keyup.enter="submit">
                </div>
                <div class="getcode" :class="{active:cansend}" @click="getcode">{{countDown}}</div>
              </div>
              <div class="form-item">
                <input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="submit">
              </div>
              <div class="form-item">
                <input type="password" v-model="confirmPassword" placeholder="请再次输入密码" @keyup.enter="submit">
              </div>
              <div class="btn" :class="{active:disabled}" @click="submit">{{title}}</div>
              <footer>商家注册请 <span @click="openagentList=true" style="cursor: pointer">联系客服</span></footer>
            </div>
          </div>
        </div>
      </div>
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
import { sendCode, register, customerList } from '@/api'
import { baseUrl } from '@/utils/commom'
export default {
  name: 'Register',
  data () {
    return {
      phone: '',
      password: '',
      confirmPassword: '',
      code: '',
      subLoad: false,
      title: '注册',
      countDown: '获取验证码',
      isend: false,
      timeFn: null,
      openagentList: false,
      baseUrl: baseUrl,
      list: []
    }
  },
  computed: {
    disabled: function () {
      return (this.phone === '' || !/^1[3456789]\d{9}$/.test(this.phone) || this.code === '' || this.password === '' || this.confirmPassword === '' || this.password !== this.confirmPassword || this.subLoad)
    },
    cansend: function () {
      return (this.phone !== '' && (/^1[3456789]\d{9}$/.test(this.phone)) && !this.isend)
    }
  },
  methods: {
    async getcode () { // 发送验证码
      if (!this.cansend) return
      const res = await sendCode({ phone: this.phone })
      this.subLoad = false
      if (res.result === '1') {
        this.isend = true
        this.countDown = 90
        this.timeFn = setInterval(() => {
          this.countDown--
          if (this.countDown <= 0) {
            this.countDown = '获取验证码'
            this.isend = false
            clearInterval(this.timeFn)
          }
        }, 1000)
      }
    },
    async submit () {
      if (this.disabled) return
      setTimeout(() => {
        this.subLoad = true
        this.title = '注册中...'
        this.login()
      }, 500)
    },
    async login () {
      const res = await register({ phone: this.phone, code: this.code, password: this.password })
      this.subLoad = false
      if (res.result === '1') {
        this.$message({ type: 'success', message: '注册成功' })
        this.$router.push('/Login')
      }
      this.title = '注册'
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
  }
}
</script>

<style lang="less" scoped>
.Register {
  height: 100%;
  background:rgba(247,242,255,1);
  .back {
    font-size: 20px;
    color: #DF56E1;
    text-align: left;
    line-height: 36px;
    position: absolute;
    top: 80px;
    left: 50px;
    cursor: pointer;
    img {
      width: 36px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .login {
    font-size: 14px;
    color: #666;
    position: absolute;
    top: 94px;
    right: 50px;
    span {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      color: #DF56E1;
    }
  }
}
.main {
  max-width: 440px;
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 16px;
  text-align: center;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  .beg-login-box {
    header {
      margin-bottom: 32px;
      h1 {
        color: #DF56E1;
        text-align: center;
        font-size: 24px;
        line-height: 30px;
      }
    }
    .beg-login-main {
      padding: 70px 56px 56px;
      background-color: rgba(255, 255, 255, 1);
      .check-box {
        margin-bottom: 22px;
        text-align: left;
        .check {
          display: inline-block;
          font-size: 14px;
          line-height: 22px;
          margin-right: 8px;
          cursor: pointer;
          &:last-of-type {
            margin-right: 0;
          }
          img {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
      .form-item {
        width: 100%;
        border: 1px solid rgba(221,221,221,1);
        position: relative;
        vertical-align: top;
        margin-bottom: 20px;
        &.mb0 {
          margin-bottom: 0;
        }
        input {
          width: 100%;
          border: none;
          outline: none;
          box-sizing: border-box;
          background-color: transparent;
          line-height: 1;
          padding: 12px 40px 12px 10px;
          color: #666666;
          &::-webkit-input-placeholder{
            color: #cccccc;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #cccccc;
          }
          &::-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #cccccc;
          }
        }
      }
      .code-item {
        .form-item {
          display: inline-block;
          width: 176px;
        }
        .getcode {
          display: inline-block;
          width: 140px;
          height: 40px;
          margin-left: 10px;
          text-align: center;
          line-height: 40px;
          background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
          filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
          cursor: not-allowed;
          color: #fff;
          font-weight: 500;
          border-radius: 4px;
          user-select: none;
          &.active {
            cursor: pointer;
          }
        }
      }
      .forget {
        text-align: right;
        line-height: 22px;
        margin: 8px 0;
      }
      .btn {
        height: 44px;
        text-align: center;
        line-height: 44px;
        color: #fff;
        cursor: pointer;
        background:linear-gradient(90deg,rgba(172,126,244,1) 0%,rgba(223,86,225,1) 100%);
        filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#AC7EF4", endColorstr="#DF56E1", gradientType="1");
        &.active {
          cursor: not-allowed;
        }
      }
      footer {
        margin-top: 20px;
        span {
          color: #DF56E1;
        }
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
