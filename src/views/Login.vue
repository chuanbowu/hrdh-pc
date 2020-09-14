<template>
  <div class="Login">
    <div id="login">
      <div class="main">
        <div class="beg-login-box">
          <header><h1>登录</h1></header>
          <div class="beg-login-main">
            <div class="login-form">
              <div class="back" @click="$router.push('/Home')"><img :src="require('@/assets/img/back.svg')" alt=""><span>首页</span></div>
              <div class="check-box">
                <span class="check" @click="type=1">
                  <img :src="type===1?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt=""><span>红人验证码登录</span>
                </span>
                <span class="check" @click="type=2">
                  <img :src="type===2?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt=""><span>红人密码登录</span>
                </span>
                <span class="check" @click="type=3">
                  <img :src="type===3?require('@/assets/img/PC/checkend.png'):require('@/assets/img/PC/check.png')" alt=""><span>商家登录</span>
                </span>
              </div>
              <div class="form-item">
                <input type="text" v-model="phone" placeholder="请输入手机号" @keyup.enter="submit">
              </div>
              <div class="code-item" v-if="type===1">
                <div class="form-item mb0">
                  <input type="text" v-model="code" placeholder="请输入验证码" @keyup.enter="submit">
                </div>
                <div class="getcode" :class="{active:cansend}" @click="getcode">{{countDown}}</div>
              </div>
              <div class="form-item mb0" v-if="type===2 || type===3">
                <input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="submit">
              </div>
              <p class="forget" @click="$router.push('/FindPassword')">忘记密码？</p>
              <div class="btn" :class="{active:disabled}" @click="submit">{{title}}</div>
              <footer>没有账号？<span @click="$router.push('/Register')">注册</span></footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken, setbussinesToken } from '@/utils/auth'
import { sendCode, passwordLogin, codeLogin, bussinessLogin } from '@/api'
export default {
  name: 'Login',
  data () {
    return {
      phone: '',
      password: '',
      code: '',
      type: 2,
      subLoad: false,
      title: '登录',
      countDown: '获取验证码',
      isend: false,
      timeFn: null
    }
  },
  computed: {
    disabled: function () {
      return (this.phone === '' || !/^1[3456789]\d{9}$/.test(this.phone) || (this.code === '' && this.type === 1) || (this.password === '' && this.type !== 1) || this.subLoad)
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
        this.title = '登录中...'
        this.login()
      }, 500)
    },
    async login () {
      const res = this.type === 1 ? await codeLogin({ phone: this.phone, code: this.code }) : this.type === 2 ? await passwordLogin({ phone: this.phone, password: this.password }) : await bussinessLogin({ phone: this.phone, password: this.password })
      if (res.result === '1') {
        this.type === 3 ? setbussinesToken(res.datas.token) : setToken(res.datas.token)
        this.type === 3 ? location.href = 'http://www.chuanbowu.com/business-web/dashboard' : this.$router.push('/EditPersonalData')
      }
      this.subLoad = false
      this.title = '登录'
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.Login {
  height: 100%;
  background:rgba(247,242,255,1);
  user-select: none;
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
        cursor: pointer;
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
          cursor: pointer;
        }
      }
    }
  }
}
</style>
