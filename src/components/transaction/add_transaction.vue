<template lang="html">
<section style="text-align: left">
  <el-button @click="dialogVisible = true" type="primary"  :disabled="common_data.navigation.TRANSACTION.postMethod === 0">
    <i class="el-icon-plus" style="margin-right: 10px" />
    Thêm mới giao dịch
  </el-button>

  <el-dialog
    title="Tạo mới giao dịch"
    :visible.sync="dialogVisible"
    width="75%"
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
                v-for="item in product_list"
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
                v-for="item in customer_list"
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
            <el-select v-model="input_bank" placeholder="Chọn ngân hàng" filterable clearable  style="width: 250px">
              <el-option
                v-for="item in bank_list"
                :key="item.id"
                :label="item.bankName"
                :value="item.id"
                :name="item.bankAccount">
                <span style="float: left">{{ item.bankName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userName }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Ghi chú" label-width="130px">
            <el-input  v-model="note_input"></el-input>
          </el-form-item>

          <el-form-item label="Trạng thái(*)" label-width="130px">
            <el-select v-model="input_status.input" filterable placeholder="Chọn trạng thái" clearable style="width: 250px">
              <el-option
                v-for="item in input_status.select"
                :key="item.id"
                :label="item.label"
                :value="item.id"
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
              <vue-numeric  separator="," v-model="extract_input" class="mngt-input"></vue-numeric>
            </div>
          </el-form-item>

          <el-form-item label="Bớt tiền" label-width="130px">
            <div class="">
              <vue-numeric  separator="," v-model="discount_input" class="mngt-input"></vue-numeric>
            </div>
          </el-form-item>

          <el-form-item v-if="input_status.input === 3 || input_status.input === 2" label="Phí ngân hàng" label-width="130px">
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
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="create" :loading="loading">Tạo mới</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { NUMBER_VALIDATOR } from '@/constants'
import { TRANSACTION_URL } from '@/constants/endpoints'
import getDays from '@/utils/day'

export default {
  data () {
    return {
      input_customer: '',
      input_product: '',
      input_bank: '',
      bank_list: [],
      product_list: [],
      customer_list: [],
      code_input: '',
      bank_input: '',
      note_input: '',
      price_input: '',
      extract_input: '',
      discount_input: '',
      total_input: '',
      paid_input: '',
      unpaid_input: '',
      bank_fee: '',
      created_input: '',
      input_status: {
        input: null,
        select: [
          {
            id: 1,
            label: 'Xuất'
          },
          {
            id: 2,
            label: 'Nhập'
          },
          {
            id: 3,
            label: 'Hoàn tiền'
          }
        ]
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
    'input_status.input' (val) {
      this.status = val
      if (this.status === 1 || val === '') {
        this.bank_fee = 0
        this.auto_complete()
      }
    }
  },
  methods: {
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
        'customer': {'id': this.input_customer},
        'product': {'id': this.input_product},
        'code': this.code_input,
        'cost': this.price_input,
        'extracts': this.extract_input,
        'discount': this.discount_input,
        'total': this.total_input,
        'paid': this.paid_input,
        'owed': this.unpaid_input,
        'status': this.input_status.input,
        'note': this.note_input,
        'bankFee': this.bank_fee
      }
      if (this.input_bank !== '') {
        formData['bankAccount'] = {'id': this.input_bank}
      }

      const response = await this.$services.do_request('post', TRANSACTION_URL, formData)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Tạo mới giao dịch thành công')
        this.$emit('transaction_added')
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
      if (this.code_input === '') {
        this.$message.error('Mã giao dịch không được để trống')
        return false
      } else if (this.input_product === '') {
        this.$message.error('Sản phẩm không được để trống')
        return false
      } else if (this.input_customer === '') {
        this.$message.error('Người giao dịch không được để trống')
        return false
      } else if (this.input_status === '') {
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
      } else if (!this.input_status.input) {
        this.$message.error('Trạng thái không được để trống')
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
