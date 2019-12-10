<template>
  <div class="login_form">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
            <el-input v-model="formInline.loginName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formInline.loginPassword" placeholder="密码"></el-input>
        </el-form-item>
        <br />
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { req,setCookie }  from '../request';
export default {
  data() {
    return {
      formInline:{
        loginName:'',
        loginPassword:'',
      }
    }
  },
  methods: {
    async onSubmit() {
      const data = await req('POST','/api/v1/user/login',
      {loginName: this.formInline.loginName,loginPassword:this.formInline.loginPassword});
      if(data.code === 200){
        setCookie('token', data.data.token);
        this.$router.push({path:"/"})
      }
    }
  }
};
</script>

<style>
.login_form {
  color: red;
}
</style>
