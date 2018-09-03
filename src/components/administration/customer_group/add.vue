<template>
<section>
  <el-dialog title="Sửa thông tin ngân hàng" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên nhóm" :label-width="formLabelWidth">
        <el-input v-model="name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Thông tin" :label-width="formLabelWidth">
        <el-input v-model="description" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogFormVisible = false">Hủy bỏ</el-button>
      <el-button size="mini" type="primary" @click="add_group" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { CUSTOMER_GROUP_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      name: '',
      description: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      loading: null
    }
  },
  methods: {
    open (group) {
      this.dialogFormVisible = true
    },
    async add_group () {
      if (this.common_data.navigation.CAT_CUSTOMER_GR.postMethod === 0) {
        return
      }
      if (this.validate_input() === false) {
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        name: this.name,
        description: this.description
      }

      const response = await this.$services.do_request('post', CUSTOMER_GROUP_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.name = ''
        this.description = ''
        this.$parent.load_customer_group_list()
        this.$message.success('Thêm mới nhóm khách hàng thành công')
        this.dialogFormVisible = false
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    },
    validate_input () {
      if (this.name === '') {
        this.$message.error('Tên nhóm không được để trống')
        return false
      }

      return true
    }
  }
}
</script>

<style lang="css">
</style>
