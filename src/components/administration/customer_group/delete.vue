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
      <el-button size="mini" @click="centerDialogVisible = false">Hủy bỏ</el-button>
      <el-button size="mini" type="primary" @click="delete_group" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { CUSTOMER_GROUP_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      ids: null,
      centerDialogVisible: false,
      loading: false
    }
  },
  methods: {
    open (group) {
      this.ids = null
      this.ids = group.id
      this.centerDialogVisible = true
    },
    async delete_group () {
      if (this.common_data.navigation.CAT_CUSTOMER_GR.deleteMethod === 0) {
        return
      }
      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('delete', CUSTOMER_GROUP_URL + '/' + this.ids)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Xóa nhóm người dùng thành công')
        this.$emit('group_deleted')
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
