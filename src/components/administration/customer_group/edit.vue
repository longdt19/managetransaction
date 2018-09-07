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
      <el-button size="mini" type="primary" @click="edit" :loading="loading">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { NUMBER_VALIDATOR } from '@/constants'
import { CUSTOMER_GROUP_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      name: '',
      description: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      group: {},
      loading: null
    }
  },
  methods: {
    validate_number (number) {
      return NUMBER_VALIDATOR.test(number)
    },
    open (group) {
      this.name = group.name
      this.description = group.description
      this.group = group
      this.dialogFormVisible = true
    },
    async edit () {
      if (this.common_data.navigation.CAT_CUSTOMER_GR.putMethod === 0) {
        this.$message.error('Bạn không đủ quyền hạn để thực hiện chức năng này')
        return
      }
      if (this.validate_input() === false) {
        return
      }

      if (this.loading) return
      this.loading = true

      let data = {
        id: this.group.id,
        name: this.name,
        description: this.description
      }

      const response = await this.$services.do_request('put', CUSTOMER_GROUP_URL, data)
      this.loading = false

      if (response.data.message === 'Success') {
        this.group.name = this.name
        this.group.description = this.description
        this.$emit('group_edited', this.group)
        this.$message.success('Cập nhật nhóm khách hàng thành công')
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
