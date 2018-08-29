<template lang="html">
<section style="text-align: left">
  <el-button @click="dialogVisible = true" type="primary"><i class="el-icon-plus" style="margin-right: 10px" />Thêm mới giao dịch</el-button>

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
            <el-input placeholder="Mời nhập" v-model="code_input"></el-input>
          </el-form-item>

          <el-form-item label="Sản phẩm(*)" label-width="110px">
            <el-select v-model="input_product" filterable placeholder="Chọn sản phẩm" clearable>
              <el-option
                v-for="item in product_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :name="item.type">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Người giao dịch(*)" label-width="110px">
            <el-select v-model="input_customer" placeholder="Chọn khách hàng" filterable clearable>
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

          <el-form-item label="Ngân hàng(*)" label-width="110px">
            <el-select v-model="input_bank" placeholder="Chọn ngân hàng" filterable clearable>
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

          <el-form-item label="Ghi chú" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="note_input"></el-input>
          </el-form-item>

          <el-form-item label="Trạng thái(*)" label-width="110px">
            <el-select v-model="input_status.input" filterable placeholder="Chọn trạng thái" clearable>
              <el-option
                v-for="item in input_status.select"
                :key="item.id"
                :label="item.label"
                :value="item.id"
                :name="item.label">
              </el-option>
            </el-select>
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
      <el-button type="primary" @click="create" :loading="loading">Tạo mới</el-button>
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
            label: 'Tồn'
          }
        ]
      },
      dialogVisible: false,
      loading: false
    }
  },
  methods: {
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
      }

      return true
    },
    async create () {
      if (this.validate_number_before_create() === false) {
        return
      }

      if (this.loading) return
      this.loading = true

      let formData = {
        'bankAccount': {'id': this.input_bank},
        'customer': {'id': this.input_customer},
        'product': {'id': this.input_product},
        'code': this.code_input,
        'cost': this.price_input,
        'extracts': this.extract_input,
        'discount': this.discount_input,
        'total': this.total_input,
        'paid': this.paid_input,
        'owed': this.unpaid_input,
        'status': this.input_status.input
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
