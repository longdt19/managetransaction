<template>
<section>
  <el-dialog title="Tạo mới ngân hàng" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên khách hàng" :label-width="formLabelWidth">
        <el-input v-model="name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Tên tài khoản" :label-width="formLabelWidth">
        <el-input v-model="azAccount" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
        <el-input v-model="phone" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Địa chỉ" :label-width="formLabelWidth">
        <el-input v-model="address" auto-complete="off"></el-input>
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
      name: '',
      azAccount: '',
      phone: '',
      address: '',
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
