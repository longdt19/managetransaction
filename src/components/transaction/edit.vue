<template lang="html">
<section style="text-align: left">
  <el-dialog
    title="Tạo mới giao dịch"
    :visible.sync="dialogVisible"
    width="700px"
    :before-close="handleClose"
  >
  <el-row style="margin-top: 20px">
    <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
      <el-form>
        <el-form-item label="Mã giao dịch(*)" label-width="110px">
          <el-input :placeholder="code" disabled></el-input>
        </el-form-item>

        <el-form-item label="Sản phẩm(*)" label-width="110px">
          <el-input :placeholder="product_name" disabled></el-input>
        </el-form-item>

        <el-form-item label="Người giao dịch(*)" label-width="110px">
          <el-input :placeholder="customer_name" disabled></el-input>
        </el-form-item>

        <el-form-item label="Ngân hàng(*)" label-width="110px">
          <el-input :placeholder="bank_name" disabled></el-input>
        </el-form-item>

        <el-form-item label="Ghi chú" label-width="110px">
          <el-input :placeholder="note" disabled></el-input>
        </el-form-item>

        <el-form-item label="Trạng thái(*)" label-width="110px">
          <el-input :placeholder="status" disabled></el-input>
        </el-form-item>

      </el-form>
    </div></el-col>
    <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
      <el-form>
        <el-form-item label="Số tiền(*)" label-width="110px">
          <el-input placeholder="Mời nhập" v-model="price_input"></el-input>
          <span v-if="is_number(price_input) === false" style="color: #dc3545!important">*Số tiền nhập vào không hợp lệ</span>
        </el-form-item>

        <el-form-item label="Chiết suất (%)" label-width="110px">
          <el-input placeholder="Mời nhập" v-model="extract_input"></el-input>
          <span v-if="is_number(extract_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
        </el-form-item>

        <el-form-item label="Bớt tiền" label-width="110px">
          <el-input placeholder="Mời nhập" v-model="discount_input"></el-input>
          <span v-if="is_number(discount_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
        </el-form-item>

        <el-form-item label="Tổng(*)" label-width="110px">
          <el-input placeholder="Mời nhập" v-model="total_input"></el-input>
          <span v-if="is_number(total_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
        </el-form-item>

        <el-form-item label="Đã thanh toán(*)" label-width="110px">
          <el-input placeholder="Mời nhập" v-model="paid_input"></el-input>
          <span v-if="is_number(paid_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
        </el-form-item>

        <el-form-item label="Còn nợ(*)" label-width="110px">
          <el-input placeholder="Mời nhập" v-model="unpaid_input"></el-input>
          <span v-if="is_number(unpaid_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
        </el-form-item>
      </el-form>
    </div></el-col>
  </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
      <el-button type="primary"  :loading="loading" @click="edit">Cập nhật</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { NUMBER_VALIDATOR } from '@/constants'
import { TRANSACTION_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      code: '',
      product_name: '',
      customer_name: '',
      bank_name: '',
      note: '',
      status: '',
      price_input: '',
      extract_input: '',
      discount_input: '',
      total_input: '',
      paid_input: '',
      unpaid_input: '',
      transaction: {},
      dialogVisible: false,
      loading: false
    }
  },
  methods: {
    open (transaction) {
      this.price_input = transaction.cost
      this.extract_input = transaction.extracts
      this.discount_input = transaction.discount
      this.total_input = transaction.total
      this.paid_input = transaction.paid
      this.unpaid_input = transaction.owed
      this.code = transaction.code
      this.product_name = transaction.product.name
      this.customer_name = transaction.customer.name
      this.bank_name = transaction.bankAccount.bankName
      this.note = transaction.note
      this.status = transaction.status
      this.transaction = transaction
      this.dialogVisible = true
    },
    async edit () {
      if (this.common_data.navigation.TRANSACTION.putMethod === 0) {
        return
      }
      if (this.check_null_before_create() === false) {
        return
      }

      if (this.validate_number_before_create() === false) {
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        'id': this.transaction.id,
        'bankAccount': {'id': this.transaction.bankAccount.id},
        'customer': {'id': this.transaction.customer.id},
        'product': {'id': this.transaction.product.id},
        'status': this.transaction.input,
        'code': this.transaction.code,
        'cost': this.price_input,
        'extracts': this.extract_input,
        'discount': this.discount_input,
        'total': this.total_input,
        'paid': this.paid_input,
        'owed': this.unpaid_input
      }
      const response = await this.$services.do_request('put', TRANSACTION_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Thay đổi giao dịch thành công')
        this.transaction.cost = this.price_input
        this.transaction.extracts = this.extract_input
        this.transaction.discount = this.discount_input
        this.transaction.total = this.total_input
        this.transaction.paid = this.paid_input
        this.transaction.owed = this.unpaid_input
        this.$emit('transaction_edited', this.transaction)
        this.dialogVisible = false
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    },
    load_bank_data (bank) {
      this.bank_list = bank
    },
    load_product_data (product) {
      this.product_list = product
    },
    load_customer_data (customer) {
      this.customer_list = customer
    },
    is_number (input) {
      if (input.length === 0) return true
      return NUMBER_VALIDATOR.test(input)
    },
    validate_number_before_create () {
      if (this.is_number(this.price_input) === false) {
        this.$message.error('Số tiền nhập vào không hợp lệ')
        return false
      } else if (this.is_number(this.extract_input) === false) {
        this.$message.error('Chiết suất nhập vào không hợp lệ')
        return false
      } else if (this.is_number(this.discount_input) === false) {
        this.$message.error('Bớt tiền nhập vào không hợp lệ')
        return false
      } else if (this.is_number(this.total_input) === false) {
        this.$message.error('Tổng nhập vào không hợp lệ')
        return false
      } else if (this.is_number(this.paid_input) === false) {
        this.$message.error('Đã thanh toán nhập vào không hợp lệ')
        return false
      } else if (this.is_number(this.unpaid_input) === false) {
        this.$message.error('Còn nợ nhập vào không hợp lệ')
      } else {
        return true
      }
    },
    check_null_before_create () {
      if (this.price_input === '') {
        this.$message.error('Số tiền không được để trống')
        return false
      } else if (this.discount_input === '') {
        this.$message.error('Bớt tiền không được để trống')
        return false
      } else if (this.total === '') {
        this.$message.error('Tổng không được để trống')
        return false
      } else if (this.paid_input === '') {
        this.$message.error('Đã thanh toán không được để trống')
        return false
      } else if (this.unpaid_input === '') {
        this.$message.error('Còn nợ không được để trống')
        return false
      } else {
        return true
      }
    },
    handleClose (done) {
      this.$confirm('Bạn muốn hủy bỏ việc tạo mới giao dịch ?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped="">
.el-input, el-input__inner {
  width: 218px;
}
.el-input--suffix .el-input__inner {
  width: 200px
}
</style>
