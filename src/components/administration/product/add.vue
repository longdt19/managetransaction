<template>
<section>
  <el-dialog title="Tạo mới sản phẩm" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên sản phẩm(*)" :label-width="formLabelWidth">
        <el-input v-model="name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Mã sản phẩm(*)" :label-width="formLabelWidth">
        <el-input v-model="code" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Số dư" :label-width="formLabelWidth">
        <!-- <el-input v-model="balance" auto-complete="off"></el-input> -->
        <vue-numeric  separator="," v-model="balance" class="mngt-input"></vue-numeric>
      </el-form-item>
      <!-- <el-form-item v-if="validate_number(balance) === false" style="text-align: left; margin-top: -20px" label-width="110px">
        <span style="color: #dc3545!important">* Số dư không hợp lệ</span>
      </el-form-item> -->

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

import { PRODUCT_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      name: '',
      code: '',
      balance: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      loading: false
    }
  },
  methods: {
    open () {
      this.dialogFormVisible = true
    },
    async add () {
      if (this.common_data.navigation.CAT_PRODUCT.postMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }

      if (this.validate_input() === false) {
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        name: this.name,
        code: this.code,
        balance: this.balance
      }

      const response = await this.$services.do_request('post', PRODUCT_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$parent.load_product_list()
        this.$message.success('Thêm mới sản phẩm thành công')
        this.dialogFormVisible = false
      } else if (response.status === 400) {
        console.log('Bad request')
        this.$message.error('Thêm mới sản phẩm thành công')
      } else {
        this.$router.push('/e-500')
      }
    },
    validate_input () {
      if (this.name === '') {
        this.$message.error('Tên sản phẩm không được để trống')
        return false
      }
      if (this.code === '') {
        this.$message.error('Mã sản phẩm không được để trống')
        return false
      }

      return true
    },
    validate_number (number) {
      if (number === '') return null
      return NUMBER_VALIDATOR.test(number.trim())
    }
  }
}
</script>

<style lang="css">
</style>
