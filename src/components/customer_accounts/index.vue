<template>
  <section>
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê theo tài khoản khách hàng</span>
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
            <el-button slot="append" icon="el-icon-search" @click.native="search_customer"></el-button>
          </div></el-col>
        </el-row>
      </div></el-col>

      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            <span>Có: {{statistic.owed}}</span>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <span>Nợ: {{statistic.paid}}</span>
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
        :data="customer_list"
        style="width: 100%"
        header-align="center"
        v-loading="loading"
      >
        <el-table-column type="index" header-align="center" align="center"></el-table-column>

        <el-table-column prop="name" label="Tên" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column prop="account" label="Tài khoản" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.azAccount}}
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="Số điện thoại" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>

        <el-table-column prop="address" label="Địa chỉ" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.address" placement="top">
              <span style="font-size: 10px">{{scope.row.province}}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="Nhóm khách hàng" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.group}}
          </template>
        </el-table-column>

        <el-table-column label="Ghi chú" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.note}}</span>
          </template>
        </el-table-column>

        <el-table-column label="Nợ trước" header-align="center" align="center">
          <template slot-scope="scope">
            {{formatNumber(scope.row.debtBefore)}}
          </template>
        </el-table-column>

        <el-table-column label="Tồn đầu kỳ" header-align="center">
          <el-table-column label="Nạp" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.beforePeriodPaid)}}
            </template>
          </el-table-column>

          <el-table-column label="Thanh toán" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.beforePeriodOwed)}}
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.beforePeriodTotal)}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Tồn trong kỳ" header-align="center">
          <el-table-column label="Nạp" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.inPeriodPaid)}}
            </template>
          </el-table-column>

          <el-table-column label="Thanh toán" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.inPeriodOwed)}}
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.inPeriodTotal)}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Tổng" header-align="center" align="center">
        </el-table-column>
        <!-- <el-table-column label="Tồn cuối kỳ" header-align="center">
          <el-table-column label="Nạp" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.afterPeriodPaid)}}
            </template>
          </el-table-column>

          <el-table-column label="Thanh toán" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.afterPeriodOwed)}}
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.afterPeriodTotal)}}
            </template>
          </el-table-column>
        </el-table-column> -->
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
import formatNumber from '@/utils/numeric'

import { CUSTOMER_STATISTIC_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      customer_list: [],
      total: null,
      statistic: {},
      from_date: '',
      to_date: '',
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
      this.search_customer()
    },
    'pagination.page' (val) {
      this.search_customer()
    }
  },
  methods: {
    formatNumber,
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
    async search_customer () {
      if (this.from_date === '' || this.to_date === '') {
        this.$message.error('Trường tìm kiếm không được để trống')
        return
      }

      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      const data = {
        'fromDate': this.from_date,
        'toDate': this.to_date,
        'size': this.pagination.per_page,
        'page': this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', CUSTOMER_STATISTIC_URL, data)
      this.loading = false
      console.log('response', response)
      if (response.data.data) {
        this.customer_list = response.data.data.data.content
        this.total = response.data.data.totalElements
        this.statistic = response.data.data.statistic
        this.pagination.totalElement = response.data.data.data.totalElements
        this.pagination.totalPage = response.data.data.data.totalPages
      }
    }
  }
}
</script>
<style scoped="">
.el-input, el-input__inner {
  width: 150px;
}
div.cell {
  font-size: 10px
}
</style>
