<template>
  <section>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple">
        <el-input placeholder="Nhập tên đăng nhập" style="width: 250px"/>
      </div></el-col>

      <el-col :span="4"><div class="grid-content bg-purple-light">
        <el-input placeholder="Nhập số điện thoại" style="width: 200px"/>
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        <el-input placeholder="Nhập địa chỉ khách hàng" style="width: 300px"/>
      </div></el-col>

      <el-col :span="5"><div class="grid-content bg-purple">
        <el-button slot="append" icon="el-icon-search" :disabled="this.common_data.navigation.CAT_CUSTOMER.getMethod === 0"></el-button>
      </div></el-col>

    </el-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      input3: '',
      input4: '',
      input5: '',
      select: 'Chọn'
    }
  }
}
</script>

<style lang="css">
</style>
