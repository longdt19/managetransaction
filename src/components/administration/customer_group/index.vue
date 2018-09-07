<template>
<section v-if="common_data.navigation.CAT_CUSTOMER_GR.status === 1">
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách ngân hàng</span>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button @click.native="open_add" type="primary" :disabled="common_data.navigation.CAT_CUSTOMER_GR.postMethod === 0">
          <i class="el-icon-plus" style="margin-right: 10px" />
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

    <el-table-column label="Tên nhóm" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>

    <el-table-column label="Thông tin" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.description}}
      </template>
    </el-table-column>

    <el-table-column label="Người tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.creator}}
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center">
      <template slot-scope="scope">
          <el-button size="mini" @click="open_edit(scope.row)"
            :disabled="common_data.navigation.CAT_CUSTOMER_GR.putMethod === 0"
          >
            Sửa
          </el-button>
          <el-button size="mini" type="danger" @click="open_delete(scope.row)"
            :disabled="common_data.navigation.CAT_CUSTOMER_GR.deleteMethod === 0"
          >
            Xóa
          </el-button>
        </template>
    </el-table-column>
  </el-table>

  <div class="block" style="margin-top: 30px; text-align: right"
    v-if="common_data.navigation.CAT_CUSTOMER_GR.getMethod === 1"
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

  <edit-group-component ref='edit_group' @group_edited="group_edited"/>
  <add-group-component ref='add_group' />
  <delete-group-component ref='delete_group' @group_deleted="group_deleted" />
</section>
</template>

<script>
import { CUSTOMER_GROUP_URL } from '@/constants/endpoints'

import formatNumber from '@/utils/numeric'
import converseTime from '@/utils/time'

import EditGroupComponent from './edit'
import AddGroupComponent from './add'
import DeleteGroupComponent from './delete'

export default {
  components: { EditGroupComponent, AddGroupComponent, DeleteGroupComponent },
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
      if (this.common_data.navigation.CAT_CUSTOMER_GR.getMethod === 1) {
        this.load_customer_group_list()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.CAT_CUSTOMER_GR.getMethod === 1) {
        this.load_customer_group_list()
      }
    }
  },
  methods: {
    converseTime,
    formatNumber,
    async load_customer_group_list () {
      if (this.common_data.navigation.CAT_CUSTOMER_GR.getMethod === 0) {
        return
      }
      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      let data = {
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', CUSTOMER_GROUP_URL, data)
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
    open_add () {
      this.$refs.add_group.open()
    },
    open_edit (group) {
      this.$refs.edit_group.open(group)
    },
    open_delete (group) {
      this.$refs.delete_group.open(group)
    },
    group_edited (group) {
      const group_index = this.dataTable.findIndex(item => item.id === group.id)
      Object.assign(this.dataTable[group_index], group)
    },
    group_deleted () {
      this.load_customer_group_list()
    }
  },
  created () {
    if (this.common_data.navigation.CAT_CUSTOMER_GR.getMethod === 1) {
      this.load_customer_group_list()
    }
  }
}
</script>
