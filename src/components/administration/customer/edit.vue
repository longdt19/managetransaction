<template>
<section>
  <el-dialog title="Sửa thông tin ngân hàng" :visible.sync="dialogFormVisible" width="500px">
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
      <el-button type="primary" @click="edit">Xác nhận</el-button>
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
      dialogFormVisible: false,
      customer: {}
    }
  },
  methods: {
    open (customer) {
      this.name = customer.name
      this.azAccount = customer.azAccount
      this.phone = customer.phone
      this.address = customer.address
      this.customer = customer
      this.dialogFormVisible = true
    },
    edit () {
      this.customer.name = this.name
      this.customer.azAccount = this.azAccount
      this.customer.phone = this.phone
      this.customer.address = this.address
      this.$emit('customer_edited', this.customer)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="css">
</style>
