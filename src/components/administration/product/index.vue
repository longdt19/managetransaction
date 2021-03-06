<template>
<section v-if="common_data.navigation.CAT_PRODUCT.status === 1">
  <div class="" style="margin-bottom: 20px">
    <el-row>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
        <span style="font-size: 24px; margin-bottom: 50px">Danh sách sản phẩm</span>
      </div></el-col>
      <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
        <el-button @click.native="open_add" type="primary" :disabled="common_data.navigation.CAT_PRODUCT.postMethod === 0">
          <i class="el-icon-plus" style="margin-right: 10px" />
          Thêm mới
        </el-button>
      </div></el-col>
    </el-row>
  </div>

  <div class="" style="text-align: right; margin-bottom: 20px">
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
    v-loading="loading"
    border
  >
    <el-table-column type="index" label="STT" width="50" align="center">
    </el-table-column>

    <el-table-column label="Ngày tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{converseTime(scope.row.created)}}
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

    <el-table-column label="Số dư" header-align="center" align="center">
      <template slot-scope="scope">
        {{formatNumber(scope.row.balance)}}
      </template>
    </el-table-column>

    <el-table-column label="Người tạo" header-align="center" align="center">
      <template slot-scope="scope">
        {{scope.row.creator}}
      </template>
    </el-table-column>

    <el-table-column label="Thao tác" header-align="center" align="center">
      <template slot-scope="scope">
          <el-button size="mini" @click="open_edit(scope.row)"
            :disabled="common_data.navigation.CAT_PRODUCT.putMethod === 0"
          >
            Sửa
          </el-button>
          <el-button size="mini" type="danger" @click="open_delete(scope.row)"
          :disabled="common_data.navigation.CAT_PRODUCT.deleteMethod === 0"
          >
            Xóa
          </el-button>
        </template>
    </el-table-column>
  </el-table>

  <div class="block" style="margin-top: 30px; text-align: right"
    v-if="common_data.navigation.CAT_PRODUCT.getMethod === 1"
  >
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
import { PRODUCT_URL } from '@/constants/endpoints'

import AddProductComponent from './add'
import EditProductComponent from './edit'
import DeleteProductComponent from './delete'

import converseTime from '@/utils/time'
import formatNumber from '@/utils/numeric'

export default {
  components: { AddProductComponent, EditProductComponent, DeleteProductComponent },
  data () {
    return {
      dataTable: [],
      pagination: {
        totalPage: null,
        totalElement: null,
        page: 1,
        per_page: 10,
        list: [10, 20, 30]
      },
      loading: false
    }
  },
  watch: {
    'pagination.per_page' (val) {
      if (this.common_data.navigation.CAT_PRODUCT.getMethod === 1) {
        this.pagination.page = 1
        this.load_product_list()
      }
    },
    'pagination.page' (val) {
      if (this.common_data.navigation.CAT_PRODUCT.getMethod === 1) {
        this.load_product_list()
      }
    }
  },
  methods: {
    converseTime,
    formatNumber,
    async load_product_list () {
      if (this.common_data.navigation.CAT_PRODUCT.getMethod === 0) {
        return
      }

      if (this.loading) return
      this.loading = true

      if (this.pagination.per_page > this.pagination.totalElement) {
        this.pagination.page = 1
      }

      let data = {
        size: this.pagination.per_page,
        page: this.pagination.page - 1
      }

      const response = await this.$services.do_request('get', PRODUCT_URL, data)
      this.loading = false

      if (response.data.data.content) {
        this.pagination.totalPage = response.data.data.totalPages
        this.pagination.totalElement = response.data.data.totalElements
        this.dataTable = response.data.data.content
      } else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/e-500')
      }
    },
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
      this.load_product_list()
    }
  },
  created () {
    if (this.common_data.navigation.CAT_PRODUCT.getMethod === 1) {
      this.load_product_list()
    }
  }
}
</script>

<style scoped="">
.el-loading-spinner {
  top: 50%
}
</style>
