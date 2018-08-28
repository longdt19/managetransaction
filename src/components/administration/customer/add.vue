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
      <el-form-item v-if="validate_phone(phone) === false" style="text-align: left; margin-top: -20px" label-width="110px">
        <span style="color: #dc3545!important">* Số điện thoại không hợp lệ</span>
      </el-form-item>

      <el-form-item label="Tỉnh" :label-width="formLabelWidth">
        <el-input v-model="province" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Địa chỉ" :label-width="formLabelWidth">
        <el-input v-model="address" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Nhóm khách hàng" :label-width="formLabelWidth">
        <el-input v-model="group" auto-complete="off"></el-input>
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
import { PHONE_VALIDATOR } from '@/constants'
import { CUSTOMER_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      name: '',
      azAccount: '',
      phone: '',
      address: '',
      group: '',
      province: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      loading: false
    }
  },
  methods: {
    validate_phone (phone) {
      if (phone === '') return null
      return PHONE_VALIDATOR.test(phone.trim())
    },
    open () {
      this.dialogFormVisible = true
    },
    async add () {
      if (this.name === '' || this.azAccount === '' || this.phone === '' || this.address === '') {
        this.$message.error('Các trường không được để trống')
        return
      }

      if (this.validate_phone(this.phone) === false) {
        this.$message.error('Số điện thoại không hợp lệ')
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        name: this.name,
        azAccount: this.azAccount,
        phone: this.phone,
        address: this.address,
        customerGroup: this.group,
        province: this.province
      }

      const response = await this.$services.do_request('post', CUSTOMER_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$parent.loading_customer_list()
        this.$message.success('Thêm mới khách hàng thành công')
        this.dialogFormVisible = false
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
