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
      <el-button type="primary" @click="delete_role" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { ROLE_URL } from '@/constants/endpoints'

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
    async delete_role () {
      if (this.common_data.navigation.AD_ROLE.deleteMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }

      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('delete', ROLE_URL + '/' + this.id)
      this.loading = false

      console.log('response', response)
      if (response.data.message === 'Success') {
        this.$message.success('Xóa nhóm người dùng thành công')
        this.$parent.load_role_list()
        this.centerDialogVisible = false
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Xóa nhóm người dùng thất bại')
      } else {
        this.$router.push('/e-500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
