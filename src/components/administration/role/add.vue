<template>
  <el-dialog title="Thêm mới người dùng" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên quyền(*)" :label-width="formLabelWidth">
        <el-input v-model="name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Mã quyền" :label-width="formLabelWidth">
        <el-input v-model="code" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="add_role" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ROLE_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      code: '',
      name: '',
      formLabelWidth: '150px',
      dialogFormVisible: false,
      loading: false
    }
  },
  methods: {
    open () {
      this.dialogFormVisible = true
    },
    async add_role () {
      if (this.common_data.navigation.AD_ROLE.postMethod === 0) {
        return
      }
      if (this.validate_input() === false) {
        return
      }
      if (this.loading) return
      this.loading = true

      const data = {
        code: 'ROLE_' + this.code.toUpperCase(),
        name: this.name
      }

      const response = await this.$services.do_request('post', ROLE_URL, data)
      if (response.data.message === 'Success') {
        this.$message.success('Thêm quyền hạn thành công')
        this.$parent.load_role_list()
        this.dialogFormVisible = false
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Thêm mới người dùng thất bại')
      } else {
        this.$router.push('/e-500')
      }
    },
    validate_input () {
      if (this.name === '') {
        this.$message.error('Tên quyền không dược để trống')
        return false
      }
      if (this.code === '') {
        this.$message.error('Mã quyền không được để trống')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="css">
</style>
