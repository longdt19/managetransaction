<template>
<section>
  <el-row style="margin-top: 20px">
    <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
      <el-form>
        <el-form-item label="Mã giao dịch(*)" label-width="130px">
          <el-input></el-input>
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
          <el-select v-model="input_bank" placeholder="Chọn ngân hàng" filterable clearable  style="width: 250px; border-color: red">
            <el-option
              style=" border-color: red"
              v-for="item in bank_list_loaded"
              :key="item.id"
              :label="item.bankName"
              :value="item.id"
              :name="item.bankAccount">
              <span style="float: left">{{ item.bankName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userName }}</span>
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="Ngân hàng nhận" label-width="130px">
          <el-select v-model="input_bank" placeholder="Chọn ngân hàng" filterable clearable  style="width: 250px; border-color: red">
            <el-option
              style=" border-color: red"
              v-for="item in bank_list_loaded"
              :key="item.id"
              :label="item.bankName"
              :value="item.id"
              :name="item.bankAccount">
              <span style="float: left">{{ item.bankName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userName }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Số tiền(*)" label-width="130px">
          <div class="">
            <vue-numeric  separator="," v-model="price_input" class="mngt-input"></vue-numeric>
          </div>
        </el-form-item>

        <el-form-item label="Phí dịch vụ(*)" label-width="130px">
          <div class="">
            <vue-numeric  separator="," v-model="price_input" class="mngt-input"></vue-numeric>
          </div>
        </el-form-item>
      </el-form>
    </div></el-col>

  </el-row>

  <div class="" style="text-align: right; margin-bottom: 20px">
    <span slot="footer" class="dialog-footer">
      <el-button @click="close_dialog()">Hủy bỏ</el-button>
      <el-button type="primary">Tạo mới</el-button>
    </span>
  </div>
</section>

</template>

<script>
import getDays from '@/utils/day'

export default {
  props: ['bank_list_loaded'],
  data () {
    return {
      input_bank: '',
      price_input: '',
      created_input: ''
    }
  },
  methods: {
    getDays,
    close_dialog () {
      this.$emit('close_dialog')
    },
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
