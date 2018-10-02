<template>
  <el-dialog title="Bảng phân quyền chức năng" :visible.sync="dialogTableVisible" width="850px">
    <el-table :data="dataTable" v-loading="loading">
      <el-table-column label="Tên" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.navigation.name}}
        </template>
      </el-table-column>

      <el-table-column label="Có quyền xem" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.getMethod"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền sửa" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.putMethod"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền thêm" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.postMethod"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Có quyền xóa" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.deleteMethod"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Cho phép" header-align="center" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" align="center">
        <template slot-scope="scope">
            <el-button size="mini" @click="update(scope.row)" :loading="loading_btn">Cập nhật</el-button>
          </template>
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">Hủy bỏ</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ROLE_NAVIGATION_URL, BASE } from '@/constants/endpoints'

export default {
  data () {
    return {
      dataTable: [],
      dialogTableVisible: false,
      role: null,
      loading: false,
      loading_btn: false
    }
  },
  methods: {
    async update (row) {
      if (this.common_data.navigation.AD_ROLE.putMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }
      if (row.role.id === 1) {
        this.$message.error('Quyền của Admin không được phép thay đổi')
        return
      }

      if (this.loading_btn) return
      this.loading_btn = true

      const data = {
        'id': row.id,
        'navigation': {
          'id': row.navigation.id
        },
        'role': {
          'id': row.role.id
        },
        'getMethod': this.reverse_method(row.getMethod),
        'postMethod': this.reverse_method(row.postMethod),
        'putMethod': this.reverse_method(row.putMethod),
        'deleteMethod': this.reverse_method(row.deleteMethod),
        'status': this.reverse_method(row.status)
      }

      const response = await this.$services.do_request('put', ROLE_NAVIGATION_URL, data)
      this.loading_btn = false

      if (response.data.message === 'Success') {
        this.$message.success('Cập nhật thành công')
        this.$emit('user_created')
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Cập nhật thất bại')
      } else {
        this.$router.push('/e-500')
      }
    },
    open (role) {
      this.role = role
      this.dialogTableVisible = true
      if (this.role) {
        this.load_role()
      }
    },
    async load_role () {
      if (this.loading) return
      this.loading = true

      const URL = BASE + `/api/az/mngt/roles/${this.role.id}/navigations`
      const response = await this.$services.do_request('get', URL)
      this.loading = false

      if (response.data.message === 'Success') {
        this.dataTable = response.data.data
        this.dataTable.forEach(item => {
          item.getMethod = this.converse_method(item.getMethod)
          item.putMethod = this.converse_method(item.putMethod)
          item.postMethod = this.converse_method(item.postMethod)
          item.deleteMethod = this.converse_method(item.deleteMethod)
          item.status = this.converse_method(item.status)
        })
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    },
    converse_method (method) {
      if (method === 1) return true
      return false
    },
    reverse_method (method) {
      if (method) return 1
      return 0
    }
  }
}
</script>

<style lang="css">
</style>
