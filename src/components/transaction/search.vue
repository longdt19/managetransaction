<template>
<section>
  <el-row :butter="10">
    <el-col :xs="24" :md="2"><div class="grid-content bg-purple">
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
            :value="item.accountNumber">
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
            :value="item.type">
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
            :value="item.name">
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
export default {
  data () {
    return {
      input_bank: '',
      input_product: '',
      input_customer: '',
      from_date: {
        day: null,
        month: null,
        year: null
      },
      to_date: {
        day: null,
        month: null,
        year: null
      }
    }
  },
  methods: {
    search () {
      console.log(this.$parent.from_date)
      console.log(this.$parent.from_date.getTime())

      if (this.input_bank === '' && this.input_product === '' && this.input_customer === '') {
        this.$message.error('Vui lòng chọn trường tìm kiếm')
        return ''
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
