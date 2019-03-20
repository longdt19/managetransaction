<template>
<section v-if="common_data.navigation.CAT_CUSTOMER.status === 1">
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách khách hàng</span>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button @click.native="open_add" type="primary" :disabled="common_data.navigation.CAT_CUSTOMER.postMethod === 0">
          <i class="el-icon-plus" style="margin-right: 10px" />
          Thêm mới
        </el-button>

        <el-button @click.native="open_upload" style="background-color: #2e7d32" type="primary" :disabled="common_data.navigation.CAT_CUSTOMER.postMethod === 0">
          <i class="el-icon-upload2" style="margin-right: 10px" />
          Tải lên
        </el-button>
      </div></el-col>
    </el-row>
  </div>

  <search-customer-component />

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

    <el-table-column label="Tên khách hàng" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>

    <el-table-column label="Nhóm khách hàng" header-align="center" align="center">
      <template slot-scope="scope">

        <el-tooltip :content="scope.row.customerGroup.description" placement="top">
          <span>{{scope.row.customerGroup.name}}</span>
        </el-tooltip>
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
        <el-tooltip :content="scope.row.address" placement="top">
          <span>{{scope.row.province}}</span>
        </el-tooltip>
      </template>
    </el-table-column>

    <el-table-column label="Người tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.creator}}
      </template>
    </el-table-column>

    <el-table-column label="Nợ trước" header-align="center" align="center">
      <template slot-scope="scope">
        {{formatNumber(scope.row.debtBefore)}}
      </template>
    </el-table-column>

    <el-table-column label="Ghi chú" header-align="center" align="center">
      <template slot-scope="scope">
        <span style="font-size: 10px">{{scope.row.note}}</span>
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center">
      <template slot-scope="scope">
          <el-button size="mini" @click="open_edit(scope.row)"
            :disabled="common_data.navigation.CAT_CUSTOMER.putMethod === 0"
          >
            Sửa
          </el-button>
          <el-button size="mini" type="danger" @click="open_delete(scope.row)"
            :disabled="common_data.navigation.CAT_CUSTOMER.deleteMethod === 0"
          >
            Xóa
          </el-button>
        </template>
    </el-table-column>
  </el-table>

  <div class="block" style="margin-top: 30px; text-align: right"
    v-if="common_data.navigation.CAT_CUSTOMER.getMethod === 1"
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

  <add-customer-component ref='add_customer' />
  <edit-customer-component ref='edit_customer' @customer_edited="customer_edited"/>
  <delete-customer-component ref='delete_customer' @customer_deleted="customer_deleted" />
  <upload-customer-component ref='upload_customer' @customer_uploaded="customer_uploaded"/>
</section>
</template>

<script>
import _ from 'lodash'

import { NUMBER_VALIDATOR } from '@/constants'
import { CUSTOMER_URL } from '@/constants/endpoints'

import converseTime from '@/utils/time'
import formatNumber from '@/utils/numeric'

import EditCustomerComponent from './edit'
import AddCustomerComponent from './add'
import DeleteCustomerComponent from './delete'
import SearchCustomerComponent from './search'
import UploadCustomerComponent from './upload'

export default {
  components: {
    EditCustomerComponent,
    AddCustomerComponent,
    DeleteCustomerComponent,
    SearchCustomerComponent,
    UploadCustomerComponent
  },
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
      old_search: {},
      new_search: {}
    }
  },
  watch: {
    'pagination.per_page' (val) {
      if (this.common_data.navigation.CAT_CUSTOMER.getMethod === 1) {
        this.pagination.page = 1
        this.loading_customer_list()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.CAT_CUSTOMER.getMethod === 1) {
        this.loading_customer_list()
      }
    }
  },
  methods: {
    converseTime,
    formatNumber,
    open_upload () {
      this.$refs.upload_customer.open()
    },
    validate_number (number) {
      if (number === '') return null
      return NUMBER_VALIDATOR.test(number.trim())
    },
    async loading_customer_list () {
      if (this.common_data.navigation.CAT_CUSTOMER.getMethod === 0) {
        return
      }
      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      if (_.isEqual(this.old_search, this.new_search) !== true) {
        this.pagination.page = 1
      }

      let data = {
        search: this.new_search,
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', CUSTOMER_URL, data)
      this.loading = false

      if (response.data.data.content) {
        this.pagination.totalPage = response.data.data.totalPages
        this.pagination.totalElement = response.data.data.totalElements
        this.dataTable = response.data.data.content
        this.old_search = this.new_search
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
      // const customer_index = this.dataTable.findIndex(item => item.id === customer.id)
      // Object.assign(this.dataTable[customer_index], customer)
      this.loading_customer_list()
    },
    customer_deleted () {
      this.loading_customer_list()
    },
    customer_uploaded () {
      this.loading_customer_list()
    }
  },
  created () {
    if (this.common_data.navigation.CAT_CUSTOMER.getMethod === 1) {
      this.loading_customer_list()
    }
  }
}
</script>

<style scoped="">
.el-loading-spinner {
  top: 50%
}
</style>
