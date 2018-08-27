<template>
<section>
  <el-dialog title="Sửa thông tin sản phẩm" :visible.sync="dialogFormVisible" width="500px">
    <el-form>
      <el-form-item label="Tên sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Mã sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="code" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Loại sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="type" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="edit">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      code: '',
      type: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      product: {}
    }
  },
  methods: {
    open (product) {
      this.name = product.name
      this.code = product.code
      this.type = product.type
      this.product = product
      this.dialogFormVisible = true
    },
    edit () {
      this.product.name = this.name
      this.product.code = this.code
      this.product.type = this.type
      this.$emit('product_edited', this.product)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="css">
</style>
