<template>
<section>
  <el-dialog title="Tạo mới ngân hàng" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên tài khoản(*)" :label-width="formLabelWidth">
        <el-input v-model="userName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Ngân hàng(*)" :label-width="formLabelWidth">
        <el-input v-model="bankName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Số tài khoản(*)" :label-width="formLabelWidth">
        <el-input v-model="accountNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="validate_number(accountNumber) === false" style="text-align: left; margin-top: -20px" label-width="110px">
        <span style="color: #dc3545!important">* Số tài khoản không hợp lệ</span>
      </el-form-item>

      <el-form-item label="Số dư" :label-width="formLabelWidth">
        <el-input v-model="balance" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="validate_number(balance) === false" style="text-align: left; margin-top: -20px" label-width="110px">
        <span style="color: #dc3545!important">* Số dư không hợp lệ</span>
      </el-form-item>

      <el-form-item label="Chi nhánh" :label-width="formLabelWidth">
        <el-input v-model="branch" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="add" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { NUMBER_VALIDATOR } from '@/constants'
import { BANK_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      userName: '',
      bankName: '',
      accountNumber: '',
      branch: '',
      balance: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      loading: false
    }
  },
  methods: {
    validate_number (number) {
      if (number === '') return null
      return NUMBER_VALIDATOR.test(number.trim())
    },
    open () {
      this.dialogFormVisible = true
    },
    async add () {
      if (this.common_data.navigation.CAT_BANK.postMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }
      if (this.validate_input() === false) {
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        userName: this.userName,
        bankName: this.bankName,
        accountNumber: this.accountNumber,
        branch: this.branch,
        balance: this.balance
      }

      const response = await this.$services.do_request('post', BANK_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$parent.load_bank_list()
        this.$message.success('Thêm mới ngân hàng thành công')
        this.dialogFormVisible = false
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    },
    validate_input () {
      if (this.userName === '') {
        this.$message.error('Tên tài khoản không được để trống')
        return false
      }

      if (this.bankName === '') {
        this.$message.error('Tên ngân hàng không được để trống')
        return false
      }

      if (this.accountNumber === '') {
        this.$message.error('Số tài khoản không được để trống')
        return false
      }
      if (this.validate_number(this.accountNumber) === false) {
        this.$message.error('Số tài khoản không hợp lệ')
        return false
      }

      if (this.validate_number(this.balance) === false) {
        this.$message.error('Số dư không hợp lệ')
        return false
      }

      return true
    }
  }
}
</script>

<style lang="css">
</style>
