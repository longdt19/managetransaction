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
        header-align="center"
      >
        <el-table-column type="index" header-align="center"></el-table-column>

        <el-table-column prop="name" label="Tên" header-align="center">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="account" label="Tài khoản" header-align="center">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.account}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="Số điện thoại" header-align="center">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="Địa chỉ" header-align="center">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.address.description" placement="top">
              <span style="font-size: 10px">{{scope.row.address.name}}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="group" label="Nhóm khách hàng" header-align="center">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.group}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="note" label="Ghi chú" header-align="center">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.note}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="unpaid" label="Nợ trước" header-align="center">
          <template slot-scope="scope">
            <span style="font-size: 10px">{{scope.row.unpaid}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="before" label="Tồn đầu kỳ" header-align="center">
          <el-table-column label="Nạp" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.before.admission}}</span>
            </template>
          </el-table-column>

          <el-table-column label="Thanh toán" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.before.paid}}</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.before.total}}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column prop="mid" label="Tồn giữa kỳ" header-align="center">
          <el-table-column label="Nạp" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.mid.admission}}</span>
            </template>
          </el-table-column>

          <el-table-column label="Thanh toán" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.mid.paid}}</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.mid.total}}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column prop="behind" label="Tồn cuối kỳ" header-align="center">
          <el-table-column label="Nạp" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.behind.admission}}</span>
            </template>
          </el-table-column>

          <el-table-column label="Thanh toán" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.behind.paid}}</span>
            </template>
          </el-table-column>

          <el-table-column label="Tổng" header-align="center">
            <template slot-scope="scope">
              <span style="font-size: 10px">{{scope.row.behind.admission}}</span>
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
          address: {
            name: 'Ha Nội',
            description: '126 Nguyễn Trãi, Thanh Xuân'
          },
          group: 'truyền hình',
          note: 'hihihihihihihihihihihihihih',
          unpaid: '123123123',
          before: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          },
          mid: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          },
          behind: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          }
        },
        {
          name: 'longdt',
          account: 'Tom',
          phone: '0123456789',
          address: {
            name: 'Ha Nội',
            description: '126 Nguyễn Trãi, Thanh Xuân'
          },
          group: 'truyền hình',
          note: 'hihihihihihihihihihihihihih',
          unpaid: '123123123',
          before: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          },
          mid: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          },
          behind: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          }
        },
        {
          name: 'longdt',
          account: 'Tom',
          phone: '0123456789',
          address: {
            name: 'Ha Nội',
            description: '126 Nguyễn Trãi, Thanh Xuân'
          },
          group: 'truyền hình',
          note: 'hihihihihihihihihihihihihih',
          unpaid: '123123123',
          before: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          },
          mid: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          },
          behind: {
            admission: '123123123',
            paid: '123123123',
            total: '123123123'
          }
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
