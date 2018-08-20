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
            <span>Có: 165413216543</span>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <span>Nợ: 34653214654</span>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <span>Tổng: 65486431</span>
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
        <el-table-column prop="bank_name" label="Ngân hàng">
        </el-table-column>

        <el-table-column prop="account_number" label="Số tài khoản">
        </el-table-column>

        <el-table-column prop="owner" label="Chủ tài khoản">
        </el-table-column>

        <el-table-column prop="branch" label="Chi nhánh">
        </el-table-column>

        <el-table-column prop="balance" label="Số dư">
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
          bank_name: 'Vietcombank',
          account_number: '123123123',
          owner: 'ddawngj tung long',
          branch: 'HN',
          balance: '123123',
          sub_total: '222222',
          unpaid: '3232323',
          total: '12398745'
        },
        {
          bank_name: 'Vietcombank',
          account_number: '123123123',
          owner: 'ddawngj tung long',
          branch: 'HN',
          balance: '123123',
          sub_total: '222222',
          unpaid: '3232323',
          total: '12398745'
        }
      ],
      note_input_search: {
        'bank': 'Nhập tên ngân hàng',
        'category': 'Nhập loại giao dịch',
        'customer': 'Nhập khách hàng'
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
