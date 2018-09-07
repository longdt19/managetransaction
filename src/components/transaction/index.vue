<template>
<section v-if="common_data.navigation.TRANSACTION.status === 1">
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="16"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Thống kê chi tiết các giao dịch</span>
      </div></el-col>
      <el-col :xs="12" :md="4"><div class="grid-content bg-purple-light" style="text-align: right">
        <!-- <el-button>Thêm mới giao dịch</el-button> -->
        <add-transaction-component ref='add_transaction' @transaction_added="transaction_added"></add-transaction-component>
      </div></el-col>
      <el-col :xs="12" :md="4"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button style="background-color: #2e7d32" :disabled="common_data.navigation.TRANSACTION.getMethod === 0" @click="export_excel">
          <img src="../../assets/icon/download.svg" style="height: 15px" />
          <span style="margin-left: 5px; color: white">Xuất Excel</span>
        </el-button>
      </div></el-col>
    </el-row>
  </div>
  <el-row>
    <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple" style="margin-left: 12px">
          <span>Từ ngày:</span>
          <el-date-picker
            v-model="from_date"
            type="date"
            value-format="dd-MM-yyyy"
            format="dd-MM-yyyy"
            :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          >
          </el-date-picker>
        </div></el-col>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
          <span>Đến ngày:</span>
          <el-date-picker
            v-model="to_date"
            type="date"
            value-format="dd-MM-yyyy"
            format="dd-MM-yyyy"
            :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          >
          </el-date-picker>
        </div></el-col>
      </el-row>
    </div></el-col>

    <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
      <el-row >
        <el-col :span="8"><div class="grid-content bg-purple">
            <span style="font-size: 15px;">Có:</span>
            <el-tag type="success" v-if="statistic.paid">
              <span style="font-size: 20px; font-weight: bold">{{formatNumber(statistic.paid)}}</span>
            </el-tag>
        </div></el-col>

        <el-col :span="8"><div class="grid-content bg-purple-light">
          <span style="font-size: 15px;">Nợ:</span>
          <el-tag type="danger" v-if="statistic.owed">
            <span style="font-size: 20px; font-weight: bold">{{formatNumber(statistic.owed)}}</span>
          </el-tag>
        </div></el-col>

        <el-col :span="8"><div class="grid-content bg-purple-light">
          <span style="font-size: 15px;">Tổng:</span>
          <el-tag v-if="statistic.total">
            <span style="font-size: 20px; font-weight: bold">{{formatNumber(statistic.total)}}</span>
          </el-tag>
        </div></el-col>
      </el-row>
    </div></el-col>
  </el-row>

  <div class="" style="display: flex; align-items: flex-end; justify-content: space-between">

    <div class=""  style="margin-top: 15px">
      <search-component ></search-component>
    </div>
    <div class="" style="text-align: right">
      <el-row>
        <span>Hiển thị: </span>
        <el-select v-model="pagination.per_page" style="width: 80px">
          <el-option
            v-for="item in pagination.list"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-row>
    </div>
  </div>

  <!-- <div style="margin-top: 15px; margin-bottom: 25px; align-items: center">
    <div class="" style="margin-right: 5px">
      <span>Tìm kiếm: </span>
    </div>
    <div class="" style="margin-top: 10px">
      <search-component  style="width: 100%"></search-component>
    </div>
  </div> -->

  <el-table
    :data="transaction.list"
    style="width: 100%"
    v-loading="transaction.loading"
    highlight-current-row
  >

    <el-table-column type="index" label="STT" align="center">
    </el-table-column>

    <!-- ***********************************************************************
    ************************   Thông tin    ************************************
    ************************************************************************ -->
    <el-table-column
      label="Thông tin"
      header-align="center">

      <el-table-column label="Ngày tạo" header-align="center" align="center">
        <template slot-scope="scope">
          {{formatDate(scope.row.created)}}
        </template>
      </el-table-column>

      <el-table-column  label="Mã giao dịch" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>

      <!-- 1: Xuất
      2: Nhập
      3: Hoàn tiền -->
      <el-table-column label="Trạng thái" header-align="center" align="center">
        <template slot-scope="scope" >
          <el-tag v-if="scope.row.status" :type="type_of_status(scope.row.status).type">{{type_of_status(scope.row.status).label}}</el-tag>
        </template>
      </el-table-column>

      <!-- chọn đúng tên trong danh sách khách hàng có sẵn. nếu không có phải sang tạo mới -->
      <el-table-column label="Người giao dịch" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.customer.name}}
        </template>
      </el-table-column>

    </el-table-column>

    <!-- ***********************************************************************
    ************************   Đơn hàng    ************************************
    ************************************************************************ -->

    <el-table-column label="Đơn hàng" header-align="center" align="center">

      <!-- chọn từ sheep Sản phẩm -->
      <el-table-column label="Sản phẩm" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.product.name}}
        </template>
      </el-table-column>

      <!-- số tiền mình đã nạp cho sản phẩm đó -->
      <el-table-column label="Số tiền" header-align="center" align="center">
        <template slot-scope="scope">
          {{formatNumber(scope.row.cost)}}
        </template>
      </el-table-column>

      <el-table-column label="Chiết suất(%)" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.extracts}}
        </template>
      </el-table-column>

      <!-- khi khách hàng chuyển tiền có thể thêm bớt số lẻ
      cái này dùng để ghi chi tiết khách hàng thêm hay bớt bao nhiêu
      để hiểu đc thực tế mình chỉ nhận được ngân hàng nào để khớp với số dư trong ngân hàng đó -->
      <el-table-column label="Bớt tiền" header-align="center" align="center">
        <template slot-scope="scope">
          {{formatNumber(scope.row.discount)}}
        </template>
      </el-table-column>
      <!-- tổng thành tiền thực tế phải thu khách hàng -->
      <el-table-column label="Tổng" header-align="center" align="center">
        <template slot-scope="scope">
          {{formatNumber(scope.row.total)}}
        </template>
      </el-table-column>

    </el-table-column>

    <!-- ***********************************************************************
    ************************   Thanh toán   ************************************
    ************************************************************************ -->

    <el-table-column label="Thanh toán" header-align="center" align="center">

      <!-- ngân hàng khách hàng dùng để thanh toán -->
      <el-table-column label="Ngân hàng" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.bankAccount.bankName}}
        </template>
      </el-table-column>

      <el-table-column label="Đã thanh toán" header-align="center" align="center">
        <template slot-scope="scope">
          {{formatNumber(scope.row.paid)}}
        </template>
      </el-table-column>

      <el-table-column label="Còn nợ" header-align="center" align="center">
        <template slot-scope="scope">
          {{formatNumber(scope.row.owed)}}
        </template>
      </el-table-column>

    </el-table-column>

    <el-table-column label="Ghi chú" header-align="center" align="center">
      <template slot-scope="scope">
        <span style="font-size: 10px">{{scope.row.note}}</span>
      </template>
    </el-table-column>

    <el-table-column label="Người tạo" header-align="center" align="center">
      <template slot-scope="scope">
        <span style="color: #dc3545!important">{{scope.row.creator}}</span>
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center">
      <template slot-scope="scope">
          <el-button size="mini" @click="open_edit(scope.row)"
            :disabled="common_data.navigation.TRANSACTION.putMethod === 0"
          >
            Sửa
          </el-button>
        </template>
    </el-table-column>

  </el-table>
  <div class="block" style="margin-top: 30px; text-align: right" align="center"
    v-if="common_data.navigation.TRANSACTION.getMethod === 1"
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
  <edit-transaction-component ref='edit_transaction' @transaction_edited='transaction_edited'/>
