<template>
<section>
  <h1>banking-accounts</h1>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column prop="bank_name" label="Ngân hàng">
    </el-table-column>

    <el-table-column prop="account_number" label="Số tài khoản">
    </el-table-column>

    <el-table-column prop="owner" label="Chủ tài khoản">
    </el-table-column>

    <el-table-column prop="branch" label="Chi nhánh">
    </el-table-column>

    <el-table-column prop="balance" label="Số dư">
    </el-table-column>

    <el-table-column prop="sub_total" label="Có">
    </el-table-column>

    <el-table-column prop="unpaid" label="Nợ">
    </el-table-column>

    <el-table-column prop="total" label="Tổng">
    </el-table-column>
  </el-table>
</section>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          bank_name: 'Vietcombank',
          account_number: '123123123',
          owner: 'ddawngj tung long',
          branch: 'HN',
          balance: '123123',
          sub_total: '222222',
          unpaid: '3232323',
          total: '12398745'
        },
        {
          bank_name: 'Vietcombank',
          account_number: '123123123',
          owner: 'ddawngj tung long',
          branch: 'HN',
          balance: '123123',
          sub_total: '222222',
          unpaid: '3232323',
          total: '12398745'
        }
      ]
    }
  }
}
</script>
