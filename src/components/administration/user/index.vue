<template>
<section>
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách người dùng</span>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button>Thêm mới</el-button>
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
  >
    <el-table-column type="index" label="STT" width="50">
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
        {{scope.row.role.name}}
      </template>
    </el-table-column>

    <el-table-column label="Email" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.email}}
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center">
      <template slot-scope="scope">
          <el-button size="mini">Sửa</el-button>
          <el-button size="mini" type="danger">Xóa</el-button>
        </template>
    </el-table-column>
  </el-table>

  <div class="block" style="margin-top: 30px; text-align: right">
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
</section>
</template>

<script>
import converseTime from '@/utils/time'

import { USER_URL } from '@/constants/endpoints'

export default {
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
      loading: false
    }
  },
  watch: {
    'pagination.per_page' (val) {
      this.load_user_list()
    },
    'pagination.page' (val) {
      this.load_user_list()
    }
  },
  methods: {
    converseTime,
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

      const response = await this.$services.do_request('get', USER_URL)
      this.loading = false
      console.log('response', response)

      if (response.data.data.content) {
        this.pagination.totalPage = response.data.data.totalPages
        this.pagination.totalElement = response.data.data.totalElements
        this.dataTable = response.data.data.content
      } else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/e-500')
      }
    }
  },
  created () {
    this.load_user_list()
  }
}
</script>

<style lang="css">
</style>
