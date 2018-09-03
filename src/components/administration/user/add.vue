<template>
  <el-dialog title="Thêm mới người dùng" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên đăng nhập(*)" :label-width="formLabelWidth">
        <el-input v-model="username" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Email" :label-width="formLabelWidth">
        <el-input v-model="email" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Quyền hạn(*)" :label-width="formLabelWidth">
        <el-select v-model="role_id" placeholder="Chọn quyền">
          <el-option
            v-for="role in role_list"
            :label="role.name"
            :key="role.id"
            :value="role.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Mật khẩu(*)" :label-width="formLabelWidth">
        <el-input v-model="password1" type="password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Nhập lại mật khẩu(*)" :label-width="formLabelWidth">
        <el-input v-model="password2" type="password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="create_user" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { USER_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      username: '',
      password1: '',
      password2: '',
      email: '',
      formLabelWidth: '150px',
      dialogFormVisible: false,
      loading: false,
      role_list: [],
      role_id: null
    }
  },
  methods: {
    open (role_list) {
      this.role_list = role_list
      this.dialogFormVisible = true
    },
    async create_user () {
      if (this.common_data.navigation.AD_USER.postMethod === 0) {
        return
      }

      if (this.username === '' || this.password1 === '' || this.password2 === '' || this.role === '') {
        this.$message.error('Trường bắt buộc không được để trống')
        return
      }

      if (this.password1 !== this.password2) {
        this.$message.error('Mật khẩu không trùng nhau')
        return
      }
      if (this.loading) return
      this.loading = true

      const data = {
        username: this.username,
        password: this.password1,
        email: this.email,
        role: {
          id: this.role_id
        }
      }
      const response = await this.$services.do_request('post', USER_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.$message.success('Thêm mới người dùng thành công')
        this.$emit('user_created')
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Thêm mới người dùng thất bại')
      } else {
        this.$router.push('/e-500')
      }
    }
  }
}
</script>

<style lang="css">
</style>
