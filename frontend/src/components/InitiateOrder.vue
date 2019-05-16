<template>
  <div class="full-screen">
    <myheader left-icon=":iconfont icon-left-arrow" title="开启新的旅程" go-back></myheader>
    <mu-container>
      <mylogo></mylogo>
      <mu-paper :z-depth="1" class="paper">
        <mu-list style="text-align: left; padding: 0">
          <mu-list-item>
            <mu-row @click="showFrom" class="full-width">
              <mu-col span="2">
                <mu-icon value=":iconfont icon-point" size="20" color="green"></mu-icon>
              </mu-col>
              <mu-col span="4" class="title">
                出发地
              </mu-col>
              <mu-col span="6" class="text">
                {{from.address[0]}}
              </mu-col>
            </mu-row>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item>
            <mu-row @click="showTo" class="full-width">
              <mu-col span="2">
                <mu-icon value=":iconfont icon-point" size="20" color="orange"></mu-icon>
              </mu-col>
              <mu-col span="4" class="title">
                目的地
              </mu-col>
              <mu-col span="6" class="text">
                {{to.address[0]}}
              </mu-col>
            </mu-row>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item>
            <mu-row @click="showStartDate" class="full-width">
              <mu-col span="2">
                <mu-icon value=":iconfont icon-point" size="20" color="blue"></mu-icon>
              </mu-col>
              <mu-col span="4" class="title">
                出发日期
              </mu-col>
              <mu-col span="6" class="text">
                {{myDate}}
              </mu-col>
            </mu-row>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item>
            <mu-row @click="showStartTime" class="full-width">
              <mu-col span="2">
                <mu-icon value=":iconfont icon-point" size="20" color="red"></mu-icon>
              </mu-col>
              <mu-col span="4" class="title">
                出发时间
              </mu-col>
              <mu-col span="6" class="text">
                {{myTime}}
              </mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
      <div style="margin-top: 2%">
        <mu-button color="primary" style="width: 80%; font-weight: bold; font-size: 17px" @click="submit">
          发起拼单
        </mu-button>
      </div>
      <div v-if="from.showAddress" class="picker" v-on:click="clickFrom">
        <mu-slide-picker :slots="place" :visible-item-count="5" @change="fromAddressChange" :values="from.address" class="picker-content-1"></mu-slide-picker>
      </div>
      <div v-if="to.showAddress" class="picker" v-on:click="clickTo">
        <mu-slide-picker :slots="place" :visible-item-count="5" @change="toAddressChange" :values="to.address" class="picker-content-1"></mu-slide-picker>
      </div>
      <div v-if="date.show" class="picker" v-on:click="clickDate">
        <mu-date-picker color="primary" :date.sync="date.date" class="picker-content-2"></mu-date-picker>
      </div>
      <div v-if="time.show" class="picker" v-on:click="clickTime">
        <mu-time-picker color="primary" :time.sync="time.time" format="24hr" view-type="list" class="picker-content-2"></mu-time-picker>
      </div>
      <mywaiting v-if="waiting"></mywaiting>
      <mu-dialog :open.sync="notice.show" :title="notice.title" width="360">
        {{notice.text}}
        <mu-button slot="actions" flat :color="notice.closeColor" @click="closeDialog">好</mu-button>
      </mu-dialog>
    </mu-container>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import {removeAll} from "@/auth"
import {clearStorage} from "@/storage"

export default {
  name: 'InitiateOrder',
  data () {
    return {
      place: [{
        width: "100%",
        textAlign: "center",
        values: ["张江", "邯郸", "枫林", "江湾"]
      }],
      from: {
        showAddress: false,
        address: ["张江"]
      },
      to: {
        showAddress: false,
        address: ["邯郸"]
      },
      date: {
        show: false,
        date: undefined
      },
      time: {
        show: false,
        time: undefined
      },
      waiting: false,
      notice: {
        show: false,
        title: "",
        text: "",
        closeColor: "",
        callback: undefined
      }
    }
  },
  computed: {
    myDate: function() {
      if (this.date.date !== undefined) {
        let year = this.date.date.getFullYear()
        let month = this.date.date.getMonth() + 1
        let date = this.date.date.getDate()
        return year + '-' + month + '-' + date
      }
      return "请选择日期"
    },
    myTime: function() {
      if (this.time.time !== undefined) {
        let hour = this.time.time.getHours()
        let minute = this.time.time.getMinutes()
        return this.pad(hour) + ':' + this.pad(minute)
      }
      return "请选择时间"
    }
  },
  methods: {
    ...mapActions('order', ['startOrder']),
    pad (num) {
      if (num < 10)
        return '0' + num
      else
        return num
    },
    showFrom () {
      this.from.showAddress = true
    },
    fromAddressChange (value) {
      this.from.address = [value]
    },
    clickFrom (event) {
      if (event.target.className.toLowerCase() === "picker")
        this.from.showAddress = false
    },
    showTo () {
      this.to.showAddress = true
    },
    toAddressChange (value) {
      this.to.address = [value]
    },
    clickTo (event) {
      if (event.target.className.toLowerCase() === "picker")
        this.to.showAddress = false
    },
    showStartDate () {
      this.date.show = true
    },
    clickDate () {
      if (event.target.className.toLowerCase() === "picker")
        this.date.show = false
    },
    showStartTime () {
      this.time.show = true
    },
    clickTime () {
      if (event.target.className.toLowerCase() === "picker")
        this.time.show = false
    },
    check () {
      if (this.from.address[0] === this.to.address[0]) {
        this.notice = {
          show: true,
          title: "错误",
          text: "出发地与目的地相同",
          closeColor: "warning",
          to: undefined
        }
        return false
      }
      if (this.date.date === undefined) {
        this.notice = {
          show: true,
          title: "错误",
          text: "未选择出发日期",
          closeColor: "warning",
          callback: undefined
        }
        return false
      }
      if (this.time.time === undefined) {
        this.notice = {
          show: true,
          title: "错误",
          text: "未选择出发时间",
          closeColor: "warning",
          callback: undefined
        }
        return false
      }
      return true
    },
    submit () {
      if (this.check() === false) return
      this.waiting = true
      this.startOrder({
        from: this.from.address[0],
        to: this.to.address[0],
        callback: this.callback
      })
    },
    callback (status) {
      this.waiting = false
      if (status === 401) {
        this.notice = {
          show: true,
          title: "错误",
          text: "请重新登录",
          closeColor: "warning",
          to: "/login"
        }
      } else if (status === 500) {
        this.notice = {
          show: true,
          title: "错误",
          text: "连接服务器出错，请稍后重试",
          closeColor: "warning",
          to: undefined
        }
      } else if (status === 200) {
        this.notice = {
          show: true,
          title: "成功",
          text: "将回到首页",
          closeColor: "primary",
          to: "/"
        }
      } else {
        this.notice = {
          show: true,
          title: "错误",
          text: "未知错误",
          closeColor: "warning",
          to: undefined
        }
      }
    },
    closeDialog () {
      this.notice.show = false
      if (this.notice.to !== undefined) {
        if (this.notice.to === 'login') {
          removeAll()
          clearStorage()
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
.paper {
  margin-top: 50px;
  margin-left: 10%;
  width: 80%;
  max-width: 256px;
  max-width: 460px;
  background: rgba(255, 255, 255, 1);
}
.full-width {
  width: 100%;
}
.title {
  font-weight: bold;
  font-size: 17px;
}
.text {
  text-align: center;
  font-size: 17px;
}
.picker {
  background: rgba(157, 157, 157, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.picker-content-1 {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.picker-content-2 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
