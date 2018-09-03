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

      <el-form-item label="Nhóm khách hàng(*)" :label-width="formLabelWidth">
        <el-select v-model="group" filterable placeholder="Chọn sản phẩm" clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0">
          <el-option
            v-for="item in group_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :name="item.name">
          </el-option>
        </el-select>
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

      <el-form-item label="Nợ trước" :label-width="formLabelWidth">
        <el-input v-model="debtBefore" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Ghi chú" :label-width="formLabelWidth">
        <el-input v-model="note" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="edit" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { PHONE_VALIDATOR } from '@/constants'
import { CUSTOMER_URL, CUSTOMER_GROUP_LIST_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      name: '',
      azAccount: '',
      phone: '',
      address: '',
      province: '',
      note: '',
      debtBefore: '',
      group: '',
      group_list: '',
      formLabelWidth: '150px',
      dialogFormVisible: false,
      customer: {},
      loading: false
    }
  },
  methods: {
    open (customer) {
      this.name = customer.name
      this.azAccount = customer.azAccount
      this.phone = customer.phone
      this.address = customer.address
      this.province = customer.province
      this.debtBefore = customer.debtBefore
      this.group = customer.customerGroup.id
      this.note = customer.note
      this.customer = customer
      this.dialogFormVisible = true
      console.log('group', this.group)
    },
    async load_customer_group_list () {
      if (this.common_data.navigation.CAT_CUSTOMER.postMethod === 0) {
        return false
      }
      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('get', CUSTOMER_GROUP_LIST_URL)
      this.loading = false

      if (response.data.message === 'Success') {
        this.group_list = response.data.data
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    },
    async edit () {
      if (this.common_data.navigation.CAT_CUSTOMER.putMethod === 0) {
        return
      }
      if (this.validate_input() === false) {
        return
      }
      if (this.validate_phone(this.phone) === false) {
        this.$message.error('Số điện thoại không hợp lệ')
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        'id': this.customer.id,
        'name': this.name,
        'azAccount': this.azAccount,
        'phone': this.phone,
        'address': this.address,
        'province': this.province,
        'debtBefore': this.debtBefore,
        'customerGroup': this.group,
        'note': this.note
      }

      const response = await this.$services.do_request('put', CUSTOMER_URL, data)
      console.log('response', response)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$emit('customer_edited', this.customer)
        this.$message.success('Cập nhật khách hàng thành công')
        this.dialogFormVisible = false
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    },
    validate_phone (phone) {
      if (phone === '') return null
      return PHONE_VALIDATOR.test(phone.trim())
    },
    validate_input () {
      if (this.name === '') {
        this.$message.error('Tên khách hàng không dược để trống')
        return false
      }
      if (this.azAccount === '') {
        this.$message.error('Tên tài khoản không được để trống')
        return false
      }
      if (this.group === '') {
        this.$message.error('Nhóm khách hàng không được để trống')
        return false
      }
      return true
    }
  },
  created () {
    this.load_customer_group_list()
  }
}
</script>

<style lang="css">
</style>
