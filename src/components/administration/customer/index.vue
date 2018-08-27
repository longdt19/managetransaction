<template>
<section>
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách khách hàng</span>
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

    <el-table-column label="Tên khách hàng" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>

    <el-table-column label="Tài khoản" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.azAccount}}
      </template>
    </el-table-column>

    <el-table-column label="Số điện thoại" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.phone}}
      </template>
    </el-table-column>

    <el-table-column label="Địa chỉ" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.address}}
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

  <add-customer-component ref='add_customer' />
  <edit-customer-component ref='edit_customer' @customer_edited="customer_edited"/>
  <delete-customer-component ref='delete_customer' @customer_deleted="customer_deleted" />
</section>
</template>

<script>
import EditCustomerComponent from './edit'
import AddCustomerComponent from './add'
import DeleteCustomerComponent from './delete'

export default {
  components: { EditCustomerComponent, AddCustomerComponent, DeleteCustomerComponent },
  data () {
    return {
      dataTable: [
        {
          'id': 6,
          'name': 'Khách Hàng 6',
          'azAccount': 'azpro6',
          'phone': '0982828282',
          'address': 'Hưng Yên',
          'creator': 'admin',
          'created': 1534404854000,
          'modifier': null,
          'modified': null
        },
        {
          'id': 7,
          'name': 'Khách Hàng 6',
          'azAccount': 'azpro6',
          'phone': '0982828282',
          'address': 'Hưng Yên',
          'creator': 'admin',
          'created': 1534404854000,
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
      this.$refs.add_customer.open()
    },
    open_edit (customer) {
      this.$refs.edit_customer.open(customer)
    },
    open_delete (bank) {
      this.$refs.delete_customer.open(bank)
    },
    customer_edited (customer) {
      console.log('edited', customer)
      const customer_index = this.dataTable.findIndex(item => item.id === customer.id)
      console.log('customer_index', customer_index)
      Object.assign(this.dataTable[customer_index], customer)
      console.log('this.data', this.dataTable)
    },
    customer_deleted () {
      console.log('refresh')
    }
  }
}
</script>

<style lang="css">
</style>
