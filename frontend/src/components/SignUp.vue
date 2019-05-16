<template>
  <div class="full-screen">
    <div class="header">
      <mu-appbar style="width: 100%" color="primary">
      </mu-appbar>
    </div>
    <div class="margin-top-40">
      <mylogo></mylogo>
    </div>
    <div>
      <mu-container class="margin-top-40">
        <mu-form ref="form" :model="validateForm" class="mu-form">
          <mu-form-item label="用户名" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field v-model="validateForm.password" prop="password" :type="visibility_pwd?'text':'password'" :action-icon="visibility_pwd?':iconfont icon-invisible':':iconfont icon-visible'" :action-click="() => visibility_pwd=!visibility_pwd"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="确认密码" prop="repeatPassword" :rules="repeatPasswordRules" @keyup.enter.native="submit()">
            <mu-text-field v-model="validateForm.repeatPassword" prop="repeatPassword" :type="visibility_rpwd?'text':'password'" :action-icon="visibility_rpwd?':iconfont icon-invisible':':iconfont icon-visible'" :action-click="() => visibility_rpwd=!visibility_rpwd"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <div class="login-btn">
              <mu-button color="primary" @click="submit">注册</mu-button>
              <mu-button @click="clear">重置</mu-button>
            </div>
          </mu-form-item>
        </mu-form>
        <mu-button flat color="primary" @click="toLogin">
            <mu-icon value=":iconfont icon-left-arrow"></mu-icon>&nbsp;回到登录
        </mu-button>
        <mu-dialog title="Fail" width="360" :open.sync="showDialog">
          {{dialogText}}
          <mu-button slot="actions" flat color="primary" @click="showDialog=false">关闭</mu-button>
        </mu-dialog>
      </mu-container>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      visibility_pwd: false,
      visibility_rpwd: false,
      showDialog: false,
      dialogText: '',
      validateForm: {
        username: '',
        password: '',
        repeatPassword: ''
      },
      usernameRules: [
        { validate: val => !!val, message: '用户名为空' }
      ],
      passwordRules: [
        { validate: val => val.length >= 6, message: '密码长度应大于5' }
      ],
      repeatPasswordRules: [
        { validate: val => val === this.validateForm.password, message: '密码不一样'}
      ]
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    ...mapActions('user', ['signUp']),
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true)
          this.signUp({ name: this.validateForm.username, password: this.validateForm.password, callback: this.alertSignUpResult })
      })
    },
    clear () {
      this.$refs.form.clear()
      this.validateForm = {
        username: '',
        password: '',
        repeatPassword: ''
      }
    },
    alertSignUpResult (text) {
      if (text === 'success')
        this.$router.replace('/')
      else {
        this.dialogText = text
        this.showDialog = true
      }
    },
    toLogin () {
      this.$router.replace('/login')
    }
  }
};
</script>

<style scoped>
.full-screen {
  height: 100%;
  width: 100%;
  position: 100%;
  top: 0;
  bottom: 0;
}
.header {
  height: 60px;
  text-align: center;
}
.margin-top-40 {
  margin-top: 40px;
}
.mu-form {
  margin-left: 10%;
  text-align: left;
  width: 60%;
  margin: 0 auto;
  max-width:460px;
  white-space: nowrap;
}
.login-btn {
  position: absolute;
  left: 50%;
  transform:translateX(-50%);
  margin-top: 10px;
}
</style>
