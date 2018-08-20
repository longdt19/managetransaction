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
            <input type="username" class="form-control" id="id_email" placeholder="Username" name="username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="id_password" placeholder="Password" name="password">
          </div>
          <button  type="submit" class="btn btn-primary">Login In</button>
    </div></el-col>
  </el-row>
</section>
<!-- <div id="login-page">
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-md-8"><img src="/static/login/images/login.png" alt="" class="img-fluid"></div>
      <div class="col-sm-6 col-md-4 col-form">
        <br>
        <br>
        <div class="form-content">
          <h1 class="form-tittle">Login</h1>
          <p class="form-description">Sypply Chain Management System</p>
          <div class="form-group">
            <input type="username" class="form-control" id="id_email" placeholder="Username" name="username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="id_password" placeholder="Password" name="password">
          </div>
          <button  type="submit" class="btn btn-primary">Login In</button>
        </div>
      </div>
    </div>
  </div>
</div> -->
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
@import '../../../static/login/vendor/bootstrap.css';
@import '../../../static/login/1.css';
</style>
