<template>
<section>
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách sản phẩm</span>
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

    <el-table-column label="Mã sản phẩm" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.code}}
      </template>
    </el-table-column>

    <el-table-column label="Tên sản phẩm" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>

    <el-table-column label="Loại sản phẩm" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.type}}
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

  <add-product-component ref='add_product' />
  <edit-product-component ref='edit_product' @product_edited="product_edited"/>
  <delete-product-component ref='delete_product' @product_deleted="product_deleted" />
</section>
</template>

<script>
import AddProductComponent from './add'
import EditProductComponent from './edit'
import DeleteProductComponent from './delete'

export default {
  components: { AddProductComponent, EditProductComponent, DeleteProductComponent },
  data () {
    return {
      dataTable: [
        {
          'id': 1,
          'code': '2222',
          'name': 'Nạp tiền AZ',
          'type': 1,
          'creator': 'admin',
          'created': 1534404854000,
          'modifier': null,
          'modified': null
        },
        {
          'id': 3,
          'code': '2222',
          'name': 'Nạp tiền AZ',
          'type': 1,
          'creator': 'admin',
          'created': 1534404854000,
          'modifier': null,
          'modified': null
        },
        {
          'id': 2,
          'code': '2222',
          'name': 'Nạp tiền AZ',
          'type': 1,
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
      this.$refs.add_product.open()
    },
    open_edit (product) {
      this.$refs.edit_product.open(product)
    },
    open_delete (product) {
      this.$refs.delete_product.open(product)
    },
    product_edited (product) {
      const product_index = this.dataTable.findIndex(item => item.id === product.id)
      Object.assign(this.dataTable[product_index], product)
    },
    product_deleted () {
      console.log('refresh')
    }
  }
}
</script>

<style lang="css">
</style>
