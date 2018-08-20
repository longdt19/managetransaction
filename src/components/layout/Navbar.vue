<template>
<section>
  <el-menu class="navbar" mode="horizontal" style="margin-bottom: 10px">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-button @click="toggleSideBar" round size="small">
          <i :class="icon_class"></i>
        </el-button>
      </div></el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="text-align: right; margin-right: 20px">
          <span>longdt.19@gmail.com</span>
          <el-dropdown  trigger="click">
            <el-button  size="small">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="dialogChangePass = true">Đổi mật khẩu</el-button>

              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="dialogLogout = true">Đăng xuất</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-menu>

  <el-dialog title="Đổi mật khẩu" :visible.sync="dialogChangePass">
    <el-form>
      <el-form-item label="Mật khẩu cũ" label-width="120px">
        <el-input type="password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Mật khẩu mới" label-width="120px">
        <el-input type="password" auto-complete="off" v-model="new_pass1"></el-input>
      </el-form-item>

      <el-form-item label="Nhập lại" label-width="120px">
        <el-input type="password" auto-complete="off"  v-model="new_pass2"></el-input>
      </el-form-item>

      <el-form-item label-width="120px" v-if="check_change_pass(new_pass1, new_pass2) === false">
        <span style="color: #dc3545!important">*Mật khẩu mới không trùng nhau</span>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogChangePass = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="dialogChangePass = false" :disabled="check_change_pass(new_pass1, new_pass2) !== true">Xác nhận</el-button>
    </span>
  </el-dialog>

  <el-dialog
    title="Đăng xuất"
    :visible.sync="dialogLogout"
    width="30%"
    center>
    <span>Bạn có muốn tiếp tục đăng xuất ?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogLogout = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="dialogLogout = false">Xác nhận</el-button>
    </span>
  </el-dialog>
</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: { },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  data () {
    return {
      icon_class: '',
      dialogChangePass: false,
      old_pass: '',
      new_pass1: '',
      new_pass2: '',
      dialogLogout: false
    }
  },
  methods: {
    check_change_pass (pass1, pass2) {
      if (pass1.length === 0 || pass2.length === 0) return null
      if (pass1.length !== 0 && pass2.length !== 0) return pass1 === pass2
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
      this.change_icon_toggle()
    },
    change_icon_toggle () {
      if (this.sidebar.opened === false) {
        this.icon_class = 'el-icon-arrow-right'
      } else {
        this.icon_class = 'el-icon-arrow-left'
      }
    }
  },
  created () {
    this.change_icon_toggle()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 40px;
    height: 0px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
