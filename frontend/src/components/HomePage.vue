<template>
  <div class="full-screen">
    <div class="header">
      <mu-appbar style="width: 100%" color="primary">
        <mu-button icon slot="left">
          <mu-icon value=":iconfont icon-menu"></mu-icon>
        </mu-button>
        JoinMe
        <mu-button flat slot="right" @click="logOut(toLogin)"><span style="font-size:10px">LOGOUT</span></mu-button>
      </mu-appbar>
    </div>

    <div class="center" v-show="shift === 'car'">
      拼车嘛？
    </div>
    <div class="center" v-show="shift === 'homepage'">
      不拼！
    </div>

    <div class="nav">
      <mu-bottom-nav :value.sync="shift" color="primary">
        <mu-bottom-nav-item value="car" title="拼车" icon=":iconfont icon-car"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="homepage" title="主页" icon=":iconfont icon-homepage"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'HomePage',
  data () {
    return {
      shift: 'car'
    }
  },
  methods: {
    ...mapActions('user', ['logOut']),
    toLogin () {
      this.$router.replace('/toLogin')
    }
  }
};
</script>

<style>
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
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
}
.nav {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>