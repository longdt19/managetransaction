<template>
<section>
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="16"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Thống kê chi tiết các giao dịch</span>
      </div></el-col>
      <el-col :xs="12" :md="4"><div class="grid-content bg-purple-light" style="text-align: right">
        <!-- <el-button>Thêm mới giao dịch</el-button> -->
        <add-transaction-component></add-transaction-component>
      </div></el-col>
      <el-col :xs="12" :md="4"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button>Xuất Excel</el-button>
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
          >
          </el-date-picker>
        </div></el-col>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
          <span>Đến ngày:</span>
          <el-date-picker
            v-model="to_date"
            type="date"
            >
          </el-date-picker>
        </div></el-col>
      </el-row>
    </div></el-col>

    <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">
          <span>Có: 1800000000</span>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">
          <span>Nợ: 500000000</span>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">
          <span>Tổng: 1300000000 </span>
        </div></el-col>
      </el-row>
    </div></el-col>
  </el-row>

  <div class=""  style="margin-top: 15px">
    <search-component  style="width: 100%"></search-component>
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
    :data="tableData"
    style="width: 100%">

    <el-table-column type="index" label="STT" width="50"></el-table-column>

    <!-- ***********************************************************************
    ************************   Thông tin    ************************************
    ************************************************************************ -->
    <el-table-column
      label="Thông tin"
      header-align="center">

      <el-table-column prop="date" label="Ngày tạo" header-align="center" >
      </el-table-column>

      <el-table-column  prop="code" label="Mã giao dịch" header-align="center">
        <!-- <template slot-scope="scope">
          {{scope.code}}
        </template> -->
      </el-table-column>

      <el-table-column prop="status" label="Trạng thái" header-align="center">
      </el-table-column>

      <!-- chọn đúng tên trong danh sách khách hàng có sẵn. nếu không có phải sang tạo mới -->
      <el-table-column prop="owner" label="Người giao dịch" header-align="center">
      </el-table-column>

    </el-table-column>

    <!-- ***********************************************************************
    ************************   Đơn hàng    ************************************
    ************************************************************************ -->

    <el-table-column label="Đơn hàng" header-align="center">

      <!-- chọn từ sheep Sản phẩm -->
      <el-table-column prop="product" label="Sản phẩm" header-align="center">
      </el-table-column>

      <!-- số tiền mình đã nạp cho sản phẩm đó -->
      <el-table-column prop="price" label="Số tiền" header-align="center">
      </el-table-column>

      <el-table-column prop="extract" label="Chiết suất(%)" header-align="center">
      </el-table-column>

      <!-- khi khách hàng chuyển tiền có thể thêm bớt số lẻ
      cái này dùng để ghi chi tiết khách hàng thêm hay bớt bao nhiêu
      để hiểu đc thực tế mình chỉ nhận được ngân hàng nào để khớp với số dư trong ngân hàng đó -->
      <el-table-column prop="discount" label="Bớt tiền" header-align="center">
      </el-table-column>

      <!-- tổng thành tiền thực tế phải thu khách hàng -->
      <el-table-column prop="total" label="Tổng" header-align="center">
      </el-table-column>

    </el-table-column>

    <!-- ***********************************************************************
    ************************   Thanh toán   ************************************
    ************************************************************************ -->

    <el-table-column label="Thanh toán" header-align="center">

      <!-- ngân hàng khách hàng dùng để thanh toán -->
      <el-table-column prop="bank" label="Ngân hàng" header-align="center">
      </el-table-column>

      <el-table-column prop="paid" label="Đã thanh toán" header-align="center">
      </el-table-column>

      <el-table-column prop="unpaid" label="Còn nợ" header-align="center">
      </el-table-column>

    </el-table-column>

    <el-table-column prop="note" label="Ghi chú" header-align="center">
    </el-table-column>

    <el-table-column prop="performer" label="Người tạo" header-align="center">
    </el-table-column>

  </el-table>
  <div class="block" style="margin-top: 30px; text-align: right">
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</section>
</template>

<script>
import { BANK_LIST_URL, CUSTOMER_LIST_URL, PRODUCT_LIST_URL } from '@/constants/endpoints'

import SearchComponent from '@/components/transaction/search'
import AddTransactionComponent from './add_transaction'

export default {
  components: { SearchComponent, AddTransactionComponent },
  data () {
    return {
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
      tableData: [
        {
          code: '123465',
          owner: 'longdt',
          product: 'Nạp tiền AZ',
          bank: 'Vietcombank',
          price: '1500000',
          extract: '10%',
          discount: '50000',
          total: '1300000',
          paid: '1000000',
          unpaid: '300000',
          performer: 'longdt',
          date: '22/23/2012',
          status: 'Trạng Thái',
          action: 'Tác động',
          note: 'hihihihihihihihihihi'
        },
        {
          code: '123465',
          owner: 'longdt',
          product: 'Nạp tiền AZ',
          bank: 'Vietcombank',
          price: '1500000',
          extract: '10%',
          discount: '50000',
          total: '1300000',
          paid: '1000000',
          unpaid: '300000',
          performer: 'longdt',
          date: '22/23/2012',
          status: 'Trạng Thái',
          action: 'Tác động',
          note: 'hihihihihihihihihihi'
        }
      ],
      bank_list: [],
      loading_bankList: false,
      customer_list: [],
      loading_customerList: false,
      product_list: [],
      loading_productList: false
    }
  },
  methods: {
    async load_bank_list () {
      if (this.loading_bankList) return

      this.loading_bankList = true
      const response = await this.$services.do_request('get', BANK_LIST_URL)
      this.loading_bankList = false

      if (response.data.data) {
        this.bank_list = response.data.data
      } else {
        this.$router.push('/e-500')
      }
    },
    async load_customer_list () {
      if (this.loading_customerList) return

      this.loading_customerList = true
      const response = await this.$services.do_request('get', CUSTOMER_LIST_URL)
      this.loading_customerList = false

      if (response.data.data) {
        this.customer_list = response.data.data
      } else {
        this.$router.push('/e-500')
      }
    },
    async load_product_list () {
      if (this.loading_productList) return

      this.loading_productList = true
      const response = await this.$services.do_request('get', PRODUCT_LIST_URL)
      this.loading_productList = false

      if (response.data.data) {
        this.product_list = response.data.data
      } else {
        this.$router.push('/e-500')
      }
    }
  },
  created () {
    this.load_bank_list()
    this.load_customer_list()
    this.load_product_list()
  }
}
</script>
<style scoped="">
.el-input, el-input__inner {
  width: 150px;
}

</style>
<style>
</style>
