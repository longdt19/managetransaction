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
      <el-button type="primary" @click="delete_transaction" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { TRANSACTION_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      id: null,
      centerDialogVisible: false,
      loading: false
    }
  },
  methods: {
    open (id) {
      this.id = null
      this.id = id
      this.centerDialogVisible = true
    },
    async delete_transaction () {
      if (this.common_data.navigation.TRANSACTION.deleteMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }

      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('delete', TRANSACTION_URL + '/' + this.id)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Xóa giao dịch thành công')
        this.$parent.load_transaction_list()
        this.centerDialogVisible = false
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Xóa giao dịch thất bại')
      } else {
        this.$router.push('/e-500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
