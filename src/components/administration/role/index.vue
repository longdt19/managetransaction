<template>
  <section v-if="common_data.navigation.AD_ROLE.status === 1">
    <div class="" style="margin-bottom: 20px">
      <el-row>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple">
          <span style="font-size: 24px; margin-bottom: 50px">Thống kê các quyền hạn</span>
        </div></el-col>
        <el-col :xs="24" :md="12"><div class="grid-content bg-purple-light" style="text-align: right">
          <el-button @click="open_add_role" :disabled="common_data.navigation.AD_ROLE.postMethod === 0">
            Thêm mới
          </el-button>
        </div></el-col>
      </el-row>
    </div>

    <div class="" style="display: flex; align-items: flex-end; justify-content: space-between">

      <!-- <div class=""  style="margin-top: 15px">
        <search-component ></search-component>
      </div>
      <div class="" style="text-align: right">
        <el-row>
          <span>Hiển thị: </span>
          <el-select v-model="pagination.per_page" style="width: 80px">
            <el-option
              v-for="item in pagination.list"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-row>
      </div> -->
    </div>

    <el-table
      :data="role_list"
      style="width: 100%"
      v-loading="loading"
    >

      <el-table-column type="index" label="STT" width="50" align="center">
      </el-table-column>

      <el-table-column label="Tên">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="Quyền hạn">
        <template slot-scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="Người tạo">
        <template slot-scope="scope">
          {{scope.row.creator}}
        </template>
      </el-table-column>

      <el-table-column label="Ngày tạo">
        <template slot-scope="scope">
          {{formatDate(scope.row.created)}}
        </template>
      </el-table-column>

      <el-table-column label="Thao tác" header-align="center" align="center">
        <template slot-scope="scope">
            <el-button size="mini" @click="open_edit(scope.row)"
              :disabled="common_data.navigation.AD_ROLE.putMethod === 0"
            >
              Sửa
            </el-button>
            <el-button size="mini" type="danger"
              :disabled="common_data.navigation.AD_ROLE.deleteMethod === 0"
            >
              Xóa
            </el-button>
          </template>
      </el-table-column>

    </el-table>

    <edit-role-component ref='edit_role' />
    <add-role-component ref='add_role' />
  </section>
</template>

<script>
import formatDate from '@/utils/time'

import { ROLE_URL } from '@/constants/endpoints'
import EditRoleComponent from './edit'
import AddRoleComponent from './add'

export default {
  components: { EditRoleComponent, AddRoleComponent },
  data () {
    return {
      role_list: [],
      loading: false
    }
  },
  methods: {
    formatDate,
    async load_role_list () {
      if (this.common_data.navigation.AD_ROLE.getMethod === 0) {
        return
      }

      if (this.loading) return
      this.loading = true

      const response = await this.$services.do_request('get', ROLE_URL)
      this.loading = false

      if (response.data.message === 'Success') {
        this.role_list = response.data.data.content
      } else if (response.status === 400) {
        console.log('Bad resquest')
      } else {
        this.$router.push('/e-500')
      }
    },
    open_edit (role) {
      this.$refs.edit_role.open(role)
    },
    open_add_role () {
      this.$refs.add_role.open()
    }
  },
  created () {
    if (this.common_data.navigation.AD_ROLE.getMethod === 1) {
      this.load_role_list()
    }
  }
}
</script>

<style lang="css">
</style>
