<template lang="html">
<section style="text-align: left">
  <el-button @click="dialogVisible = true" type="primary"  :disabled="common_data.navigation.TRANSACTION.postMethod === 0">
    <i class="el-icon-plus" style="margin-right: 10px" />
    Thêm mới
  </el-button>

  <el-dialog
    title="Tạo mới"
    :visible.sync="dialogVisible"
    width="75%"
    height="80%"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="Giao dịch" name="first">
        <add-transaction-component
          :bank_list_loaded="bank_list_loaded"
          :product_list_loaded="product_list_loaded"
          :customer_list_loaded="customer_list_loaded"
          @close_dialog="close_dialog"
        />
      </el-tab-pane>

      <el-tab-pane label="Chuyển tiền" name="second">
        <add-money-transfer-component
          :bank_list_loaded="bank_list_loaded"
          @close_dialog="close_dialog"
        />
      </el-tab-pane>
    </el-tabs>

  </el-dialog>
</section>
</template>

<script>
import AddTransactionComponent from './add_transaction'
import AddMoneyTransferComponent from './add_money_transfer'

export default {
  props: ['bank_list_loaded', 'product_list_loaded', 'customer_list_loaded'],
  components: {
    AddTransactionComponent,
    AddMoneyTransferComponent
  },
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  watch: {
  },
  methods: {
    close_dialog () {
      console.log('close 1')
      this.dialogVisible = false
    }
  },
  created () {
  }
}
</script>
<style scoped="">
.el-input, el-input__inner {
  width: 250px;
}
.el-input--suffix .el-input__inner {
  width: 250px
}
.mngt-input {
  width: 250px
}
</style>
