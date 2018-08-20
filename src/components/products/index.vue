<template>
  <section>
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê chi tiết các sản phẩm</span>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light" style="text-align: right">
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

    <div class="" style="margin-top: 15px;">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column prop="code" label="Mã sản phẩm" width="180">
        </el-table-column>

        <el-table-column prop="name" label="Tên sản phẩm" width="180">
        </el-table-column>

        <el-table-column prop="balance" label="Số dư">
        </el-table-column>

        <el-table-column prop="sub_total" label="Có" width="180">
        </el-table-column>

        <el-table-column prop="unpaid" label="Nợ" width="180">
        </el-table-column>

        <el-table-column prop="total" label="Tổng">
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
  width: 50%;
}
</style>
