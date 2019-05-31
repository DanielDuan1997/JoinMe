<template>
  <div class="full-screen">
    <myheader left-icon=":iconfont icon-left-arrow" title="JoinMe" go-back></myheader>
    <div>{{order}}</div>
    <mydialog :open.sync="notice.open" :title="notice.title" :text="notice.text" :close-color="notice.closeColor" :close-action="closeDialog"></mydialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'History',
  data () {
    return {
      order: undefined,
      notice: {
        open: false,
        title: "",
        text: "",
        closeColor: "primary",
        to: undefined,
      }
    }
  },
  created: function () {
    this.getSelfOrder({callback: this.callback})
  },
  methods: {
    ...mapActions('order', ['getSelfOrder']),
    callback (response) {
      if (response.status == 200) {
        this.order = response.text()
      } else if (response.status == 401) {
        this.notice = {
          open: true,
          title: "错误",
          text: "请重新登录",
          closeColor: "warning",
          to: "/login"
        }
      } else if (response.status === 500) {
        this.notice = {
          open: true,
          title: "错误",
          text: "服务器出错，请稍后重试",
          closeColor: "warning",
          to: undefined
        }
      } else if (response.status === 404) {
        this.notice = {
          open: true,
          title: "错误",
          text: "页面无法找到",
          closeColor: "warning",
          to: undefined
        }
      } else {
        this.notice = {
          open: true,
          title: "错误",
          text: "无法连接服务器",
          closeColor: "warning",
          to: undefined
        }
      }
    },
    closeDialog () {
      this.notice.open = false
      if (this.notice.to !== undefined) {
        if (this.notice.to === '/login') {
          clearSession()
          clearLocal()
        }
        this.$router.replace(this.notice.to)
      }
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
</style>