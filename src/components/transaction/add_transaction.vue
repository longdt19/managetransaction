<template lang="html">
<section style="text-align: right">
  <el-button @click="dialogVisible = true" type="primary"  :disabled="common_data.navigation.TRANSACTION.postMethod === 0">
    <i class="el-icon-plus" style="margin-right: 10px" />
    Thêm mới
  </el-button>

  <el-dialog
    title="Tạo mới"
    :visible.sync="dialogVisible"
    width="75%"
    style="text-align: left"
  >

    <el-row style="margin-top: 20px">
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <el-form>
          <el-form-item label="Mã giao dịch(*)" label-width="130px">
            <el-input  v-model="code_input"></el-input>
          </el-form-item>

          <el-form-item label="Sản phẩm(*)" label-width="130px">
            <el-select v-model="input_product" filterable placeholder="Chọn sản phẩm" clearable  style="width: 250px">
              <el-option
                v-for="item in product_list_loaded"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :name="item.type">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Người giao dịch(*)" label-width="130px">
            <el-select v-model="input_customer" placeholder="Chọn khách hàng" filterable clearable  style="width: 250px">
              <el-option
                v-for="item in customer_list_loaded"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :name="item.name">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.azAccount }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Ngân hàng" label-width="130px">
            <el-select v-model="input_bank" placeholder="Chọn ngân hàng" filterable clearable  style="width: 250px; border-color: red">
              <el-option
                style=" border-color: red"
                v-for="item in bank_list"
                :key="item.id"
                :label="item.bankName"
                :value="item.id"
                :name="item.bankAccount">
                <span style="float: left">{{ item.bankName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userName }}</span>
              </el-option>
            </el-select>
            <div class="">
              <span style="float: left; color: #F56C6C"
                v-if="check_paid_and_bank()"
              >
                *Ngân hàng không được bỏ trống
              </span>
            </div>

          </el-form-item>

          <el-form-item label="Ghi chú" label-width="130px">
            <el-input  v-model="note_input"></el-input>
          </el-form-item>

          <el-form-item label="Loại(*)" label-width="130px">
            <el-select v-model="input_type.input" filterable placeholder="Chọn loại" clearable style="width: 250px">
              <el-option
                v-for="item in input_type.select"
                :key="item.id"
                :label="item.label"
                :value="item.type"
                :name="item.label">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Ngày tạo" label-width="130px">
            <el-date-picker
              v-model="created_input"
              type="date"
              value-format="dd-MM-yyyy"
              format="dd-MM-yyyy"
            >
            </el-date-picker>
          </el-form-item>

        </el-form>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
        <el-form>
          <el-form-item label="Số tiền(*)" label-width="130px">
            <div class="">
              <vue-numeric  separator="," v-model="price_input" class="mngt-input"></vue-numeric>
            </div>
          </el-form-item>

          <el-form-item label="Chiết suất (%)" label-width="130px">
            <div class="">
              <el-input v-model="extract_input"></el-input>
            </div>
          </el-form-item>

          <el-form-item label="Bớt tiền" label-width="130px">
            <div class="">
              <vue-numeric  separator="," v-model="discount_input" class="mngt-input"></vue-numeric>
            </div>
          </el-form-item>

          <el-form-item v-if="input_type.input === 'NHAP' || input_type.input === 'HOAN_TIEN' " label="Phí ngân hàng" label-width="130px">
            <div class="">
              <vue-numeric  separator="," v-model="bank_fee" class="mngt-input"></vue-numeric>
            </div>
          </el-form-item>

          <el-form-item label="Tổng(*)" label-width="130px">
            <div class="">
              <vue-numeric  separator="," v-model="total_input" class="mngt-input" disabled></vue-numeric>
            </div>
          </el-form-item>

          <el-form-item label="Đã thanh toán(*)" label-width="130px">
            <div class="">
              <vue-numeric  separator="," v-model="paid_input" class="mngt-input"></vue-numeric>
            </div>
          </el-form-item>

          <el-form-item label="Còn nợ(*)" label-width="130px">
            <div class="">
              <vue-numeric  separator="," v-model="unpaid_input" class="mngt-input" disabled></vue-numeric>
            </div>
          </el-form-item>

        </el-form>
      </div></el-col>
      <div class="" style="text-align: right; margin-bottom: 20px">
        <span slot="footer" class="dialog-footer">
          <el-button @click="close_dialog()">Hủy bỏ</el-button>
          <el-button type="primary" @click="create" :loading="loading">Tạo mới</el-button>
        </span>
      </div>
    </el-row>

  </el-dialog>
