<template>
  <div>
    <mu-paper :z-depth="1" class="paper">
      <mu-list style="text-align: left; padding: 0">
        <mu-list-item>
          <mu-row @click="showFrom=true" class="full-width">
            <mu-col span="2">
              <mu-icon value=":iconfont icon-point" size="20" color="green"></mu-icon>
            </mu-col>
            <mu-col span="4" class="title">
              出发地
            </mu-col>
            <mu-col span="6" class="text">
              {{myFrom[0]}}
            </mu-col>
          </mu-row>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item>
          <mu-row @click="showTo=true" class="full-width">
            <mu-col span="2">
              <mu-icon value=":iconfont icon-point" size="20" color="orange"></mu-icon>
            </mu-col>
            <mu-col span="4" class="title">
              目的地
            </mu-col>
            <mu-col span="6" class="text">
              {{myTo[0]}}
            </mu-col>
          </mu-row>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item>
          <mu-row @click="showDate=true" class="full-width">
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
          <mu-row @click="showTime=true" class="full-width">
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
      <mu-button color="primary" style="width: 80%; font-weight: bold; font-size: 17px" @click="mySubmit">
        发起拼单
      </mu-button>
    </div>

    <div v-if="showFrom" class="picker" v-on:click="clickFrom">
      <mu-slide-picker :slots="place" :visible-item-count="5" @change="(value) => {myFrom=[value]}" :values="myFrom" class="picker-content-1"></mu-slide-picker>
    </div>
    <div v-if="showTo" class="picker" v-on:click="clickTo">
      <mu-slide-picker :slots="place" :visible-item-count="5" @change="(value) => {myTo=[value]}" :values="myTo" class="picker-content-1"></mu-slide-picker>
    </div>
    <div v-if="showDate" class="picker" v-on:click="clickDate">
      <mu-date-picker color="primary" :date.sync="myStartDate" class="picker-content-2"></mu-date-picker>
    </div>
    <div v-if="showTime" class="picker" v-on:click="clickTime">
      <mu-time-picker color="primary" :time.sync="myStartTime" format="24hr" view-type="list" class="picker-content-2"></mu-time-picker>
    </div>

    <mydialog :open.sync="notice.open" :title="notice.title" :text="notice.text" :close-color="notice.closeColor" :close-action="() => notice.open=false"></mydialog>
  </div>
</template>

<script>
export default {
  name: 'myselector',
  props: {
    from: Array,
    to: Array,
    startDate: String,
    startTime: String,
    submit: Function
  },
  data () {
    return {
      place: [{
        width: "100%",
        textAlign: "center",
        values: ["张江", "邯郸", "枫林", "江湾"]
      }],
      myFrom: this.from,
      myTo: this.to,
      myStartDate: undefined,
      myStartTime: undefined,
      showFrom: false,
      showTo: false,
      showDate: false,
      showTime: false,
      notice: {
        open: false,
        title: undefined,
        text: undefined,
        closeColor: "primary"
      }
    }
  },
  computed: {
    myDate: function() {
      if (this.myStartDate !== undefined) {
        let year = this.myStartDate.getFullYear()
        let month = this.myStartDate.getMonth() + 1
        let date = this.myStartDate.getDate()
        return year + '-' + month + '-' + date
      }
      return "请选择日期"
    },
    myTime: function() {
      if (this.myStartTime !== undefined) {
        let hour = this.myStartTime.getHours()
        let minute = this.myStartTime.getMinutes()
        return this.pad(hour) + ':' + this.pad(minute)
      }
      return "请选择时间"
    }
  },
  watch: {
    myFrom (val) {
      this.$emit('update:from', val)
    },
    myTo (val) {
      this.$emit('update:to', val)
    },
    myDate (val) {
      this.$emit('update:startDate', val)
    },
    myTime (val) {
      this.$emit('update:startTime', val)
    }
  },
  methods: {
    pad (num) {
      if (num < 10) return '0' + num
      else return num
    },
    check () {
      if (this.myFrom[0] === this.myTo[0]) {
        this.notice = {
          open: true,
          title: "错误",
          text: "出发地与目的地相同",
          closeColor: "warning",
        }
        return false
      }
      if (this.myStartDate === undefined) {
        this.notice = {
          open: true,
          title: "错误",
          text: "未选择出发日期",
          closeColor: "warning"
        }
        return false
      }
      if (this.myStartTime === undefined) {
        this.notice = {
          open: true,
          title: "错误",
          text: "未选择出发时间",
          closeColor: "warning"
        }
        return false
      }
      let year = this.myStartDate.getFullYear()
      let month = this.myStartDate.getMonth()
      let date = this.myStartDate.getDate()
      let hour = this.myStartTime.getHours()
      let minute = this.myStartTime.getMinutes()
      let dateTime = new Date()
      dateTime.setFullYear(year, month, date)
      dateTime.setHours(hour, minute, 0)
      let curDateTime = new Date()
      if (dateTime < curDateTime) {
        this.notice = {
          open: true,
          title: '错误',
          text: '出发时间比当前时间早',
          closeColor: 'warning'
        }
        return false
      }
      return true
    },
    mySubmit () {
      if (this.check() === false) return;
      this.submit()
    },
    clickFrom (event) {
      if (event.target.className.toLowerCase() === "picker")
        this.showFrom = false
    },
    clickTo (event) {
      if (event.target.className.toLowerCase() === "picker")
        this.showTo = false
    },
    clickDate () {
      if (event.target.className.toLowerCase() === "picker")
        this.showDate = false
    },
    clickTime () {
      if (event.target.className.toLowerCase() === "picker")
        this.showTime = false
    }
  }
};
</script>

<style scoped>
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