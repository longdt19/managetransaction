<template>
  <section>
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê thao tài khoản khách hàng</span>
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
        <el-table-column prop="name" label="Tên">
        </el-table-column>

        <el-table-column prop="account" label="Tài khoản">
        </el-table-column>

        <el-table-column prop="phone" label="Số điện thoại">
        </el-table-column>

        <el-table-column prop="address" label="Địa chỉ">
        </el-table-column>

        <el-table-column prop="balance" label="Số dư">
        </el-table-column>

        <el-table-column prop="sub_total" label="Có">
        </el-table-column>

        <el-table-column prop="unpaid" label="Nợ">
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
          name: '2016-05-03',
          account: 'Tom',
          phone: '0123456789',
          address: 'Ha Noi',
          balance: '123123123',
          sub_total: '34343434',
          unpaid: '3232323',
          total: '12398745'
        },
        {
          name: '2016-05-03',
          account: 'Tom',
          phone: '0123456789',
          address: 'Ha Noi',
          balance: '123123123',
          sub_total: '34343434',
          unpaid: '3232323',
          total: '12398745'
        },
        {
          name: '2016-05-03',
          account: 'Tom',
          phone: '0123456789',
          address: 'Ha Noi',
          balance: '123123123',
          sub_total: '34343434',
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
