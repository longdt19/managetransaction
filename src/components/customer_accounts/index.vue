<template>
  <section>
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê thao tài khoản khách hàng</span>
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
        border
        header-align="center"
      >
        <el-table-column prop="name" label="Tên">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="Tài khoản">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.account}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="Số điện thoại">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="Địa chỉ">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.address}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="balance" label="Số dư">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.balance}}</span>
          </template>
        </el-table-column>

        <el-table-column label="Đầu kỳ" header-align="center" border>
          <el-table-column label="Có">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Nợ">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Giữa kỳ" header-align="center" border>
          <el-table-column label="Có">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Nợ">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Cuối kỳ" header-align="center" border>
          <el-table-column label="Có">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Nợ">
            <template slot-scope="scope">
              <span style="font-size: 10px">100000000</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng">
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
          name: 'longdt',
          account: 'Tom',
          phone: '0123456789',
          address: 'Ha Noi',
          balance: '123123123',
          sub_total: '34343434',
          unpaid: '3232323',
          total: '12398745'
        },
        {
          name: 'longdt',
          account: 'Tom',
          phone: '0123456789',
          address: 'Ha Noi',
          balance: '123123123',
          sub_total: '34343434',
          unpaid: '3232323',
          total: '12398745'
        },
        {
          name: 'longdt',
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
  width: 150px;
}
div.cell {
  font-size: 10px
}
</style>
