<template lang="html">
<section style="text-align: left">
  <el-button @click="dialogVisible = true">Thêm mới giao dịch</el-button>

  <el-dialog
    title="Tạo mới giao dịch"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-row style="margin-top: 20px">
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <el-form>
          <el-form-item label="Mã giao dịch" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="code_input"></el-input>
          </el-form-item>

          <el-form-item label="Sản phẩm" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="product_input"></el-input>
          </el-form-item>

          <el-form-item label="Người giao dịch" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="owner_input"></el-input>
          </el-form-item>

          <el-form-item label="Ngân hàng" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="bank_input"></el-input>
          </el-form-item>

          <el-form-item label="Ghi chú" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="note_input"></el-input>
          </el-form-item>
        </el-form>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
        <el-form>
          <el-form-item label="Số tiền" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="price_input"></el-input>
            <span v-if="is_number(price_input) === false" style="color: #dc3545!important">*Số tiền nhập vào không hợp lệ</span>
          </el-form-item>

          <el-form-item label="Chiết suất (%)" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="extract_input"></el-input>
          </el-form-item>

          <el-form-item label="Bớt tiền" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="discount_input"></el-input>
            <span v-if="is_number(discount_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </el-form-item>

          <el-form-item label="Tổng" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="total_input"></el-input>
            <span v-if="is_number(total_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </el-form-item>

          <el-form-item label="Đã thanh toán" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="paid_input"></el-input>
            <span v-if="is_number(paid_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </el-form-item>

          <el-form-item label="Còn nợ" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="unpaid_input"></el-input>
            <span v-if="is_number(unpaid_input) === false" style="color: #dc3545!important">*Tham số nhập vào không hợp lệ</span>
          </el-form-item>
        </el-form>
      </div></el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="dialogVisible = false">Tạo mới</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { NUMBER_VALIDATOR } from '@/constants'

export default {
  data () {
    return {
      code_input: '',
      product_input: '',
      owner_input: '',
      bank_input: '',
      note_input: '',
      price_input: '',
      extract_input: '',
      discount_input: '',
      total_input: '',
      paid_input: '',
      unpaid_input: '',
      dialogVisible: false
    }
  },
  methods: {
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
  width: 100%;
}
</style>
