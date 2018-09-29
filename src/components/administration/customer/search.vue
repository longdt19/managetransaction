<template>
  <section>
    <el-row>
      <el-col :md="24" :lg="5" :xl="5"><div class="grid-content bg-purple">
        <el-input v-model='username' placeholder="Nhập tên đăng nhập" style="width: 200px" clearable/>
      </div></el-col>

      <el-col :md="24" :lg="4" :xl="4"><div class="grid-content bg-purple-light">
        <el-input v-model='phone' placeholder="Nhập số điện thoại" style="width: 170px" clearable/>
      </div></el-col>

      <el-col :md="24" :lg="6" :xl="6"><div class="grid-content bg-purple">
        <el-input v-model='address' placeholder="Nhập địa chỉ khách hàng" style="width: 220px" clearable/>
      </div></el-col>

      <el-col :span="5"><div class="grid-content bg-purple">
        <el-button @click="search" slot="append" icon="el-icon-search" :disabled="this.common_data.navigation.CAT_CUSTOMER.getMethod === 0"></el-button>
      </div></el-col>

    </el-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      phone: '',
      address: '',
      loading: false
    }
  },
  watch: {
    'username' (val) {
      this.load_data_to_search()
    },
    'phone' (val) {
      this.load_data_to_search()
    },
    'address' (val) {
      this.load_data_to_search()
    }
  },
  methods: {
    search () {
      this.$parent.loading_customer_list()
    },
    load_data_to_search () {
      if (this.username === '' && this.phone === '' && this.address === '') {
        this.$parent.loading_customer_list()
      }
      let username = this.username
      let phone = this.phone
      let address = this.address

      if (this.username === '') username = ''
      if (this.phone === '') phone = ''
      if (this.address === '') address = ''

      this.$parent.new_search = {
        'azAccount': username,
        'address': address,
        'phone': phone
      }
    },
    check_null_before_create () {
      if (!this.username && !this.phone && !this.address) {
        this.$message.error('Vui lòng không được để trống')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="css">
</style>
