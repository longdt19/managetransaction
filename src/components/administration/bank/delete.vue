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
      <el-button type="primary" @click="delete_bank" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { BANK_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      ids: null,
      centerDialogVisible: false,
      loading: false
    }
  },
  methods: {
    open (bank) {
      this.ids = null
      this.ids = bank.id
      this.centerDialogVisible = true
    },
    async delete_bank () {
      if (this.common_data.navigation.CAT_BANK.deleteMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }
      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('delete', BANK_URL + '/' + this.ids)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Xóa ngân hàng thành công')
        this.$emit('bank_deleted')
        this.centerDialogVisible = false
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Xóa ngân hàng thất bại. Do còn giao dịch')
      } else {
        this.$router.push('/e-500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
