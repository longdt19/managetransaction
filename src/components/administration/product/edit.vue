<template>
<section>
  <el-dialog title="Sửa thông tin sản phẩm" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Mã sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="code" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Số dư" :label-width="formLabelWidth">
        <!-- <el-input v-model="balance" auto-complete="off"></el-input> -->
        <vue-numeric  separator="," v-model="balance" class="mngt-input"></vue-numeric>
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
import { PRODUCT_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      name: '',
      code: '',
      type: '',
      balance: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      product: {},
      loading: false
    }
  },
  methods: {
    open (product) {
      this.name = product.name
      this.code = product.code
      this.balance = product.balance
      this.product = product
      this.dialogFormVisible = true
    },
    async edit () {
      if (this.common_data.navigation.CAT_PRODUCT.putMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }

      if (this.name === '' || this.code === '' || this.balance === '') {
        this.$message.error('Các trường không được để trống')
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        id: this.product.id,
        name: this.name,
        code: this.code,
        balance: this.balance
      }

      const response = await this.$services.do_request('put', PRODUCT_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.product.name = this.name
        this.product.code = this.code
        this.product.balance = this.balance
        this.$emit('product_edited', this.product)
        this.$message.success('Cập nhật sản phẩm thành công')
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
