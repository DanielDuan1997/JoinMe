<template>
  <div class="full-screen">
    <myheader left-icon=":iconfont icon-left-arrow" title="开启新的旅程" go-back></myheader>
    <mu-container>
      <mylogo></mylogo>
      <myselector :from.sync="from" :to.sync="to" :start-date.sync="startDate" :start-time.sync="startTime" :submit="submit"></myselector>
      <mywaiting v-if="waiting"></mywaiting>
      <mydialog :open.sync="notice.open" :title="notice.title" :text="notice.text" :close-color="notice.closeColor" :close-action="closeDialog"></mydialog>
    </mu-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {clearSession} from '@/static/sessionStorage'
import {clearLocal} from '@/static/localStorage'

export default {
  name: 'InitiateOrder',
  data () {
    return {
      from: ['张江'],
      to: ['邯郸'],
      startDate: '',
      startTime: '',
      waiting: false,
      notice: {
        open: false,
        title: "",
        text: "",
        closeColor: "primary",
        to: undefined,
      }
    }
  },
  methods: {
    ...mapActions('order', ['startOrder']),
    submit () {
      this.waiting = true
      this.startOrder({
        from: this.from[0],
        to: this.to[0],
        datetime: this.startDate + ' ' + this.startTime,
        callback: this.callback
      })
    },
    callback (status) {
      this.waiting = false
      if (status === 200) {
        this.notice = {
          open: true,
          title: "成功",
          text: "将回到首页",
          closeColor: "primary",
          to: "/"
        }
      } else if (status === 401) {
        this.notice = {
          open: true,
          title: "错误",
          text: "请重新登录",
          closeColor: "warning",
          to: "/login"
        }
      } else if (status === 500) {
        this.notice = {
          open: true,
          title: "错误",
          text: "服务器出错，请稍后重试",
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
