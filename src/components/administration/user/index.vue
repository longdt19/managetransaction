<template>
<section v-if="common_data.navigation.AD_USER.status === 1">
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách người dùng</span>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button @click="open_add_user" :disabled="common_data.navigation.AD_USER.postMethod === 0">
          Thêm mới
        </el-button>
      </div></el-col>
    </el-row>
  </div>

  <div class="" style="text-align: right; margin-bottom: 20px">
    <span>Hiển thị: </span>
    <el-select v-model="pagination.per_page" style="width: 80px">
      <el-option
        v-for="item in pagination.list"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>

  <el-table
    :data="dataTable"
    style="width: 100%"
    v-loading="loading"
    border
  >
    <el-table-column type="index" label="STT" width="50" align="center">
    </el-table-column>

    <el-table-column label="Ngày tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{converseTime(scope.row.created)}}
      </template>
    </el-table-column>

    <el-table-column label="Username" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.username}}
      </template>
    </el-table-column>

    <el-table-column label="Quyền hạn" header-align="center" align="center">
      <template slot-scope="scope">
        <el-dropdown :hide-on-click="false">
        <el-button type="success" :loading="loading_btn">{{scope.row.role.name}}</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in role_list"
              :key="item.name"
              @click.native="update_role(scope.row, item)"
              :disabled="disable_edit_role(scope.row, item) === true"
            >
              {{item.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>

    <el-table-column label="Email" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.email}}
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center" width="250">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" disabled>Xóa</el-button>

        <el-button size="mini" type="warning" @click="open_reset_pass(scope.row)" :disabled="common_data.navigation.AD_USER.putMethod === 0">
          <i class="el-icon-refresh"></i>
          Mật khẩu
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block" style="margin-top: 30px; text-align: right"
    v-if="common_data.navigation.AD_USER.getMethod === 1"
  >
    <el-pagination
      layout="prev, pager, next"
      :page-count="pagination.totalPage"
      :current-page.sync="pagination.page"
      @current-change="change_page"
      @prev-click="prev_page"
      @next-click="next_page"
    >
    </el-pagination>
  </div>
  <add-user-component ref='add_user' @user_created="user_created"/>
  <reset-password-component ref='reset_pass' />
</section>
</template>

<script>
import converseTime from '@/utils/time'

import { USER_URL, ROLE_URL } from '@/constants/endpoints'

import AddUserComponent from './add'
import ResetPasswordComponent from './reset_pass'

export default {
  components: { AddUserComponent, ResetPasswordComponent },
  data () {
    return {
      dataTable: [],
      pagination: {
        totalPage: null,
        totalElement: null,
        page: 1,
        per_page: 10,
        list: [10, 20, 30]
      },
      loading: false,
      loading_btn: false,
      role_list: []
    }
  },
  watch: {
    'pagination.per_page' (val) {
      if (this.common_data.navigation.AD_USER.getMethod === 1) {
        this.load_user_list()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.AD_USER.getMethod === 1) {
        this.load_user_list()
      }
    }
  },
  methods: {
    converseTime,
    async update_role (user, role) {
      if (this.common_data.navigation.AD_USER.putMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }

      if (user.id === 1) {
        this.$message.error('Cập nhật quyền hạn thất bại')
        return
      }
      if (this.loading_btn) return
      this.loading_btn = true

      const data = {
        id: user.id,
        role: {
          id: role.id
        }
      }

      const response = await this.$services.do_request('put', USER_URL, data)
      this.loading_btn = false

      if (response.data.message === 'Success') {
        this.dataTable.forEach(item => {
          if (item.id === user.id) {
            item.role.name = role.name
          }
        })
        this.$message.success('Cập nhật quyền hạn thành công')
      } else if (response.status === 400) {
        this.$message.error('Cập nhật quyền hạn thất bại')
        console.log('Bad resquest')
      } else {
        this.$router.push('/e-500')
      }
    },
    async load_role_list () {
      if (this.loading_btn) return
      this.loading_btn = true

      const response = await this.$services.do_request('get', ROLE_URL)
      this.loading_btn = false

      if (response.data.message === 'Success') {
        this.role_list = response.data.data.content
        // this.role_list.forEach(item => {
        //   item.code = this.converseRole(item.code)
        // })
      } else if (response.status === 400) {
        console.log('Bad resquest')
        this.$message.error('Tải danh sách thất bại')
      } else {
        this.$router.push('/e-500')
      }
    },
    disable_edit_role (user, role) {
      if (user.id === 1) return true
      if (user.role.id === role.id) return true
      if (this.common_data.navigation.AD_USER.putMethod === 0) return true
      return false
    },
    open_reset_pass (user) {
      this.$refs.reset_pass.open(user)
    },
    open_add_user () {
      this.$refs.add_user.open(this.role_list)
    },
    prev_page () {
      if (this.pagination.page === 1) return

      this.pagination.page = this.pagination.page - 1
    },
    next_page () {
      if (this.pagination.page === this.total_page) return
      this.pagination.page = this.pagination.page + 1
    },
    change_page (val) {
      this.pagination.page = val
    },
    async load_user_list () {
      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }
      const data = {
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }
      const response = await this.$services.do_request('get', USER_URL, data)
      this.loading = false

      if (response.data.data.content) {
        this.pagination.totalPage = response.data.data.totalPages
        this.pagination.totalElement = response.data.data.totalElements
        this.dataTable = response.data.data.content
      } else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/e-500')
      }
    },
    user_created () {
      this.load_user_list()
    },
    converseRole (role) {
      return role.replace('ROLE_', '')
    }
  },
  created () {
    if (this.common_data.navigation.AD_USER.getMethod === 1) {
      this.load_user_list()
      this.load_role_list()
    }
  }
}
</script>

<style scoped="">
.el-button--medium {
  width: 120px
}
</style>
