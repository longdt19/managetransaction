<template>
<section>
  <el-dialog title="Tạo mới ngân hàng" :visible.sync="dialogFormVisible" width="500px">
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
      <el-button type="primary" @click="dialogFormVisible = false">Xác nhận</el-button>
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
      dialogFormVisible: false
    }
  },
  methods: {
    open () {
      console.log('bank open')
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="css">
</style>
