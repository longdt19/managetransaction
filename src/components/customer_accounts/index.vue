<template>
  <section v-if="common_data.navigation.STA_CUSTOMER.status === 1">
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê theo tài khoản khách hàng</span>
        </div></el-col>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
          <el-button style="background-color: #2e7d32" :disabled="common_data.navigation.STA_CUSTOMER.getMethod === 0" @click="export_excel">
            <img src="../../assets/icon/download.svg" style="height: 15px" />
            <span style="margin-left: 5px; color: white">Xuất Excel</span>
          </el-button>
        </div></el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <el-row :gutter="5">
          <el-col :xs="24" :md="10">
            <div class="grid-content bg-purple" style="margin-left: 12px">
              <span>Từ ngày:</span>
              <el-date-picker
                v-model="search.from_date"
                type="date"
                value-format="dd-MM-yyyy"
                format="dd-MM-yyyy"
                :disabled="common_data.navigation.STA_CUSTOMER.getMethod === 0"
              >
              </el-date-picker>
              <div class="" style="margin-top: 20px">
                <span>Tài khoản:</span>
                <el-input v-model="azAccount" clearable/>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :md="10">
            <div class="grid-content bg-purple-light">
              <span>Đến ngày:</span>
              <el-date-picker
                v-model="search.to_date"
                type="date"
                value-format="dd-MM-yyyy"
                format="dd-MM-yyyy"
                :disabled="common_data.navigation.STA_CUSTOMER.getMethod === 0"
                >
              </el-date-picker>
            </div>
            <div class="" style="margin-top: 20px">
              <span>Số điện thoại:</span>
              <el-input v-model="phone" clearable/>
            </div>
          </el-col>
          <el-col :xs="24" :md="4"><div class="grid-content bg-purple-light">
            <el-button slot="append" icon="el-icon-search" @click.native="search_customer" :disabled="common_data.navigation.STA_CUSTOMER.getMethod === 0"></el-button>
          </div></el-col>
        </el-row>
      </div></el-col>

      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light">
        <el-row >
          <el-col :span="8"><div class="grid-content bg-purple">
              <span style="font-size: 15px;">Nạp:</span>
              <el-tag type="success" v-if="statistic.paid">
                <span style="font-size: 20px; font-weight: bold">{{formatNumber(statistic.paid)}}</span>
              </el-tag>
          </div></el-col>

          <el-col :span="8"><div class="grid-content bg-purple-light">
            <span style="font-size: 15px;">Thanh toán:</span>
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
              <span>{{scope.row.province}}</span>
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
          <template slot-scope="scope">
            {{formatNumber(scope.row.total)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top: 30px; text-align: right"
      v-if="this.common_data.navigation.STA_CUSTOMER.getMethod === 1"
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
  </section>
</template>

<script>
import _ from 'lodash'
import formatNumber from '@/utils/numeric'
import getDays from '@/utils/day'

import { CUSTOMER_STATISTIC_URL, CUSTOMER_STATISTIC_DOWNLOAD_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      customer_list: [],
      total: null,
      statistic: {},
      azAccount: null,
      phone: null,
      search: {
        from_date: '',
        to_date: ''
      },
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
      if (this.common_data.navigation.STA_CUSTOMER.getMethod === 1) {
        this.pagination.page = 1
        this.search_customer()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.STA_CUSTOMER.getMethod === 1) {
        this.search_customer()
      }
    },
    'search.from_date' (val) {
      this.$store.commit('Common/search_customer_loaded', this.search)
    },
    'search.to_date' (val) {
      this.$store.commit('Common/search_customer_loaded', this.search)
    }
  },
  methods: {
    formatNumber,
    export_excel () {
      if (this.validate_input() === false) {
        return
      }

      window.location.href = process.env.BACKEND_URL + '/' + CUSTOMER_STATISTIC_DOWNLOAD_URL + `?fromDate=${this.search.from_date}&toDate=${this.search.to_date}`
    },
    async search_customer () {
      if (this.validate_input() === false) {
        return
      }

      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      const data = {
        'fromDate': this.search.from_date,
        'toDate': this.search.to_date,
        'size': this.pagination.per_page,
        'page': this.pagination.page - 1
      }
      if (this.azAccount) {
        data['azAccount'] = this.azAccount
      }
      if (this.phone) {
        data['phone'] = this.phone
      }

      const response = await this.$services.do_request('get', CUSTOMER_STATISTIC_URL, data)
      this.loading = false
      if (response.data.data) {
        this.customer_list = response.data.data.data.content
        this.total = response.data.data.totalElements
        this.statistic = response.data.data.statistic
        this.pagination.totalElement = response.data.data.data.totalElements
        this.pagination.totalPage = response.data.data.data.totalPages
      } else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/e-500')
      }
    },
    validate_input () {
      if (this.common_data.navigation.STA_CUSTOMER.getMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return false
      }

      if (this.search.from_date === '' || this.search.to_date === '') {
        this.$message.error('Trường tìm kiếm không được để trống')
        return false
      }

      if (this.search.from_date > this.search.to_date) {
        this.$message.error('Vui lòng nhập lại ngày thống kê')
        return false
      }
      return true
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
    let search = getDays()
    this.search = search

    if (_.isEmpty(this.common_data.search_customer) === false) {
      this.search = this.common_data.search_customer
    }

    this.search_customer()
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
