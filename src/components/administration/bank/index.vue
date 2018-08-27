<template>
<section>
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách ngân hàng</span>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button @click.native="open_add">Thêm mới</el-button>
      </div></el-col>
    </el-row>
  </div>

  <div class="" style="text-align: right">
    <span>Hiển thị: </span>
    <el-select v-model="pagination.per_page" style="width: 80px">
      <el-option
        v-for="item in pagination.list"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>

  <el-table
    :data="dataTable"
    style="width: 100%"
  >
    <el-table-column type="index" label="STT" width="50">
    </el-table-column>

    <el-table-column label="Ngày tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.created}}
      </template>
    </el-table-column>

    <el-table-column label="Ngân hàng" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.bankName}}
      </template>
    </el-table-column>

    <el-table-column label="Tài khoản" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.userName}}
      </template>
    </el-table-column>

    <el-table-column label="Số tài khoản" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.accountNumber}}
      </template>
    </el-table-column>

    <el-table-column label="Chi nhánh" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.branch}}
      </template>
    </el-table-column>

    <el-table-column label="Người tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.creator}}
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center">
      <template slot-scope="scope">
          <el-button size="mini" @click="open_edit(scope.row)">Sửa</el-button>
          <el-button size="mini" type="danger" @click="open_delete(scope.row)">Xóa</el-button>
        </template>
    </el-table-column>
  </el-table>

  <div class="block" style="margin-top: 30px; text-align: right">
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

  <add-bank-component ref='add_bank' />
  <edit-bank-component ref='edit_bank' @bank_edited="bank_edited"/>
  <delete-bank-component ref='delete_bank' @bank_deleted="bank_deleted" />
</section>
</template>

<script>
import AddBankComponent from './add'
import EditBankComponent from './edit'
import DeleteBankComponent from './delete'

import converseTime from '@/utils/time'

export default {
  components: { AddBankComponent, EditBankComponent, DeleteBankComponent },
  data () {
    return {
      dataTable: [
        {
          'id': 1,
          'userName': 'Vũ Văn Công',
          'bankName': 'Vietcombank',
          'accountNumber': '123456789',
          'branch': 'Cầu Giấy',
          'creator': 'admin',
          'created': 1534404854000,
          'modifier': null,
          'modified': null
        },
        {
          'id': 2,
          'userName': 'Vũ Văn Công2',
          'bankName': 'Vietcombank2',
          'accountNumber': '1234567892',
          'branch': 'Cầu Giấy2',
          'creator': 'admin2',
          'created': 15344048540002,
          'modifier': null,
          'modified': null
        }
      ],
      pagination: {
        totalPage: 5,
        totalElement: 10,
        page: 1,
        per_page: 10,
        list: [10, 20, 30]
      }
    }
  },
  watch: {
    'pagination.per_page' (val) {
      // load
    },
    'pagination.page' (val) {
      // load
    }
  },
  methods: {
    converseTime,
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
    open_add () {
      this.$refs.add_bank.open()
    },
    open_edit (bank) {
      this.$refs.edit_bank.open(bank)
    },
    open_delete (bank) {
      this.$refs.delete_bank.open(bank)
    },
    bank_edited (bank) {
      const bank_index = this.dataTable.findIndex(item => item.id === bank.id)
      Object.assign(this.dataTable[bank_index], bank)
    },
    bank_deleted () {
      console.log('refresh')
    }
  },
  created () {
  }
}
</script>

<style lang="css">
</style>
