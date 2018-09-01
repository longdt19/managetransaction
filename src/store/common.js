/* eslint-disable */

const INIT_STATE = {
  bank_list: [],
  transaction_category_list: [],
  customer_list: [],
  token: null,
  constants_loaded: null,
  username: null
}

export default {
  namespaced: true,
  state: {
    ...INIT_STATE
  },
  mutations: {
    bankList_loaded: (state, value) => {
      state.bank_list = value
    },
    transactionCategoryList_loaded: (state, value) => {
      state.transaction_category_list = value
    },
    customerList_loaded: (state, value) => {
      state.customer_list = value
    },
    tokenLoaded: (state, value) => {
      state.token = value
    },
    constants_loaded: (state, value) => {
      state.constants_loaded = value
    },
    username: (state, value) => new Promise(function(resolve, reject) {
      state.username = value
    })
  },
  actions: {},
  getters: {
    common_data: state => state,
    token: state => state.token,
    bank_list: state => state.bank_list,
    transaction_category_list: state => state.transaction_category_list,
    customer_list: state => state.customer_list,
    constants_loaded: state => state.constants_loaded,
    username: state => state.username
  }
}
