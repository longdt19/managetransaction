<template>
<section>
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách khách hàng</span>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button @click.native="open_add">Thêm mới</el-button>
      </div></el-col>
    </el-row>
  </div>

  <div class="" style="text-align: right">
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

    <el-table-column label="Tên khách hàng" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>

    <el-table-column label="Tài khoản" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.azAccount}}
      </template>
    </el-table-column>

    <el-table-column label="Số điện thoại" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.phone}}
      </template>
    </el-table-column>

    <el-table-column label="Địa chỉ" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.address}}
      </template>
    </el-table-column>

    <el-table-column label="Người tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.creator}}
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center">
      <template slot-scope="scope">
          <el-button size="mini" @click="open_edit(scope.row)">Sửa</el-button>
          <el-button size="mini" type="danger" @click="open_delete(scope.row)">Xóa</el-button>
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

  <add-customer-component ref='add_customer' />
  <edit-customer-component ref='edit_customer' @customer_edited="customer_edited"/>
  <delete-customer-component ref='delete_customer' @customer_deleted="customer_deleted" />
</section>
</template>

<script>
import { CUSTOMER_URL } from '@/constants/endpoints'

import EditCustomerComponent from './edit'
import AddCustomerComponent from './add'
import DeleteCustomerComponent from './delete'

import converseTime from '@/utils/time'

export default {
  components: { EditCustomerComponent, AddCustomerComponent, DeleteCustomerComponent },
  data () {
    return {
      dataTable: [],
      pagination: {
        totalPage: 5,
        totalElement: 10,
        page: 1,
        per_page: 10,
        list: [10, 20, 30]
      },
      loading: false
    }
  },
  watch: {
    'pagination.per_page' (val) {
      this.loading_customer_list()
    },
    'pagination.page' (val) {
      this.loading_customer_list()
    }
  },
  methods: {
    converseTime,
    async loading_customer_list () {
      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      let data = {
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', CUSTOMER_URL, data)
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
      this.$refs.add_customer.open()
    },
    open_edit (customer) {
      this.$refs.edit_customer.open(customer)
    },
    open_delete (bank) {
      this.$refs.delete_customer.open(bank)
    },
    customer_edited (customer) {
      console.log('edited', customer)
      const customer_index = this.dataTable.findIndex(item => item.id === customer.id)
      console.log('customer_index', customer_index)
      Object.assign(this.dataTable[customer_index], customer)
      console.log('this.data', this.dataTable)
    },
    customer_deleted () {
      console.log('refresh')
    }
  },
  created () {
    this.loading_customer_list()
  }
}
</script>

<style scoped="">
.el-loading-spinner {
  top: 50%
}
</style>
