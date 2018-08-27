<template>
  <section>
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê chi tiết ngân hàng</span>
        </div></el-col>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
          <el-button>Xuất Excel</el-button>
        </div></el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <el-row :gutter="5">
          <el-col :xs="24" :md="10"><div class="grid-content bg-purple" style="margin-left: 12px">
            <span>Từ ngày:</span>
            <el-date-picker
              v-model="from_date"
              type="date"
              value-format="dd-MM-yyyy"
            >
            </el-date-picker>
          </div></el-col>
          <el-col :xs="24" :md="10"><div class="grid-content bg-purple-light">
            <span>Đến ngày:</span>
            <el-date-picker
              v-model="to_date"
              type="date"
              value-format="dd-MM-yyyy"
              >
            </el-date-picker>
          </div></el-col>
          <el-col :xs="24" :md="4"><div class="grid-content bg-purple-light">
            <el-button slot="append" icon="el-icon-search" @click.native="search"></el-button>
          </div></el-col>
        </el-row>
      </div></el-col>

      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            <span>Có: {{statistic.paid}}</span>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <span>Nợ: {{statistic.owed}}</span>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <span>Tổng: {{statistic.total}}</span>
          </div></el-col>
        </el-row>
      </div></el-col>
    </el-row>

    <div class="" style="text-align: right" v-if="pagination.totalPage">
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

    <div class="" style="margin-top: 15px;">
      <el-table
        :data="bank_list"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" label="STT" width="50">
        </el-table-column>

        <el-table-column prop="bank_name" label="Ngân hàng" header-align="center">
          <template slot-scope="scope">
            {{scope.row.bankName}}
          </template>
        </el-table-column>

        <el-table-column prop="account_number" label="Số tài khoản" header-align="center">
          <template slot-scope="scope">
            {{scope.row.accountNumber}}
          </template>
        </el-table-column>

        <el-table-column prop="owner" label="Chủ tài khoản" header-align="center">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>

        <el-table-column prop="branch" label="Chi nhánh" header-align="center">
          <template slot-scope="scope">
            {{scope.row.branch}}
          </template>
        </el-table-column>

        <el-table-column label="Số dư" header-align="center">
          <!-- <template slot-scope="scope">
            {{scope.row.created}}
          </template> -->
        </el-table-column>

        <el-table-column label="Đầu kỳ" header-align="center">
          <el-table-column label="Có" header-align="center">
            <template slot-scope="scope">
              {{scope.row.beforePeriodPaid}}
            </template>
          </el-table-column>

          <el-table-column label="Nợ" header-align="center">
            <template slot-scope="scope">
              {{scope.row.beforePeriodOwed}}
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              {{scope.row.beforePeriodTotal}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Giữa kỳ" header-align="center" border>
          <el-table-column label="Có" header-align="center">
            <template slot-scope="scope">
              {{scope.row.inPeriodPaid}}
            </template>
          </el-table-column>

          <el-table-column label="Nợ" header-align="center">
            <template slot-scope="scope">
              {{scope.row.inPeriodOwed}}
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              {{scope.row.inPeriodTotal}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Cuối kỳ" header-align="center">
          <el-table-column label="Có" header-align="center">
            <template slot-scope="scope">
              {{scope.row.afterPeriodPaid}}
            </template>
          </el-table-column>

          <el-table-column label="Nợ" header-align="center">
            <template slot-scope="scope">
              {{scope.row.afterPeriodOwed}}
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              {{scope.row.afterPeriodTotal}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
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
import { BANK_STATISTIC_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      from_date: '',
      to_date: '',
      bank_list: [],
      statistic: {},
      note_input_search: {
        'bank': 'Nhập tên ngân hàng',
        'category': 'Nhập loại giao dịch',
        'customer': 'Nhập khách hàng'
      },
      pagination: {
        totalPage: null,
        totalElement: null,
        page: 1,
        per_page: 2,
        list: [10, 20, 30]
      },
      loading: false
    }
  },
  watch: {
    'pagination.per_page' (val) {
      this.load_transaction_list()
    },
    'pagination.page' (val) {
      this.load_transaction_list()
    }
  },
  methods: {
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
    async search () {
      if (this.loading) return
      this.loading = true
      if (this.from_date === '' || this.to_date === '') {
        this.$message.error('Vui lòng chọn ngày')
        return
      }

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      const data = {
        fromDate: this.from_date,
        toDate: this.to_date,
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', BANK_STATISTIC_URL, data)
      console.log('response', response)
      this.loading = false

      if (response.data.data) {
        this.bank_list = response.data.data.data.content
        this.pagination.totalElement = response.data.data.data.totalElements
        this.pagination.totalPage = response.data.data.data.totalPages
        this.statistic = response.data.data.statistic
      } else {
        this.$router.push('/e-500')
      }
    }
  }
}
</script>
<style scoped="">
.el-input, el-input__inner {
  width: 150px;
}
</style>
