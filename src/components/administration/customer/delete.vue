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
      <el-button type="primary" @click="delete_customer" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { CUSTOMER_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      ids: [],
      centerDialogVisible: false,
      loading: false
    }
  },
  methods: {
    open (customer) {
      this.ids = []
      this.ids.push(customer.id)
      this.centerDialogVisible = true
    },
    async delete_customer () {
      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('delete', CUSTOMER_URL, this.ids)
      this.loading = false
      console.log('response', response)
    }
  }
}
</script>

<style lang="css">
</style>
