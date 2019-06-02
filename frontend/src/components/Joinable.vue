<template>
  <div class="full-screen">
    <myheader left-icon=":iconfont icon-left-arrow" title="JoinMe" go-back></myheader>
    <div v-if="orders.length">
      <div v-for="order in orders">
        <mu-paper class="list" :z-depth="0">
          <mu-row>
            <mu-col span="2"></mu-col>
            <mu-col span="3"><div class="large-size">{{order.from}}</div></mu-col>
            <mu-col span="2"><mu-icon value=":iconfont icon-right-solid-arrow" size="20" color="primary" class="right-arrow"></mu-icon></mu-col>
            <mu-col span="3"><div class="large-size">{{order.to}}</div></mu-col>
          </mu-row>
          <mu-row>
            <mu-col span="2"></mu-col>
            <mu-col span="3"><div class="medium-size">当前人数</div></mu-col>
            <mu-col span="7"><div class="medium-size">{{order.num_connect}}</div></mu-col>
          </mu-row>
          <mu-row>
            <mu-col span="2"></mu-col>
            <mu-col span="3"><div class="medium-size">发起人</div></mu-col>
            <mu-col span="7"><div class="medium-size">{{order.initiator}}</div></mu-col>
          </mu-row>
          <mu-row>
            <mu-col span="2"></mu-col>
            <mu-col span="3"><div class="medium-size">上车地点</div></mu-col>
            <mu-col span="7"><div class="medium-size">{{order.location}}</div></mu-col>
          </mu-row>
          <mu-row>
            <mu-col span="2"></mu-col>
            <mu-col span="3"><div class="medium-size">出发时间</div></mu-col>
            <mu-col span="7"><div class="medium-size">{{myStartTime(order.starttime)}}</div></mu-col>
          </mu-row>
          <mu-flex justify-content="center" align-items="center" class="button">
            <mu-button round color="primary" @click="joinOrder({task_id: order.task_id, cbSuccess: cbSuccess1, cbFail: cbFail})">加入</mu-button>
          </mu-flex>
        </mu-paper>
      </div>
    </div>
    <div v-else class="no-data">
      暂无更多数据
    </div>
    <mydialog :open.sync="notice.open" :title="notice.title" :text="notice.text" :close-color="notice.closeColor" :close-action="closeDialog"></mydialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {clearSession} from '@/static/sessionStorage'
import {clearLocal} from '@/static/localStorage'

export default {
  name: 'Joinable',
  data () {
    return {
      orders: [],
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
    this.getJoinableOrder({cbSuccess: this.cbSuccess, cbFail: this.cbFail})
  },
  methods: {
    ...mapActions('order', ['getJoinableOrder', 'joinOrder']),
    cbSuccess (data) {
      this.orders = data
    },
    cbSuccess1 (data) {
      this.notice = {
        open: true,
        title: "成功",
        text: "已加入此次拼车",
        closeColor: "primary",
        to: "/"
      }
    },
    cbFail (status) {
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
    pad (num) {
      if (num < 10) return '0' + num
      else return num
    },
    myStartTime (startTime) {
      startTime = new Date(startTime)
      let year = startTime.getFullYear()
      let month = startTime.getMonth() + 1
      let date = startTime.getDate()
      let hour = startTime.getHours()
      let minute = startTime.getMinutes()
      return year + "年" + month + "月" + date + "日" + " " + this.pad(hour) + ":" + this.pad(minute)
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
.list {
  margin-bottom: 10px;
}
.large-size {
  font-size: 25px;
  font-weight: bold;
}
.medium-size {
  font-size: 17px;
}
.right-arrow {
  line-height: 35px;
}
.button {
  padding-top: 10px;
  padding-bottom: 10px;
}
.no-data {
  margin-top: 10px;
}
</style>
