import Vue from 'vue'

// import App from '@/App'

import Router from 'vue-router'

// import LoadingPage from '@/components/loading_page'
import Login from '@/components/login'
import Layout from '@/components/layout'
import Transaction from '@/components/transaction'
import BankingAccounts from '@/components/banking_accounts'
import CustomerAccounts from '@/components/customer_accounts'
import Products from '@/components/products'

import ProductAD from '@/components/administration/product'
import CustomerAD from '@/components/administration/customer'
import BankAD from '@/components/administration/bank'
import RoleAD from '@/components/administration/role'
import UserAD from '@/components/administration/user'

import E500 from '@/components/errors/e500'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/e-500',
      name: 'E500',
      component: E500
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/transaction',
      children: [
        {
          path: 'transaction',
          name: 'transaction',
          component: Transaction
        },
        {
          path: 'banking-accounts',
          name: 'banking-accounts',
          component: BankingAccounts
        },
        {
          path: 'customer-accounts',
          name: 'customer-accounts',
          component: CustomerAccounts
        },
        {
          path: 'products',
          name: 'products',
          component: Products
        },
        {
          path: 'product-admin',
          name: 'product-ad',
          component: ProductAD
        },
        {
          path: 'bank-admin',
          name: 'bank-ad',
          component: BankAD
        },
        {
          path: 'customer-admin',
          name: 'customer-admin',
          component: CustomerAD
        },
        {
          path: 'role-admin',
          name: 'role-admin',
          component: RoleAD
        },
        {
          path: 'user-admin',
          name: 'user-admin',
          component: UserAD
        }
      ]
    }
  ]
})
