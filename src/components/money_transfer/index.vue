<template lang="">
<section>
  <div class="" style="text-align: right;">
    <add-transfer-component
      :bank_list="bank_list"
      :load_bank_list="load_bank_list"
      :load_data_table="load_data_table"
    />
  </div>
  <div class="" style="margin-bottom: 20px">
    <search-component
      :bank_list="bank_list"
      :load_bank_list="load_bank_list"
      @search="search"
    />

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
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      v-loading="loading"
    >
      <el-table-column type="index" label="STT" align="center">
      </el-table-column>

      <el-table-column header-align="center" align="center" label="Ngày tạo">
        <template slot-scope="scope">
          {{formatDate(scope.row.created)}}
        </template>
      </el-table-column>

      <el-table-column header-align="center" align="center" label="Mã giao dịch">
        <template slot-scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column header-align="center" align="center" label="Ngân hàng chuyển">
        <template slot-scope="scope">
          {{scope.row.fromBankAccount.bankName}} - {{scope.row.fromBankAccount.userName}}
        </template>
      </el-table-column>

      <el-table-column header-align="center" align="center" label="Ngân hàng nhận">
        <template slot-scope="scope">
          {{scope.row.toBankAccount.bankName}} - {{scope.row.toBankAccount.userName}}
        </template>
      </el-table-column>

      <el-table-column header-align="center" align="center" label="Phí giao dịch">
        <template slot-scope="scope">
          {{scope.row.bankFee}}
        </template>
      </el-table-column>

      <el-table-column header-align="center" align="center" label="Số tiền">
        <template slot-scope="scope">
          {{scope.row.total}}
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" align="center">
        <template slot-scope="scope">
            <el-button size="mini"
              :disabled="common_data.navigation.TRANSACTION.putMethod === 0"
              @click="open_edit(scope.row)"
            >
              Sửa
            </el-button>
            <el-button size="mini"
              :disabled="common_data.navigation.TRANSACTION.deleteMethod === 0"
              type="danger"
              @click="open_delete(scope.row.id)"
            >
              Xóa
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
        @prev-click="prev_page()"
        @next-click="next_page()"
      >
      </el-pagination>
    </div>
  </div>

  <edit-transfer-component
    ref="edit_transfer"
    :bank_list="bank_list"
    @load_data_table="load_data_table"
  />

  <delete-transfer-component
    ref="delete_transfer"
    @load_data_table="load_data_table"
  />
</section>
</template>

<script>
import { TRANSACTION_URL } from '@/constants/endpoints'

import formatDate from '@/utils/time'

import AddTransferComponent from './add_money_transfer'
import SearchComponent from './search'
import EditTransferComponent from './edit'
import DeleteTransferComponent from './delete'

export default {
  props: ['bank_list', 'load_bank_list'],
  components: {
    AddTransferComponent,
    SearchComponent,
    EditTransferComponent,
    DeleteTransferComponent
  },
  data () {
    return {
      from_date: null,
      to_date: null,
      input_bank: null,
      tableData: [],
      loading: false,
      old_search: {
        type: 'CHUYEN_TIEN_NOI_BO'
      },
      new_search: {
        type: 'CHUYEN_TIEN_NOI_BO'
      },
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
      if (this.common_data.navigation.TRANSACTION.getMethod === 1) {
        this.pagination.page = 1
        this.load_data_table()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.TRANSACTION.getMethod === 1) {
        this.load_data_table()
      }
    }
  },
  methods: {
    formatDate,
    open_delete (transfer_id) {
      this.$refs.delete_transfer.open(transfer_id)
    },
    open_edit (transfer) {
      this.$refs.edit_transfer.open(transfer)
    },
    search (data) {
      this.old_search = data
      this.load_data_table()
    },
    async load_data_table () {
      if (this.loading) return
      this.loading = true

      const data = {
        search: this.old_search,
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', TRANSACTION_URL, data)
      this.loading = false

      if (response.data.data) {
        this.tableData = response.data.data.data.content
        this.pagination.totalElement = response.data.data.data.totalElements
        this.pagination.totalPage = response.data.data.data.totalPages
        this.old_search = this.new_search
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
    }
  }
}
</script>

<style lang="css">
</style>
