<template>
<section>
  <div class="group">
    <span>Tìm kiếm:</span>
  </div>
  <el-row :butter="10">
    <!-- <el-col :xs="24" :md="2"><div class="grid-content bg-purple">
      <div class="group">
        <span>Tìm kiếm:</span>
      </div>
    </div></el-col> -->
    <el-col :xs="24" :sm="3"><div class="grid-content bg-purple">
      <div class="group" v-loading="$parent.bank.loading" element-loading-spinner="el-icon-loading">
        <el-select v-model="input_bank" placeholder="Ngân hàng" filterable clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          style="width: 180px"
        >
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

    <el-col :xs="24" :sm="3"><div class="grid-content bg-purple-light">
      <div class="group" v-loading="$parent.product.loading" element-loading-spinner="el-icon-loading">
        <el-select v-model="input_product" filterable placeholder="Sản phẩm" clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          style="width: 180px"
        >
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

    <el-col :xs="24" :sm="3"><div class="grid-content bg-purple">
      <div class="group" v-loading="$parent.customer.loading" element-loading-spinner="el-icon-loading">
        <el-select v-model="input_customer" placeholder="Khách hàng" filterable clearable :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          style="width: 180px"
        >
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

    <el-col :xs="24" :sm="3"><div class="grid-content bg-purple">
      <div class="group" v-loading="$parent.customer.loading" element-loading-spinner="el-icon-loading">
        <el-input placeholder="Mã giao dịch" v-model="code"
          clearable
          style="width: 180px"
          :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
        />
      </div>
    </div></el-col>

    <el-col :xs="24" :sm="3"><div class="grid-content bg-purple">
      <div class="group" v-loading="$parent.customer.loading" element-loading-spinner="el-icon-loading">
        <el-input placeholder="Ghi chú" v-model="note"
          clearable
          style="width: 180px"
          :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
        />
      </div>
    </div></el-col>

    <el-col :xs="24" :sm="3"><div class="grid-content bg-purple" style="">
      <div class="group">
        <el-select v-model="status" placeholder="Trạng thái"
          :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          style="width: 180px"
        >
          <el-option
            v-for="item in status_selections"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div></el-col>

    <el-col :xs="24" :sm="3"><div class="grid-content bg-purple" style="">
      <div class="group">
        <el-select v-model="type" placeholder="Phê duyệt"
          :disabled="common_data.navigation.TRANSACTION.getMethod === 0"
          style="width: 180px"
        >
          <el-option
            v-for="item in type_selections"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div></el-col>

    <el-col :xs="24" :sm="2" :md="2"><div class="grid-content bg-purple" style="">
      <div class="group">
        <el-button slot="append" icon="el-icon-search" @click.native="search" :disabled="common_data.navigation.TRANSACTION.getMethod === 0"></el-button>
      </div>
    </div></el-col>

  </el-row>
</section>
</template>

<script>
export default {
  data () {
    return {
      input_bank: null,
      input_product: null,
      input_customer: null,
      code: '',
      note: '',
      status: '',
      type: '',
      type_selections: [
        {
          value: 0,
          label: 'Đã tạo'
        },
        {
          value: 1,
          label: 'Đã duyệt'
        }
      ],
      status_selections: [
        {
          value: 1,
          label: 'Nhập'
        },
        {
          value: 2,
          label: 'Xuất'
        },
        {
          value: 3,
          label: 'Hoàn tiền'
        }
      ]
    }
  },
  watch: {
    'input_bank' (val) {
      this.load_data_to_search()
    },
    'input_product' (val) {
      this.load_data_to_search()
    },
    'input_customer' (val) {
      this.load_data_to_search()
    },
    '$parent.from_date' (val) {
      this.load_data_to_search()
    },
    '$parent.to_date' (val) {
      this.load_data_to_search()
    },
    'code' (val) {
      this.load_data_to_search()
    },
    'note' (val) {
      this.load_data_to_search()
    },
    'status' (val) {
      this.load_data_to_search()
    },
    'type' (val) {
      this.load_data_to_search()
    }
  },
  methods: {
    load_data_to_search () {
      if (!this.input_bank && !this.input_product &&
          !this.input_customer && !this.$parent.from_date &&
          !this.$parent.to_date && !this.note && !this.code) {
        this.$parent.new_search = {}
        this.$parent.load_transaction_list()
      }
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
      console.log('status', this.status)
      this.$parent.new_search = {
        'productId': product_id,
        'bankAccountId': bank_id,
        'customerId': customer_id,
        'fromDate': this.$parent.from_date,
        'toDate': this.$parent.to_date,
        'code': this.code,
        'note': this.note,
        'type': this.type,
        'status': this.status
      }
    },
    async search () {
      if (this.common_data.navigation.TRANSACTION.getMethod === 0) {
        return
      }
      if (this.$parent.from_date > this.$parent.to_date) {
        this.$message.error('Vui lòng nhập lại ngày thống kê')
        return
      }

      this.$parent.load_transaction_list()
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
