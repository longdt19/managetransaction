<template>
<section>
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :span="18"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Thống kê chi tiết các giao dịch</span>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-light" style="text-align: right">
        <!-- <el-button>Thêm mới giao dịch</el-button> -->
        <add-transaction-component></add-transaction-component>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button>Xuất Excel</el-button>
      </div></el-col>
    </el-row>
  </div>
  <el-row>
    <el-col :span="12"><div class="grid-content bg-purple">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <span>Từ ngày:</span>
          <el-date-picker
            v-model="from_date"
            type="date"
          >
          </el-date-picker>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <span>Đến ngày:</span>
          <el-date-picker
            v-model="to_date"
            type="date"
            >
          </el-date-picker>
        </div></el-col>
      </el-row>
    </div></el-col>

    <el-col :span="12"><div class="grid-content bg-purple-light">
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">
          <span>Có: </span>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">
          <span>Nợ: </span>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">
          <span>Tổng: </span>
        </div></el-col>
      </el-row>
    </div></el-col>
  </el-row>

  <div style="margin-top: 15px; margin-bottom: 25px; display: flex; align-items: center">
    <div class="" style="margin-right: 5px">
      <span>Tìm kiếm: </span>
    </div>
    <div class="" style="margin-top: 10px">
      <search-component  style="width: 100%"></search-component>
    </div>
    <div class="">
      <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
    </div>
  </div>

  <el-table
    :data="tableData"
    style="width: 100%"
    border
  >
    <el-table-column  prop="code" label="Mã giao dịch">
      <!-- <template slot-scope="scope">
        {{scope.code}}
      </template> -->
    </el-table-column>

    <el-table-column prop="owner" label="Người giao dịch">
    </el-table-column>

    <el-table-column prop="product" label="Sản phẩm">
    </el-table-column>

    <el-table-column prop="bank" label="Ngân hàng">
    </el-table-column>

    <el-table-column prop="price" label="Số tiền">
    </el-table-column>

    <el-table-column prop="extract" label="Chiết suất(%)">
    </el-table-column>

    <el-table-column prop="discount" label="Bớt tiền">
    </el-table-column>

    <el-table-column prop="total" label="Tổng">
    </el-table-column>

    <el-table-column prop="paid" label="Đã thanh toán">
    </el-table-column>

    <el-table-column prop="unpaid" label="Còn nợ">
    </el-table-column>

    <el-table-column prop="performer" label="Người tạo">
    </el-table-column>

    <el-table-column prop="date" label="Ngày tạo">
    </el-table-column>

    <el-table-column prop="status" label="Trạng thái">
    </el-table-column>

    <el-table-column prop="action" label="Thao tác">
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
        'bank': 'Nhập tên ngân hàng',
        'category': 'Nhập loại giao dịch',
        'customer': 'Nhập khách hàng'
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
          action: 'Tác động'
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
          action: 'Tác động'
        }
      ]
    }
  }
}
</script>
<style scoped="">
.el-input, el-input__inner {
  width: 50%;
}
</style>
