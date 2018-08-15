<template lang="html">
<section>
      <h5>Custom colors</h5>
      <el-menu
        :default-active="default_active"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="transaction" @click.native="go_to('transaction')">
          <i class="el-icon-document"></i>
          <span>Thống kê chi tiết</span>
        </el-menu-item>
        <el-menu-item index="banking-accounts" @click.native="go_to('banking-accounts')">
          <i class="el-icon-document"></i>
          <span>Tài khoản ngân hàng</span>
        </el-menu-item>
        <el-menu-item index="customer-accounts" @click.native="go_to('customer-accounts')">
          <i class="el-icon-setting"></i>
          <span>Tài khoản khách hàng</span>
        </el-menu-item>
        <el-menu-item index="products" @click.native="go_to('products')">
          <i class="el-icon-setting"></i>
          <span>Sản phẩm</span>
        </el-menu-item>
      </el-menu>
</section>
</template>

<script>
export default {
  data () {
    return {
      default_active: ''
    }
  },
  methods: {
    go_to (path) {
      this.$router.push('/' + path)
    }
  },
  created () {
    this.default_active = this.$route.name
    console.log(this.default_active)
  }
}
</script>

<style scoped="">
.lefbar-comtainer {
  height: 100%;
}
</style>
