<template lang="html">
<section style="text-align: left">
  <el-dialog
    title="Sửa giao dịch"
    :visible.sync="dialogVisible"
    width="75%"
  >
  <el-row style="margin-top: 20px">
    <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
      <el-form>
        <el-form-item label="Mã giao dịch(*)" label-width="130px">
          <el-input v-model="code" style="width: 250px"></el-input>
        </el-form-item>

        <el-form-item label="Sản phẩm(*)" label-width="130px">
          <el-select v-model="product_name" filterable placeholder="Chọn sản phẩm" clearable  style="width: 250px">
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
          <el-select v-model="customer_name" placeholder="Chọn khách hàng" filterable clearable  style="width: 250px">
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

        <el-form-item label="Ngân hàng(*)" label-width="130px">
          <el-select v-model="bank_name" placeholder="Chọn ngân hàng" filterable clearable  style="width: 250px">
            <el-option
              v-for="item in bank_list"
              :key="item.id"
              :label="item.bankName"
              :value="item.id"
              >
              <span style="float: left">{{ item.bankName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userName }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Ghi chú" label-width="130px">
          <el-input :placeholder="note" v-model="note" style="width: 250px"></el-input>
        </el-form-item>

        <el-form-item label="Trạng thái(*)" label-width="130px">
          <!-- <el-input :placeholder="status_list[status-1]" disabled></el-input> -->
          <el-select v-model="input_status.input" filterable placeholder="Chọn trạng thái" clearable style="width: 250px">
            <el-option
              v-for="item in input_status.select"
              :key="item.id"
              :label="item.label"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div></el-col>
    <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
      <el-form>
        <el-form-item label="Số tiền(*)" label-width="130px">
          <div class="">
            <!-- <el-input placeholder="Mời nhập" v-model="price_input"></el-input> -->
            <vue-numeric  separator="," v-model="price_input" class="mngt-input"></vue-numeric>
          </div>
        </el-form-item>

        <el-form-item label="Chiết suất (%)" label-width="130px">
          <div class="">
            <!-- <el-input placeholder="Mời nhập" v-model="extract_input"></el-input> -->
            <vue-numeric  separator="," v-model="extract_input" class="mngt-input"></vue-numeric>
          </div>
          <!-- <div class="">
            <span v-if="is_number(extract_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </div> -->
        </el-form-item>

        <el-form-item label="Bớt tiền" label-width="130px">
          <div class="">
            <!-- <el-input placeholder="Mời nhập" v-model="discount_input"></el-input> -->
            <vue-numeric  separator="," v-model="discount_input" class="mngt-input"></vue-numeric>
          </div>
          <!-- <div class="">
            <span v-if="is_number(discount_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </div> -->
        </el-form-item>

        <el-form-item v-if="status === 3 || status === 2" label="Phí ngân hàng" label-width="130px">
          <div class="">
            <vue-numeric  separator="," v-model="bank_fee" class="mngt-input"></vue-numeric>
          </div>
          <!-- <div class="">
            <span v-if="is_number(bank_fee) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </div> -->
        </el-form-item>

        <el-form-item label="Tổng(*)" label-width="130px">
          <div class="">
            <!-- <el-input placeholder="Mời nhập" v-model="total_input" disabled></el-input> -->
            <vue-numeric  separator="," v-model="total_input" class="mngt-input" disabled></vue-numeric>
          </div>
          <!-- <div class="">
            <span v-if="is_number(total_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </div> -->
        </el-form-item>

        <el-form-item label="Đã thanh toán(*)" label-width="130px">
          <div class="">
            <!-- <el-input placeholder="Mời nhập" v-model="paid_input"></el-input> -->
            <vue-numeric  separator="," v-model="paid_input" class="mngt-input" ></vue-numeric>
          </div>
          <!-- <div class="">
            <span v-if="is_number(paid_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </div> -->
        </el-form-item>

        <el-form-item label="Còn nợ(*)" label-width="130px">
          <div class="">
            <!-- <el-input placeholder="Mời nhập" v-model="unpaid_input" disabled></el-input> -->
            <vue-numeric  separator="," v-model="unpaid_input" class="mngt-input" disabled></vue-numeric>
          </div>
          <!-- <div class="">
            <span v-if="is_number(unpaid_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </div> -->
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
      status: 0,
      price_input: 0,
      extract_input: 0,
      discount_input: 0,
      total_input: 0,
      paid_input: 0,
      unpaid_input: 0,
      bank_fee: 0,
      transaction: {},
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
      status_list: ['Xuất', 'Nhập', 'Hoàn tiền'],
      bank_list: [],
      product_list: [],
      customer_list: [],
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
      console.log('123', val)
      if (typeof val === 'number' || val === '') {
        this.status = val
        if (this.status === 1 || this.status === '') {
          this.bank_fee = 0
          this.auto_complete()
        }
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
    open (transaction) {
      console.log('transaction', transaction)
      // this.status = transaction.status
      this.price_input = transaction.cost
      this.extract_input = transaction.extracts
      this.discount_input = transaction.discount
      this.total_input = transaction.total
      this.paid_input = transaction.paid
      this.unpaid_input = transaction.owed
      this.bank_fee = transaction.bankFee
      this.code = transaction.code
      this.product_name = transaction.product.id
      this.customer_name = transaction.customer.id
      this.note = transaction.note
      // this.input_status.input = this.status_list[transaction.status - 1]
      this.input_status.input = transaction.status

      if (transaction.bankAccount) this.bank_name = transaction.bankAccount.id
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

      this.auto_complete()
      console.log('transaction', this.transaction)
      let data = {
        'id': this.transaction.id,
        'customer': {'id': this.customer_name},
        'product': {'id': this.product_name},
        'status': this.input_status.input,
        'code': this.code,
        'cost': this.price_input,
        'extracts': this.extract_input,
        'discount': this.discount_input,
        'total': this.total_input,
        'paid': this.paid_input,
        'owed': this.unpaid_input,
        'note': this.note,
        'bankFee': this.bank_fee
      }

      if (this.bank_name) {
        data['bankAccount'] = {'id': this.bank_name}
      }
      console.log('data', data)
      const response = await this.$services.do_request('put', TRANSACTION_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Thay đổi giao dịch thành công')
        // update after edit
        this.total_input = this.price_input - this.extract_input * this.price_input / 100 - this.discount_input
        this.unpaid_input = this.total_input - this.paid_input

        this.transaction.cost = this.price_input
        this.transaction.extracts = this.extract_input
        this.transaction.discount = this.discount_input
        this.transaction.total = this.total_input
        this.transaction.paid = this.paid_input
        this.transaction.owed = this.unpaid_input
        this.transaction.note = this.note
        this.transaction.bankFee = this.bank_fee
        this.transaction.status = this.input_status.input
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
      } else if (!this.input_status.input) {
        this.$message.error('Trạng thái không được để trống')
        return false
      } else {
        return true
      }
    },
    load_bank_list (bank) {
      this.bank_list = bank
    },
    load_product_list (product) {
      this.product_list = product
    },
    load_customer_list (customer) {
      this.customer_list = customer
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
.mngt-input {
  width: 250px
}
</style>
