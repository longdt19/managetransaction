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

      <el-menu-item index="transaction" @click.native="go_to('transaction')" v-if="common_data.navigation.TRANSACTION.status === 1">
        <el-tooltip class="item" effect="dark" content="Thống kê chung" placement="right">
          <img src="../../assets/icon/dashboard.svg" style="width: 30px" />
        </el-tooltip>
        <span>Chi tiết</span>
      </el-menu-item>

      <el-menu-item index="banking-accounts" @click.native="go_to('banking-accounts')" v-if="common_data.navigation.STA_BANK.status === 1">
        <el-tooltip class="item" effect="dark" content="Thống kê chi tiết tài khoản ngân hàng" placement="right">
          <img src="../../assets/icon/bank.svg" style="width: 30px" />
        </el-tooltip>
        <span>Ngân hàng</span>
      </el-menu-item>

      <el-menu-item index="customer-accounts" @click.native="go_to('customer-accounts')" v-if="common_data.navigation.STA_CUSTOMER.status === 1">
        <el-tooltip class="item" effect="dark" content="Thống kê chi tiết tài khoản khách hàng" placement="right">
          <img src="../../assets/icon/customer.svg" style="width: 30px" />
        </el-tooltip>
        <span>Khách hàng</span>
      </el-menu-item>

      <el-menu-item index="products" @click.native="go_to('products')" v-if="common_data.navigation.STA_PRODUCT.status === 1">
        <el-tooltip class="item" effect="dark" content="Thống kê chi tiết các sản phẩm" placement="right">
          <img src="../../assets/icon/product.svg" style="width: 30px" />
        </el-tooltip>
        <span>Sản phẩm</span>
      </el-menu-item>

      <el-menu-item-group title="Quản trị" style="margin-left: -10px; margin-top: 10px; margin-bottom: 10px"
        v-if="common_data.navigation.CAT_BANK.status === 1 ||
              common_data.navigation.CAT_PRODUCT.status === 1 ||
              common_data.navigation.CAT_CUSTOMER.status === 1 ||
              common_data.navigation.CAT_CUSTOMER_GR.status === 1 ||
              common_data.navigation.AD_ROLE.status === 1 ||
              common_data.navigation.AD_USER.status === 1">
      </el-menu-item-group>

      <el-submenu index="1"
        v-if="common_data.navigation.CAT_BANK.status === 1 ||
              common_data.navigation.CAT_PRODUCT.status === 1 ||
              common_data.navigation.CAT_CUSTOMER.status === 1 ||
              common_data.navigation.CAT_CUSTOMER_GR.status === 1"
      >
        <template slot="title">
          <img src="../../assets/icon/category.svg" style="width: 30px" />
          <span>Danh mục</span>
        </template>
        <el-menu-item index="1-1" @click.native="go_to('bank-admin')" v-if="common_data.navigation.CAT_BANK.status === 1">Ngân hàng</el-menu-item>
        <el-menu-item index="1-2" @click.native="go_to('product-admin')" v-if="common_data.navigation.CAT_PRODUCT.status === 1">Sản phẩm</el-menu-item>
        <el-menu-item index="1-3" @click.native="go_to('customer-admin')" v-if="common_data.navigation.CAT_CUSTOMER.status === 1">Khách hàng</el-menu-item>
        <el-menu-item index="1-6" @click.native="go_to('customer-group-admin')" v-if="common_data.navigation.CAT_CUSTOMER_GR.status === 1">Nhóm khách hàng</el-menu-item>
      </el-submenu>

      <el-submenu index="2"
        v-if="common_data.navigation.AD_ROLE.status === 1 || common_data.navigation.AD_USER.status === 1"
      >
        <template slot="title">
          <img src="../../assets/icon/user.svg" style="width: 30px" />
          <span>Người dùng</span>
        </template>
        <el-menu-item index="1-4" @click.native="go_to('role-admin')" v-if="common_data.navigation.AD_ROLE.status === 1">Nhóm người dùng</el-menu-item>
        <el-menu-item index="1-5" @click.native="go_to('user-admin')" v-if="common_data.navigation.AD_USER.status === 1">Người dùng</el-menu-item>
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
