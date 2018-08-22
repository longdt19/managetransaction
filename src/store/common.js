/* eslint-disable */

const INIT_STATE = {
  bank_list: [],
  transaction_category_list: [],
  customer_list: [],
  token: null
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
  },
  actions: {},
  getters: {
    common_data: state => state
  }
}
