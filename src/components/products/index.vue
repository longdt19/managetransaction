<template>
  <section>
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê chi tiết các sản phẩm</span>
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
            <span>Nợ:  {{statistic.owed}}</span>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <span>Tổng:  {{statistic.total}}</span>
          </div></el-col>
        </el-row>
      </div></el-col>
    </el-row>

    <div class="" style="margin-top: 15px;">
      <el-table
        :data="product_list"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" label="STT" width="50">
        </el-table-column>

        <el-table-column prop="code" label="Mã sản phẩm" header-align="center">
          <template slot-scope="scope">
            {{scope.row.code}}
          </template>
        </el-table-column>

        <el-table-column prop="name" label="Tên sản phẩm"  header-align="center">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column label="Số dư" header-align="center">
          <!-- <template slot-scope="scope">
            {{scope.row.bankName}}
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
        :total="50">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { PRODUCT_STATISTIC_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      from_date: '',
      to_date: '',
      product_list: [],
      total: null,
      statistic: {},
      loading: false,
      tableData: [
        {
          code: '123123',
          name: 'nạp tiền AZ',
          balance: '23423423423',
          sub_total: '222222',
          unpaid: '3232323',
          total: '12398745'
        },
        {
          code: '123123',
          name: 'nạp tiền AZ',
          balance: '123123123',
          sub_total: '222222',
          unpaid: '3232323',
          total: '12398745'
        }
      ]
    }
  },
  methods: {
    async search () {
      if (this.loading) return
      this.loading = true
      if (this.from_date === '' || this.to_date === '') {
        this.$message.error('Vui lòng chọn ng')
        return
      }
      const data = {
        'fromDate': this.from_date,
        'toDate': this.to_date
      }
      const response = await this.$services.do_request('get', PRODUCT_STATISTIC_URL, data)
      this.loading = false
      console.log('response', response)
      if (response.data.data) {
        this.product_list = response.data.data.data.content
        this.total = response.data.data.totalElements
        this.statistic = response.data.data.statistic
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