</section>
</template>

<script>
import { NUMBER_VALIDATOR, TYPE_LIST_TRANSACTION } from '@/constants'
import { TRANSACTION_URL } from '@/constants/endpoints'
import getDays from '@/utils/day'

export default {
  props: ['bank_list', 'product_list_loaded', 'customer_list_loaded'],
  data () {
    return {
      input_customer: '',
      input_product: '',
      input_bank: '',
      product_list: [],
      customer_list: [],
      code_input: '',
      bank_input: '',
      note_input: '',
      price_input: '',
      extract_input: null,
      discount_input: '',
      total_input: '',
      paid_input: '',
      unpaid_input: '',
      bank_fee: '',
      created_input: '',
      input_type: {
        input: null,
        select: TYPE_LIST_TRANSACTION
      },
      dialogVisible: false,
      loading: false
    }
  },
  watch: {
    'price_input' (val) {
      this.auto_complete()
    },
    'extract_input' (val) {
      this.auto_complete()
    },
    'discount_input' (val) {
      this.auto_complete()
    },
    'paid_input' (val) {
      this.auto_complete()
    },
    'bank_fee' (val) {
      this.auto_complete()
    },
    'input_type.input' (val) {
      this.status = val
      if (this.status === 1 || val === '') {
        this.bank_fee = 0
        this.auto_complete()
      }
    }
  },
  methods: {
    close_dialog () {
      this.dialogVisible = false
    },
    check_paid_and_bank () {
      // display warning when paid_input != 0 and input_bank = 0
      if (this.paid_input) {
        if (this.input_bank) {
          return false
        }
        return true
      }
      return false
    },
    auto_complete () {
      this.total_input = this.price_input - this.extract_input * this.price_input / 100 - this.discount_input
      this.total_input = parseFloat(this.total_input)
      if (this.bank_fee) {
        this.total_input += parseFloat(this.bank_fee)
      } else {
        this.total_input += this.bank_fee
      }
      this.unpaid_input = this.total_input - this.paid_input
    },
    async create () {
      if (this.common_data.navigation.TRANSACTION.postMethod === 0) {
        this.$message.error('Bạn không có quyền hạn cho chức năng này')
        return
      }
      if (this.check_paid_and_bank() === true) {
        this.$message.error('Ngân hàng không được bỏ trống')
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

      if (this.bank_fee === '') {
        this.bank_fee = 0
      }

      this.auto_complete()
      let formData = {
        'customerId': this.input_customer,
        'productId': this.input_product,
        'code': this.code_input,
        'cost': this.price_input,
        'extracts': this.extract_input,
        'discount': this.discount_input,
        'total': this.total_input,
        'paid': this.paid_input,
        'owed': this.unpaid_input,
        'type': this.input_type.input,
        'note': this.note_input,
        'bankFee': this.bank_fee,
        'created': this.created_input
      }
      if (this.input_bank !== '') {
        formData['toBankAccountId'] = this.input_bank
      }

      const response = await this.$services.do_request('post', TRANSACTION_URL, formData)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Tạo mới giao dịch thành công')
        this.$emit('transaction_object_added')
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
      if (!input) return true
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
      if (this.code_input === '') {
        this.$message.error('Mã giao dịch không được để trống')
        return false
      } else if (this.input_product === '') {
        this.$message.error('Sản phẩm không được để trống')
        return false
      } else if (this.input_customer === '') {
        this.$message.error('Người giao dịch không được để trống')
        return false
      } else if (this.input_type === '') {
        this.$message.error('Trạng thái không được để trống')
        return false
      } else if (this.price_input === '') {
        this.$message.error('Số tiền không được để trống')
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
      } else if (!this.input_type.input) {
        this.$message.error('Loại không được để trống')
        return false
      } else {
        return true
      }
    }
  },
  created () {
    let days = getDays()
    this.created_input = days.to_date
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
