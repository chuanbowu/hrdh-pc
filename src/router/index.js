import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import PersonalData from '@/views/PersonalData'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/FindPassword',
    name: 'FindPassword',
    component: () => import('@/views/FindPassword')
  },
  {
    path: '/',
    name: 'Index',
    redirect: '/Home',
    component: Index,
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('@/views/Home')
      },
      {
        path: '/Search',
        name: 'Search',
        component: () => import('@/views/Search')
      }
    ]
  },
  {
    path: '/Sensation',
    name: 'Sensation',
    redirect: '/Sensations',
    component: Index,
    children: [
      {
        path: '/Sensations',
        name: 'Sensations',
        component: () => import('@/views/Sensations')
      },
      {
        path: '/SensationsDetail',
        name: 'SensationsDetail',
        component: () => import('@/views/SensationsDetail')
      },
      {
        path: '/SensationSearch',
        name: 'SensationSearch',
        component: () => import('@/views/SensationSearch')
      }
    ]
  },
  {
    path: '/TakeDelivery',
    name: 'TakeDelivery',
    redirect: '/TakeDeliveryList',
    component: Index,
    children: [
      {
        path: '/TakeDeliveryList',
        name: 'TakeDeliveryList',
        component: () => import('@/views/TakeDeliveryList')
      },
      {
        path: '/GoodsDetail',
        name: 'GoodsDetail',
        component: () => import('@/views/GoodsDetail')
      },
      {
        path: '/SubmiTakeDelivery',
        name: 'SubmiTakeDelivery',
        component: () => import('@/views/SubmiTakeDelivery')
      }
    ]
  },
  {
    path: '/ReturnCommission',
    name: 'ReturnCommission',
    redirect: '/ReturnCommissionList',
    component: Index,
    children: [
      {
        path: '/ReturnCommissionList',
        name: 'ReturnCommissionList',
        component: () => import('@/views/ReturnCommissionList')
      },
      {
        path: '/ReturnCommissionDetail',
        name: 'ReturnCommissionDetail',
        component: () => import('@/views/ReturnCommissionDetail')
      }
    ]
  },
  {
    path: '/Shake',
    name: 'Shake',
    redirect: '/ShakeData',
    component: Index,
    children: [
      {
        path: '/ShakeData',
        name: 'ShakeData',
        component: () => import('@/views/ShakeData')
      }
    ]
  },
  {
    path: '/Tip',
    name: 'Tip',
    redirect: '/TipGoods',
    component: Index,
    children: [
      {
        path: '/TipGoods',
        name: 'TipGoods',
        component: () => import('@/views/TipGoods')
      }
    ]
  },
  {
    path: '/Personal',
    name: 'Personal',
    redirect: '/PersonalData',
    component: Index,
    children: [
      {
        path: '/PersonalData',
        name: 'PersonalData',
        redirect: '/EditPersonalData',
        component: PersonalData,
        children: [
          {
            path: '/EditPersonalData',
            name: 'EditPersonalData',
            component: () => import('@/views/EditPersonalData')
          },
          {
            path: '/Authentication',
            name: 'Authentication',
            component: () => import('@/views/Authentication')
          },
          {
            path: '/MyTakeDelivery',
            name: 'MyTakeDelivery',
            component: () => import('@/views/MyTakeDelivery')
          },
          {
            path: '/MyBalance',
            name: 'MyBalance',
            component: () => import('@/views/MyBalance')
          },
          {
            path: '/IncomeDetails',
            name: 'IncomeDetails',
            component: () => import('@/views/IncomeDetails')
          },
          {
            path: '/WithdrawalRecord',
            name: 'WithdrawalRecord',
            component: () => import('@/views/WithdrawalRecord')
          },
          {
            path: '/CustomerService',
            name: 'CustomerService',
            component: () => import('@/views/CustomerService')
          },
          {
            path: '/MyTakeDeliveryDetail',
            name: 'MyTakeDeliveryDetail',
            component: () => import('@/views/MyTakeDeliveryDetail')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/Home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/hrdh',
  // base: '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
