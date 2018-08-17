<template lang="html">
<section style="text-align: left">
  <el-button @click="dialogVisible = true">Thêm mới giao dịch</el-button>

  <el-dialog
    title="Tạo mới giao dịch"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-row style="margin-top: 20px">
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-form>
          <el-form-item label="Mã giao dịch" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Sản phẩm" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Người giao dịch" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Ngân hàng" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Ghi chú" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>
        </el-form>
        <!-- <el-form-item label="Số điện thoại" label-width="110px">
          <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-input>
        </el-form-item> -->
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">
        <el-form>
          <el-form-item label="Số tiền" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Chiết suất (%)" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Bớt tiền" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Tổng" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Đã thanh toán" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>

          <el-form-item label="Còn nợ" label-width="110px">
            <el-input placeholder="Mời nhập" v-model="input"></el-input>
          </el-form-item>
        </el-form>
      </div></el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="dialogVisible = false">Tạo mới</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('Bạn muốn hủy bỏ việc tạo mới giao dịch ?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped="">
.my-dialog {
  height: 500px;
}
.el-input, el-input__inner {
  width: 90%;
}
</style>
