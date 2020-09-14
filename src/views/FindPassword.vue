<template>
  <div class="FindPassword">
    <div id="login">
      <div class="main">
        <div class="beg-login-box">
          <header><h1>找回密码</h1></header>
          <div class="beg-login-main">
            <div class="login-form">
              <div class="form-item">
                <input type="text" v-model="phone" placeholder="请输入手机号">
              </div>
              <div class="code-item">
                <div class="form-item">
                  <input type="text" v-model="code" placeholder="请输入验证码">
                </div>
                <div class="getcode" :class="{active:cansend}" @click="getcode">{{countDown}}</div>
              </div>
              <div class="form-item">
                <input type="password" v-model="password" placeholder="请输入密码">
              </div>
              <div class="form-item">
                <input type="password" v-model="confirmPassword" placeholder="请再次输入密码">
              </div>
              <div class="btn" :class="{active:disabled}" @click="submit">{{title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendCode, updatePassword } from '@/api'
export default {
  name: 'FindPassword',
  data () {
    return {
      phone: '',
      password: '',
      confirmPassword: '',
      code: '',
      subLoad: false,
      title: '确定',
      countDown: '获取验证码',
      isend: false,
      timeFn: null
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
        this.title = '确定中...'
        this.login()
      }, 500)
    },
    async login () {
      const res = await updatePassword({ phone: this.phone, code: this.code, password: this.password, confirmPassword: this.confirmPassword })
      this.subLoad = false
      if (res.result === '1') {
        this.$router.push('/Login')
      }
      this.title = '确定'
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.FindPassword {
  height: 100%;
  background:rgba(247,242,255,1);
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
      padding: 56px;
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
</style>
