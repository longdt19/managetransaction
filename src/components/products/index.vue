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

    <div class="" style="margin-top: 15px;">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="code" label="Mã sản phẩm" width="100" header-align="center">
        </el-table-column>

        <el-table-column prop="name" label="Tên sản phẩm" width="150" header-align="center">
        </el-table-column>

        <el-table-column prop="balance" label="Số dư" header-align="center">
        </el-table-column>

        <el-table-column label="Đầu kỳ" header-align="center">
          <el-table-column label="Có" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Nợ" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Giữa kỳ" header-align="center">
          <el-table-column label="Có" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Nợ" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Cuối kỳ" header-align="center">
          <el-table-column label="Có" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Nợ" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
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
export default {
  data () {
    return {
      from_date: '',
      to_date: '',
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
  }
}
</script>

<style scoped="">
.el-input, el-input__inner {
  width: 150px;
}
</style>
