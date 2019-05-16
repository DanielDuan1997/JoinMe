<template>
  <div class="header">
    <mu-appbar style="width: 100%" color="primary">
      <mu-button icon slot="left" @click="leftClick">
        <mu-icon :value="leftIcon"></mu-icon>
      </mu-button>
      {{title}}
      <mu-button v-if="leave" icon slot="right" @click="logOut(toLogin)">
        <mu-icon value=":iconfont icon-leave" size="20"></mu-icon>
      </mu-button>
      <mu-button v-else icon slot="right" class="invisible">
      </mu-button>
    </mu-appbar>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'myheader',
  props: {
    leftIcon: String,
    goBack: Boolean,
    title: String,
    leave: Boolean
  },
  methods: {
    ...mapActions('user', ['logOut']),
    toLogin () {
      this.$router.replace('/toLogin')
    },
    leftClick () {
      if (this.goBack) {
        this.$router.go(-1)
      }
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  text-align: center;
  margin-bottom: 20px;
}
.invisible {
  visible: false;
}
</style>
