<template>
  <section v-if="common_data.navigation.AD_ROLE.status === 1">
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê các nhóm người dùng</span>
        </div></el-col>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
          <el-button @click="open_add_role" :disabled="common_data.navigation.AD_ROLE.postMethod === 0">
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
      :data="role_list"
      style="width: 100%"
      v-loading="loading"
      border
    >

      <el-table-column type="index" label="STT" width="50" header-align="center" align="center">
      </el-table-column>

      <el-table-column label="Tên" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="Quyền hạn" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="Người tạo" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.creator}}
        </template>
      </el-table-column>

      <el-table-column label="Ngày tạo" header-align="center" align="center">
        <template slot-scope="scope">
          {{formatDate(scope.row.created)}}
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" align="center">
        <template slot-scope="scope">
            <el-button size="mini" @click="open_edit(scope.row)"
              :disabled="common_data.navigation.AD_ROLE.putMethod === 0"
            >
              Sửa
            </el-button>
            <el-button size="mini" type="danger"
              :disabled="common_data.navigation.AD_ROLE.deleteMethod === 0"
              @click="open_delete(scope.row.id)"
            >
              Xóa
            </el-button>
          </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 30px; text-align: right"
      v-if="common_data.navigation.AD_ROLE.getMethod === 1"
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

    <edit-role-component ref='edit_role' />
    <add-role-component ref='add_role' />
    <delete-role-component ref='delete_role' />
  </section>
</template>

<script>
import formatDate from '@/utils/time'

import { ROLE_URL } from '@/constants/endpoints'
import EditRoleComponent from './edit'
import AddRoleComponent from './add'
import DeleteRoleComponent from './delete'

export default {
  components: { EditRoleComponent, AddRoleComponent, DeleteRoleComponent },
  data () {
    return {
      role_list: [],
      loading: false,
      pagination: {
        totalPage: null,
        totalElement: null,
        page: 1,
        per_page: 10,
        list: [10, 20, 30]
      }
    }
  },
  watch: {
    'pagination.per_page' (val) {
      if (this.common_data.navigation.AD_ROLE.getMethod === 1) {
        this.pagination.page = 1
        this.load_role_list()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.AD_ROLE.getMethod === 1) {
        this.load_role_list()
      }
    }
  },
  methods: {
    formatDate,
    async load_role_list () {
      if (this.common_data.navigation.AD_ROLE.getMethod === 0) {
        return
      }

      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }
      const data = {
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', ROLE_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.role_list = response.data.data.content
        this.pagination.totalPage = response.data.data.totalPages
        this.pagination.totalElement = response.data.data.totalElements
      } else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/e-500')
      }
    },
    open_delete (role) {
      this.$refs.delete_role.open(role)
    },
    open_edit (role) {
      this.$refs.edit_role.open(role)
    },
    open_add_role () {
      this.$refs.add_role.open()
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
    }
  },
  created () {
    if (this.common_data.navigation.AD_ROLE.getMethod === 1) {
      this.load_role_list()
    }
  }
}
</script>

<style lang="css">
</style>
