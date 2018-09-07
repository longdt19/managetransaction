<template>
  <section v-if="common_data.navigation.STA_PRODUCT.status === 1">
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê chi tiết các sản phẩm</span>
        </div></el-col>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
          <el-button style="background-color: #2e7d32" :disabled="common_data.navigation.STA_PRODUCT.getMethod === 0" @click="export_excel">
            <img src="../../assets/icon/download.svg" style="height: 15px" />
            <span style="margin-left: 5px; color: white">Xuất Excel</span>
          </el-button>
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
              format="dd-MM-yyyy"
              :disabled="common_data.navigation.STA_PRODUCT.getMethod === 0"
            >
            </el-date-picker>
          </div></el-col>
          <el-col :xs="24" :md="10"><div class="grid-content bg-purple-light">
            <span>Đến ngày:</span>
            <el-date-picker
              v-model="to_date"
              type="date"
              value-format="dd-MM-yyyy"
              format="dd-MM-yyyy"
              :disabled="common_data.navigation.STA_PRODUCT.getMethod === 0"
              >
            </el-date-picker>
          </div></el-col>
          <el-col :xs="24" :md="4"><div class="grid-content bg-purple-light">
            <el-button slot="append" icon="el-icon-search" @click.native="search_product" :disabled="common_data.navigation.STA_PRODUCT.getMethod === 0"></el-button>
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
        :data="product_list"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" label="STT" width="50" align="center">
        </el-table-column>

        <el-table-column prop="code" label="Mã sản phẩm" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.code}}
          </template>
        </el-table-column>

        <el-table-column prop="name" label="Tên sản phẩm"  header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column label="Số dư" header-align="center" align="center">
          <template slot-scope="scope">
            {{formatNumber(scope.row.balance)}}
          </template>
        </el-table-column>

        <el-table-column label="Đầu kỳ" header-align="center">
          <el-table-column label="Nhập" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.beforePeriodPaid)}}
            </template>
          </el-table-column>

          <el-table-column label="Xuất" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.beforePeriodOwed)}}
            </template>
          </el-table-column>

          <el-table-column label="Tồn" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.beforePeriodTotal)}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Giữa kỳ" header-align="center">
          <el-table-column label="Nhập" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.inPeriodPaid)}}
            </template>
          </el-table-column>

          <el-table-column label="Xuất" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.inPeriodOwed)}}
            </template>
          </el-table-column>

          <el-table-column label="Tồn" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.inPeriodTotal)}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Cuối kỳ" header-align="center">
          <el-table-column label="Nhập" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.afterPeriodPaid)}}
            </template>
          </el-table-column>

          <el-table-column label="Xuất" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.afterPeriodOwed)}}
            </template>
          </el-table-column>

          <el-table-column label="Tồn" header-align="center" align="center">
            <template slot-scope="scope">
              {{formatNumber(scope.row.afterPeriodTotal)}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Tổng" header-align="center" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top: 30px; text-align: right"
      v-if="this.common_data.navigation.STA_PRODUCT.getMethod === 1"
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
import formatNumber from '@/utils/numeric'

import { PRODUCT_STATISTIC_URL, PRODUCT_STATISTIC_DOWNLOAD_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      from_date: '',
      to_date: '',
      product_list: [],
      statistic: {},
      loading: false,
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
      if (this.common_data.navigation.STA_PRODUCT.getMethod === 1) {
        this.search_product()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.STA_PRODUCT.getMethod === 1) {
        this.search_product()
      }
    }
  },
  methods: {
    formatNumber,
    export_excel () {
      if (this.validate_input() === false) {
        return
      }

      window.location.href = process.env.BACKEND_URL + '/' + PRODUCT_STATISTIC_DOWNLOAD_URL + `?fromDate=${this.from_date}&toDate=${this.to_date}`
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
    async search_product () {
      if (this.validate_input() === false) {
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

      const response = await this.$services.do_request('get', PRODUCT_STATISTIC_URL, data)
      this.loading = false
      if (response.data.data) {
        this.product_list = response.data.data.data.content
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
      if (this.common_data.navigation.STA_PRODUCT.getMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return false
      }
      if (this.from_date === '' || this.to_date === '') {
        this.$message.error('Vui lòng chọn ngày')
        return false
      }

      if (this.from_date > this.to_date) {
        this.$message.error('Vui lòng nhập lại ngày thống kê')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped="">
.el-input, el-input__inner {
  width: 150px;
}
</style>
