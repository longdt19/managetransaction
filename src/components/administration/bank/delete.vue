<template>
<section>
  <el-dialog
    title="Cảnh báo"
    :visible.sync="centerDialogVisible"
    width="400px"
    center>
    <div class="" style="text-align: center">
      <span>Sau khi xóa sẽ không thể phục hồi.</span>
    </div>
    <div class="" style="text-align: center">
      <span>Bạn muốn tiếp tục thao tác ?</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
export default {
  data () {
    return {
      centerDialogVisible: false
    }
  },
  methods: {
    open (bank) {
      this.centerDialogVisible = true
    }
  }
}
</script>

<style lang="css">
</style>