</section>
</template>

<script>
import _ from 'lodash'
import { BANK_LIST_URL, CUSTOMER_LIST_URL, PRODUCT_LIST_URL, TRANSACTION_URL, TRANSACTION_DOWNLOAD_URL } from '@/constants/endpoints'

import formatNumber from '@/utils/numeric'
import formatDate from '@/utils/time'

import SearchComponent from '@/components/transaction/search'
import AddTransactionComponent from './add_transaction'
import EditTransactionComponent from './edit'

export default {
  components: { SearchComponent, AddTransactionComponent, EditTransactionComponent },
  data () {
    return {
      value: '',
      from_date: '',
      to_date: '',
      input: '',
      select: '',
      search_bank: '',
      search_customer: '',
      search_category: '',
      note_input_search: {
        'bank': 'Tên ngân hàng',
        'category': 'Loại giao dịch',
        'customer': 'Khách hàng'
      },
      pagination: {
        totalPage: null,
        totalElement: null,
        page: 1,
        per_page: 10,
        list: [10, 20, 30]
      },
      statistic: {},
      transaction: {
        list: [],
        loading: false,
        total: null
      },
      bank: {
        list: [],
        loading: false
      },
      product: {
        list: [],
        loading: false
      },
      customer: {
        list: [],
        loading: false
      },
      old_search: {},
      new_search: {}
    }
  },
  watch: {
    'pagination.per_page' (val) {
      if (this.common_data.navigation.TRANSACTION.getMethod === 1) {
        this.load_transaction_list()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.TRANSACTION.getMethod === 1) {
        this.load_transaction_list()
      }
    }
  },
  methods: {
    formatNumber,
    formatDate,
    async export_excel () {
      let search = encodeURI(JSON.stringify(this.new_search))
      window.location.href = process.env.BACKEND_URL + '/' + TRANSACTION_DOWNLOAD_URL + `?search=${search}`
    },
    async load_transaction_list () {
      if (this.common_data.navigation.TRANSACTION.getMethod === 0) {
        return
      }

      if (this.transaction.loading) return
      this.transaction.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      if (_.isEqual(this.old_search, this.new_search) !== true) {
        this.pagination.page = 1
      }

      const data = {
        search: this.new_search,
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', TRANSACTION_URL, data)
      this.transaction.loading = false

      if (response.data.data) {
        this.transaction.list = response.data.data.data.content
        this.pagination.totalElement = response.data.data.data.totalElements
        this.pagination.totalPage = response.data.data.data.totalPages
        this.statistic = response.data.data.statistic
        this.old_search = this.new_search
      } else {
        this.$router.push('/e-500')
      }
    },
    async load_bank_list () {
      if (this.common_data.navigation.TRANSACTION.getMethod === 0) {
        return
      }

      if (this.bank.loading) return
      this.bank.loading = true
      const response = await this.$services.do_request('get', BANK_LIST_URL)
      this.bank.loading = false
      if (response.data.data) {
        this.bank.list = response.data.data
        this.$refs.add_transaction.load_bank_data(response.data.data)
      } else {
        this.$router.push('/e-500')
      }
    },
    async load_customer_list () {
      if (this.common_data.navigation.TRANSACTION.getMethod === 0) {
        return
      }

      if (this.customer.loading) return

      this.customer.loading = true
      const response = await this.$services.do_request('get', CUSTOMER_LIST_URL)
      this.customer.loading = false

      if (response.data.data) {
        this.customer.list = response.data.data
        this.$refs.add_transaction.load_customer_data(response.data.data)
      } else {
        this.$router.push('/e-500')
      }
    },
    async load_product_list () {
      if (this.common_data.navigation.TRANSACTION.getMethod === 0) {
        return
      }

      if (this.product.loading) return

      this.product.loading = true
      const response = await this.$services.do_request('get', PRODUCT_LIST_URL)
      this.product.loading = false

      if (response.data.data) {
        this.product.list = response.data.data
        this.$refs.add_transaction.load_product_data(response.data.data)
      } else {
        this.$router.push('/e-500')
      }
    },
    transaction_edited (transaction) {
      console.log('1', transaction)
      console.log('2', this.transaction.list)
      const transaction_index = this.transaction.list.findIndex(item => item.id === transaction.id)
      console.log('3', transaction_index)
      Object.assign(this.transaction.list[transaction_index], transaction)
    },
    transaction_added () {
      this.load_transaction_list()
    },
    open_edit (transaction) {
      this.$refs.edit_transaction.open(transaction)
    },
    type_of_status (status) {
      // 1: Xuất
      // 2: Nhập
      // 3: Hoàn tiền
      let type = ''
      let label = ''

      if (status === 1) {
        type = 'success'
        label = 'Xuất'
      } else if (status === 2) {
        type = 'warning'
        label = 'Nhập'
      } else if (status === 3) {
        type = 'danger'
        label = 'Hoàn tiền'
      }
      return {
        type: type,
        label: label
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
    }
  },
  created () {
    // Đợi giáo sư fix server. Địt mẹ GS
    if (this.common_data.navigation.TRANSACTION.getMethod === 1) {
      this.load_bank_list()
      this.load_customer_list()
      this.load_product_list()
      this.load_transaction_list()
    }
  }
}
</script>
<style scoped="">
.el-input, el-input__inner {
  width: 150px;
}
.el-loading-spinner {
  top: 50%
}
</style>
