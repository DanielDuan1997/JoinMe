<template>
  <div class="full-screen">
    <div class="header">
      <mu-appbar style="width: 100%" color="primary">
        <mu-button icon slot="left">
          <mu-icon value=":iconfont icon-menu"></mu-icon>
        </mu-button>
        JoinMe
        <mu-button icon slot="right" @click="logOut(toLogin)">
          <mu-icon value=":iconfont icon-leave" size="20"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>

    <div v-if="shift === 'car'">
      <carpool></carpool>
    </div>
    <div v-else-if="shift === 'individual'">
      <individual></individual>
    </div>

    <div class="nav">
      <mu-bottom-nav :value.sync="shift" color="primary">
        <mu-bottom-nav-item value="car" title="拼车" icon=":iconfont icon-car"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="individual" title="个人" icon=":iconfont icon-individual"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div>
  </div>
</template>

<script>

import {mapActions} from 'vuex'

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
.margin-top-20 {
  margin-top: 20px;
}
</style>