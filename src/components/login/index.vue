<template>
<section>
  <el-row style="justify-content: center; align-items: center; display: flex">
    <el-col :xs="24"  :md="16"><div class="grid-content bg-purple">
      <img src="/static/login/images/login.png" alt="" class="img-fluid">
    </div></el-col>
    <el-col :xs="24" :md="8"><div class="grid-content bg-purple">
      <div class="" >
        <h2 class="form-tittle">Login</h2>
      </div>
          <p class="form-description">Management System</p>
          <div class="form-group">
            <input v-model="username" type="username" class="form-control" id="id_email" placeholder="Username" name="username">
          </div>
          <div class="form-group">
            <input v-model="password" type="password" class="form-control" id="id_password" placeholder="Password" name="password">
          </div>
          <button  type="submit" class="btn btn-primary" @click="login">Login In</button>
    </div></el-col>
  </el-row>
</section>
</template>

<script>
import { LOGIN_URL } from '@/constants/endpoints'
export default {
  data () {
    return {
      username: 'admin',
      password: 'admin'
    }
  },
  methods: {
    async login () {
      let formData = new FormData()
      formData.append('username', 'admin')
      formData.append('password', 'admin')
      const response = await this.$services.do_request('post', LOGIN_URL, formData)

      console.log('response', response)
    }
  }
}
</script>

<style scoped>
@import '../../../static/login/vendor/bootstrap.css';
@import '../../../static/login/1.css';
</style>
