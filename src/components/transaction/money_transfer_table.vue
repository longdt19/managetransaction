<template lang="">
<section>
  <div class="">
    <el-col :xs="24" :md="24">
      <el-row :gutter="10">
        <el-col :span="4"><div class="grid-content bg-purple" style="margin-left: 12px">
          <span>Từ ngày:</span>
          <el-date-picker
            v-model="from_date"
            type="date"
            value-format="dd-MM-yyyy"
            format="dd-MM-yyyy"
            :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          >
          </el-date-picker>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light">
          <span>Đến ngày:</span>
          <el-date-picker
            v-model="to_date"
            type="date"
            value-format="dd-MM-yyyy"
            format="dd-MM-yyyy"
            :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          >
          </el-date-picker>
        </div></el-col>

        <el-col :span="4"><div class="grid-content bg-purple">
          <span>Ngân hàng:</span>
          <div class="group" element-loading-spinner="el-icon-loading">
            <el-select v-model="input_bank" placeholder="Ngân hàng" filterable clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
              style="width: 180px"
            >
            </el-select>
          </div>
        </div></el-col>

        <el-col :span="2"><div class="grid-content bg-purple" style="">
          <span>Tìm kiếm:</span>
          <div class="group">
            <el-button slot="append" icon="el-icon-search" :disabled="common_data.navigation.TRANSACTION.getMethod === 0"></el-button>
          </div>
        </div></el-col>

      </el-row>
    </el-col>

    <el-table
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      >
      <el-table-column header-align="center" align="center"
        prop="date"
        label="Date"
        width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center"
        prop="name"
        label="Ngân hàng chuyển"
        width="180">
      </el-table-column>
      <el-table-column header-align="center" align="center"
        prop="address"
        label="Ngân hàng nhận">
      </el-table-column>
      <el-table-column header-align="center" align="center"
        prop="address"
        label="Phí giao dịch">
      </el-table-column>
      <el-table-column header-align="center" align="center"
        prop="address"
        label="Số tiền">
      </el-table-column>
      <el-table-column label="Thao tác" header-align="center" align="center">
        <template slot-scope="scope">
            <el-button size="mini"
              :disabled="common_data.navigation.TRANSACTION.putMethod === 0"
            >
              Sửa
            </el-button>
            <el-button size="mini"
              :disabled="common_data.navigation.TRANSACTION.deleteMethod === 0"
              type="danger"
            >
              Xóa
            </el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="block" style="margin-top: 30px; text-align: right" align="center"
    v-if="common_data.navigation.TRANSACTION.getMethod === 1"
  >
    <el-pagination
      layout="prev, pager, next"
    >
    </el-pagination>
  </div>
</section>
</template>

<script>
export default {
  data () {
    return {
      from_date: null,
      to_date: null,
      input_bank: null,
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  }
}
</script>

<style lang="css">
</style>
