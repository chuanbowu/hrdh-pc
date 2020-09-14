'use strict'

import axios from 'axios'
import setSign from '@/utils/MD5'
import { Message } from 'element-ui'
// import store from '../store'
import router from '../router'
import { getToken, removeToken } from '@/utils/auth' // removeToken
// import NProgress from 'nprogress'

axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  if (config.method === 'post') {
    config.baseURL === '/hrdh-admin' ? config.data.appKey = 'web' : config.data.appKey = 'h5'
    config.baseURL === '/hrdh-admin' ? config.data.sign = setSign.setSign(config.data, 1) : config.data.sign = setSign.setSign(config.data)
  }
  // loading
  if (config.loading) {
    // store.commit('UPDATE_LOADING', true)
    // NProgress.start()
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // store.commit('UPDATE_LOADING', false)
  // NProgress.done()
  return response
}, error => {
  // store.commit('UPDATE_LOADING', false)
  // NProgress.done()
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    if (response.data.result.length > 1 && response.data.result.substr(-1) === '1') {
      Message({ message: response.data.message, type: 'warning', duration: 3000 })
    }
    // if (response.data.result === '1') {
    //   Message({ message: response.data.message, type: 'success', duration: 3000 })
    // } else if (response.data.result !== '0') {
    //   Message({ message: response.data.message, type: 'warning', duration: 3000 })
    // }
    if (response.data.result === '100040') {
      removeToken()
      router.push('/Login')
    }
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  // if (res.status === -404) {
  //   alert(res.msg)
  // }
  // if (res.data && (res.data.desc !== 'success')) {
  //   alert(res.data.desc)
  // }
  return res
}

export default {
  post (url, data, loading) {
    if (getToken()) {
      data.token = getToken()
    } else {
      data.token = 'token'
    }
    return axios({
      method: 'post',
      baseURL: '/hrdh-restful',
      url,
      data: data,
      loading: loading
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  post1 (url, data, loading) {
    return axios({
      method: 'post',
      baseURL: '/hrdh-admin',
      url,
      data: data,
      loading: loading
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
