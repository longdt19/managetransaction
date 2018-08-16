<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      mode="vertical"
      :show-timeout="200"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
    <el-menu-item index="transaction" @click.native="go_to('transaction')">
      <i class="el-icon-menu"></i>
      <span>Chi tiết</span>
    </el-menu-item>
      <el-menu-item index="banking-accounts" @click.native="go_to('banking-accounts')">
        <i class="el-icon-menu"></i>
        <span>Ngân hàng</span>
      </el-menu-item>
      <el-menu-item index="customer-accounts" @click.native="go_to('customer-accounts')">
        <i class="el-icon-setting"></i>
        <span>Khách hàng</span>
      </el-menu-item>
      <el-menu-item index="products" @click.native="go_to('products')">
        <i class="el-icon-setting"></i>
        <span>Sản phẩm</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: { },
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
  }
}
</script>
