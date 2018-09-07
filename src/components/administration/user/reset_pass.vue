<template>
<section>
  <el-dialog
    title="Cảnh báo"
    :visible.sync="centerDialogVisible"
    width="400px"
    center>
    <div class="" style="text-align: center">
      <span>Mật khẩu sẽ được tạo mới và trả về</span>
    </div>
    <div class="" style="text-align: center">
      <span>Bạn muốn tiếp tục thao tác ?</span>
    </div>
    <div class="" style="text-align: center; margin-top: 30px" v-if="display_newpass == true">
      <span style="color: #dc3545!important">Mật khẩu mới của người dùng là: {{new_pass}}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="centerDialogVisible = false">Hủy bỏ</el-button>
      <el-button size="mini" type="primary" @click="reset_pass" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { USER_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      ids: null,
      centerDialogVisible: false,
      loading: false,
      display_newpass: false,
      new_pass: ''
    }
  },
  methods: {
    open (user) {
      this.display_newpass = false
      this.ids = null
      this.ids = user.id
      this.centerDialogVisible = true
    },
    async reset_pass () {
      if (this.common_data.navigation.AD_USER.putMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }
      if (this.loading) return
      this.loading = true
      const URL_RQ = USER_URL + `/${this.ids}/reset-password`
      const response = await this.$services.do_request('put', URL_RQ)
      this.loading = false
      if (response.data.message === 'Success') {
        this.new_pass = response.data.data
        this.display_newpass = true
        this.$message.success('Thay đổi mật khẩu thành công')
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
