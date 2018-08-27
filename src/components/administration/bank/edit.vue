<template>
<section>
  <el-dialog title="Sửa thông tin ngân hàng" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên tài khoản" :label-width="formLabelWidth">
        <el-input v-model="userName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Ngân hàng" :label-width="formLabelWidth">
        <el-input v-model="bankName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Số tài khoản" :label-width="formLabelWidth">
        <el-input v-model="accountNumber" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Chi nhánh" :label-width="formLabelWidth">
        <el-input v-model="branch" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="edit">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      bankName: '',
      accountNumber: '',
      branch: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      bank: {}
    }
  },
  methods: {
    open (bank) {
      console.log('bank open', bank)
      this.userName = bank.userName
      this.bankName = bank.bankName
      this.accountNumber = bank.accountNumber
      this.branch = bank.branch
      this.bank = bank
      this.dialogFormVisible = true
    },
    edit () {
      this.bank.userName = this.userName
      this.bank.bankName = this.bankName
      this.bank.accountNumber = this.accountNumber
      this.bank.branch = this.branch
      this.$emit('bank_edited', this.bank)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="css">
</style>
