<template>
<section>
  <el-row :butter="10">
    <el-col :xs="24" :md="3"><div class="grid-content bg-purple">
      <div class="group">
        <span>Tìm kiếm:</span>
      </div>
    </div></el-col>
    <el-col :xs="24" :sm="6" :md="6"><div class="grid-content bg-purple">
      <div class="group" v-loading="$parent.bank.loading" element-loading-spinner="el-icon-loading">
        <el-select v-model="input_bank" placeholder="Chọn ngân hàng" filterable clearable>
          <el-option
            v-for="item in $parent.bank.list"
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

    <el-col :xs="24" :sm="6" :md="6"><div class="grid-content bg-purple-light">
      <div class="group" v-loading="$parent.product.loading" element-loading-spinner="el-icon-loading">
        <el-select v-model="input_product" filterable placeholder="Chọn sản phẩm" clearable>
          <el-option
            v-for="item in $parent.product.list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :name="item.type">
          </el-option>
        </el-select>
      </div>
    </div></el-col>

    <el-col :xs="24" :sm="6" :md="6"><div class="grid-content bg-purple">
      <div class="group" v-loading="$parent.customer.loading" element-loading-spinner="el-icon-loading">
        <el-select v-model="input_customer" placeholder="Chọn khách hàng" filterable clearable>
          <el-option
            v-for="item in $parent.customer.list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :name="item.name">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.azAccount }}</span>
          </el-option>
        </el-select>
      </div>
    </div></el-col>

    <el-col :xs="24" :sm="2" :md="3"><div class="grid-content bg-purple" style="">
      <div class="group">
        <el-button slot="append" icon="el-icon-search" @click.native="search"></el-button>
      </div>
    </div></el-col>
  </el-row>
</section>
</template>

<script>
import { TRANSACTION_URL } from '@/constants/endpoints'

export default {
  data () {
    return {
      input_bank: null,
      input_product: null,
      input_customer: null
    }
  },
  methods: {
    async search () {
      if (this.$parent.from_date > this.$parent.to_date) {
        this.$message.error('Vui lòng nhập lại ngày thống kê')
        return
      }

      if (this.$parent.transaction.loading) return
      this.$parent.transaction.loading = true

      let bank_id = this.input_bank
      let product_id = this.input_product
      let customer_id = this.input_customer

      if (this.input_bank === '') {
        bank_id = 0
      }
      if (this.input_product === '') {
        product_id = 0
      }
      if (this.input_customer === '') {
        customer_id = 0
      }
      const data = {
        search: {
          'productId': bank_id,
          'bankAccountId': product_id,
          'customerId': customer_id,
          'fromDate': this.$parent.from_date,
          'toDate': this.$parent.to_date
        },
        size: 10,
        page: 0
      }

      const response = await this.$services.do_request('get', TRANSACTION_URL, data)
      this.$parent.transaction.loading = false
      console.log('response', response)
      if (response.data.data) {
        this.$parent.transaction.list = response.data.data.data.content
        this.$parent.statistic = response.data.data.statistic
      } else {
        this.$router.push('/e-500')
      }
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  .group {
    position:relative;
    margin-right: 5px
  }
  input {
    font-size: 14px;
    padding: 20px 0 10px 0;
    display: block;
    width: 100%;
    color: #495057;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    text-indent: 20px;
    background: #fcfcfc;
  }
  input:focus {
    outline:none;
    background: #fff;
  }

  /* LABEL ======================================= */
  label {
    color:#999;
    font-size: 13px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 20px;
    top: 13px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  /* active state */
  input:focus ~ label, input:valid ~ label {
    top: 3px;
    font-size: 11px;
    color: #676767;
    font-weight: bold;
  }

  input:focus {
    border-color: #0088cc;
  }

</style>
<style media="screen">
.el-loading-spinner {
  top: 80%
}
</style>
