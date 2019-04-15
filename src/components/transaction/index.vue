<template>
<section v-if="common_data.navigation.TRANSACTION.status === 1">
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="Thống kê giao dịch" name="first">
      <transaction-table-component
        :bank_list="bank.list"
        :load_bank_list="bank.loading"
        ref="transaction_table_component"
      />
    </el-tab-pane>

    <el-tab-pane label="Thống kê chuyển tiền" name="second">
      <money-transfer-component
        :bank_list="bank.list"
        :load_bank_list="bank.loading"
        ref="money_transfer_component"
      />
    </el-tab-pane>
  </el-tabs>
</section>
</template>

<script>

import TransactionTableComponent from './transaction_table'
import MoneyTransferComponent from '@/components/money_transfer'

import { BANK_LIST_URL } from '@/constants/endpoints'

export default {
  components: {
    TransactionTableComponent,
    MoneyTransferComponent
  },
  data () {
    return {
      activeName: 'first',
      bank: {
        list: [],
        loading: false
      }
    }
  },
  watch: {
  },
  methods: {
    handleClick (tab, event) {
      if (tab.paneName === 'first') {
        this.$refs.transaction_table_component.load_data_component()
      }

      if (tab.paneName === 'second') {
        this.$refs.money_transfer_component.load_data_table()
      }
    },
    async load_bank_list () {
      if (this.common_data.navigation.TRANSACTION.getMethod === 0) {
        return
      }

      if (this.bank.loading) return
      this.bank.loading = true
      const response = await this.$services.do_request('get', BANK_LIST_URL)

      this.bank.loading = false
      if (response.data.data) {
        this.bank.list = response.data.data
      } else {
        this.$router.push('/e-500')
      }
    }
  },
  created () {
    this.load_bank_list()
  }
}
</script>
