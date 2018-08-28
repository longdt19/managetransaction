<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      mode="vertical"
      :show-timeout="200"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >

      <el-menu-item index="transaction" @click.native="go_to('transaction')">
        <el-tooltip class="item" effect="dark" content="Thống kê chung" placement="right">
          <i class="el-icon-setting"></i>
        </el-tooltip>
        <span>Chi tiết</span>
      </el-menu-item>

      <el-menu-item index="banking-accounts" @click.native="go_to('banking-accounts')">
        <el-tooltip class="item" effect="dark" content="Thống kê chi tiết tài khoản ngân hàng" placement="right">
          <i class="el-icon-setting"></i>
        </el-tooltip>
        <span>Ngân hàng</span>
      </el-menu-item>

      <el-menu-item index="customer-accounts" @click.native="go_to('customer-accounts')">
        <el-tooltip class="item" effect="dark" content="Thống kê chi tiết tài khoản khách hàng" placement="right">
          <i class="el-icon-setting"></i>
        </el-tooltip>
        <span>Khách hàng</span>
      </el-menu-item>

      <el-menu-item index="products" @click.native="go_to('products')">
        <el-tooltip class="item" effect="dark" content="Thống kê chi tiết các sản phẩm" placement="right">
          <i class="el-icon-setting"></i>
        </el-tooltip>
        <span>Sản phẩm</span>
      </el-menu-item>

      <el-menu-item-group title="Quản trị">
      </el-menu-item-group>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Danh mục</span>
        </template>
        <el-menu-item index="1-1" @click.native="go_to('bank-admin')">Ngân hàng</el-menu-item>
        <el-menu-item index="1-2" @click.native="go_to('customer-admin')">Khách hàng</el-menu-item>
        <el-menu-item index="1-3" @click.native="go_to('product-admin')">Sản phẩm</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Người dùng</span>
        </template>
        <el-menu-item index="1-4" @click.native="go_to('role-admin')">Quyền hạn</el-menu-item>
        <el-menu-item index="1-5" @click.native="go_to('user-admin')">Người dùng</el-menu-item>
      </el-submenu>

    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: { },
  data () {
    return {
      defaultActive: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    go_to (path) {
      this.$router.push('/' + path)
    }
  },
  created () {
    this.defaultActive = this.$route.name
  }
}
</script>
<style media="screen">
  #app .hideSidebar .el-submenu > .el-submenu__title {
    text-align: right;
  }
</style>
<style scoped="">
</style>
