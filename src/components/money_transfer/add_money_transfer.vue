<template>
<section>
  <el-button @click="dialogVisible = true" type="primary"  :disabled="common_data.navigation.TRANSACTION.postMethod === 0">
    <i class="el-icon-plus" style="margin-right: 10px" />
    Thêm mới
  </el-button>

  <el-dialog
    title="Tạo mới"
    :visible.sync="dialogVisible"
    width="75%"
    style="text-align: left"
  >

  <el-row style="margin-top: 20px">
    <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
      <el-form>
        <el-form-item label="Mã giao dịch(*)" label-width="130px">
          <el-input v-model="code"></el-input>
        </el-form-item>

        <el-form-item label="Ngày tạo" label-width="130px">
          <el-date-picker
            v-model="created_input"
            type="date"
            value-format="dd-MM-yyyy"
            format="dd-MM-yyyy"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div></el-col>

    <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
      <el-form>
        <el-form-item label="Ngân hàng chuyển" label-width="130px">
          <div class="group" v-loading="load_bank_list" element-loading-spinner="el-icon-loading">
            <el-select v-model="from_bank" placeholder="Ngân hàng" filterable clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
              style="width: 180px"
            >
              <el-option
                v-for="item in bank_list"
                :key="item.id"
                :label="item.bankName"
                :value="item.id"
                :name="item.bankAccount">
                <span style="float: left">{{ item.bankName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userName }}</span>
              </el-option>
            </el-select>
          </div>

        </el-form-item>

        <el-form-item label="Ngân hàng nhận" label-width="130px">
          <div class="group" v-loading="load_bank_list" element-loading-spinner="el-icon-loading">
            <el-select v-model="to_bank" placeholder="Ngân hàng" filterable clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
              style="width: 180px"
            >
              <el-option
                v-for="item in bank_list"
                :key="item.id"
                :label="item.bankName"
                :value="item.id"
                :name="item.bankAccount">
                <span style="float: left">{{ item.bankName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userName }}</span>
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="Số tiền(*)" label-width="130px">
          <div class="">
            <vue-numeric  separator="," v-model="price_input" class="mngt-input"></vue-numeric>
          </div>
        </el-form-item>

        <el-form-item label="Phí dịch vụ(*)" label-width="130px">
          <div class="">
            <vue-numeric  separator="," v-model="bank_fee" class="mngt-input"></vue-numeric>
          </div>
        </el-form-item>
      </el-form>
    </div></el-col>
    <div class="" style="text-align: right; margin-bottom: 20px">
      <span slot="footer" class="dialog-footer">
        <el-button @click="close_dialog()">Hủy bỏ</el-button>
        <el-button type="primary" @click="create">Tạo mới</el-button>
      </span>
    </div>
  </el-row>

</el-dialog>
</section>

</template>

<script>
import getDays from '@/utils/day'

import { TRANSACTION_URL } from '@/constants/endpoints'

export default {
  props: ['bank_list', 'load_bank_list'],
  data () {
    return {
      from_bank: null,
      to_bank: null,
      price_input: '',
      created_input: null,
      bank_fee: '',
      code: null,
      dialogVisible: false,
      loading: false
    }
  },
  methods: {
    getDays,
    close_dialog () {
      this.dialogVisible = false
    },
    async create () {
      if (this.loading) return
      this.loading = true

      const data = {
        'fromBankAccountId': this.from_bank,
        'toBankAccountId': this.to_bank,
        'created': this.created,
        'cost': this.price_input,
        'code': this.code,
        'type': 'CHUYEN_TIEN_NOI_BO'
      }

      const response = await this.$services.do_request('post', TRANSACTION_URL, data)
      this.loading = false

      console.log('response', response)

      if (response.data.message === 'Success') {
        this.$message.success('Chuyển tiền thành công')
        this.dialogVisible = false
      } else if (response.status === 400) {
        console.log('Bad request')
      } else {
        this.$router.push('/e-500')
      }
    }
  },
  created () {
    let days = getDays()
    this.created_input = days.to_date
  }
}
</script>

<style scoped="">
.el-input, el-input__inner {
  width: 250px;
}
.el-input--suffix .el-input__inner {
  width: 250px
}
.mngt-input {
  width: 250px
}
</style>
