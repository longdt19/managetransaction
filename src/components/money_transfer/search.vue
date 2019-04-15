<template lang="html">
  <el-col :xs="24" :md="24">
    <el-row :gutter="10">
      <el-col :span="4"><div class="grid-content bg-purple" style="margin-left: 12px">
        <span>Từ ngày:</span>
        <el-date-picker
          v-model="from_date"
          type="date"
          value-format="dd-MM-yyyy"
          format="dd-MM-yyyy"
          :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
        >
        </el-date-picker>
      </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">
        <span>Đến ngày:</span>
        <el-date-picker
          v-model="to_date"
          type="date"
          value-format="dd-MM-yyyy"
          format="dd-MM-yyyy"
          :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
        >
        </el-date-picker>
      </div></el-col>

      <el-col :span="4"><div class="grid-content bg-purple">
        <span>Ngân hàng:</span>
        <div class="group" element-loading-spinner="el-icon-loading" v-loading="load_bank_list">
          <el-select v-model="input_bank" placeholder="Ngân hàng chuyển" filterable clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
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
      </div></el-col>

      <el-col :span="4"><div class="grid-content bg-purple">
        <span>Ngân hàng:</span>
        <div class="group" element-loading-spinner="el-icon-loading" v-loading="load_bank_list">
          <el-select v-model="input_bank" placeholder="Ngân hàng nhận" filterable clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
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
      </div></el-col>

      <el-col :span="2"><div class="grid-content bg-purple" style="">
        <span>Tìm kiếm:</span>
        <div class="group">
          <el-button slot="append" icon="el-icon-search"
            :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
            @click="search()"
          ></el-button>
        </div>
      </div></el-col>

    </el-row>
  </el-col>
</template>

<script>
export default {
  props: ['bank_list', 'load_bank_list'],
  data () {
    return {
      from_date: null,
      to_date: null,
      input_bank: null
    }
  },
  methods: {
    search () {
      const data = {
        'fromData': this.from_date,
        'toDate': this.to_date,
        'type': 'CHUYEN_TIEN_NOI_BO',
        'toBankAccountId': this.input_bank
      }

      this.$emit('search', data)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
