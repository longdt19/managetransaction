<template>
<section>
  <el-dialog
    title="Cảnh báo"
    :visible.sync="centerDialogVisible"
    width="400px"
    center>
    <div class="" style="text-align: center">
      <span>Sau khi xóa sẽ không thể phục hồi.</span>
    </div>
    <div class="" style="text-align: center">
      <span>Bạn muốn tiếp tục thao tác ?</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="delete_product" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { PRODUCT_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      ids: null,
      centerDialogVisible: false,
      loading: false
    }
  },
  methods: {
    open (product) {
      this.ids = null
      this.ids = product.id
      console.log('ids', this.ids)
      this.centerDialogVisible = true
    },
    async delete_product () {
      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('delete', PRODUCT_URL + '/' + this.ids)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Xóa sản phẩm thành công')
        this.$emit('product_deleted')
        this.centerDialogVisible = false
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Xóa sản phẩm thất bại')
      } else {
        this.$router.push('/e-500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
