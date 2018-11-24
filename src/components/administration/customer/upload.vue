<template>
<el-dialog
  title="Tải lên danh sách khách hàng"
  :visible.sync="dialogVisible"
  width="700px"
  >
  <el-card class="box-card" style="margin-top: 20px">
    <div class="">
      <el-button @click="show_table">Hiển thị nội dung</el-button>
    </div>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>
  </el-card>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
    <el-button type="primary" @click="upload_file" :loading="loading">Tải lên</el-button>
  </span>
</el-dialog>
</template>

<script>
import { CUSTOMER_UPLOAD_EXCEL_URL } from '@/constants/endpoints'
import UploadExcelComponent from '@/components/helpers/UploadExcel'

export default {
  components: { UploadExcelComponent },
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      tableHeader: [],
      tableShowed: false,
      file: null,
      loading: false
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    async upload_file () {
      if (this.loading) return
      this.loading = true
      console.log('file', this.file)
      const formData = new FormData()
      formData.append('file', this.file)
      console.log('form', formData.get('file'))
      const response = await this.$services.do_request('post', CUSTOMER_UPLOAD_EXCEL_URL, formData)
      this.loading = false
      console.log('response', response)
    },
    beforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        this.file = file
        return true
      }

      this.$message({
        message: 'Vui lòng upload tệp có dung lượng nhỏ hơn 1mb',
        type: 'warning'
      })
      return false
    },
    handleSuccess ({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    show_table () {
      this.tableShowed = !this.tableShowed
    }
  }
}
</script>

<style lang="css">
</style>
