<template>
  <div class="full-screen">
    <myheader left-icon=":iconfont icon-left-arrow" title="JoinMe" go-back></myheader>
    <div v-for="order in orders">
      <myorderlist :from="order.from" :to="order.to" :initiator="order.initiator" :start-time="order.starttime" :location="order.location">
      </myorderlist>
    </div>
    <mydialog :open.sync="notice.open" :title="notice.title" :text="notice.text" :close-color="notice.closeColor" :close-action="closeDialog"></mydialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {clearSession} from '@/static/sessionStorage'
import {clearLocal} from '@/static/localStorage'

export default {
  name: 'Ongoing',
  data () {
    return {
      orders: undefined,
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
    this.getOngoingOrder({cbSuccess: this.cbSuccess, cbFail: this.cbFail})
  },
  methods: {
    ...mapActions('order', ['getOngoingOrder']),
    cbSuccess (data) {
      this.orders = data
    },
    cbFail (status) {
      console.log(status)
      if (status == 401) {
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
      } else if (status === 404) {
        this.notice = {
          open: true,
          title: "错误",
          text: "页面无法找到",
          closeColor: "warning",
          to: '/'
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