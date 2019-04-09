<template>
<section v-if="common_data.navigation.TRANSACTION.status === 1">
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="Thống kê giao dịch" name="first">
      <transaction-table-component />
    </el-tab-pane>

    <el-tab-pane label="Thống kê chuyển tiền" name="second">
      <money-transfer-component />
    </el-tab-pane>
  </el-tabs>
</section>
</template>

<script>

import TransactionTableComponent from './transaction_table'
import MoneyTransferComponent from './money_transfer_table'

export default {
  components: {
    TransactionTableComponent,
    MoneyTransferComponent
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  watch: {
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  created () {
  }
}
</script>
