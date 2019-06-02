<template>
  <div>
    <mu-paper class="list" :z-depth="0" :class="beforeTime()?'half-opacity':'full-opacity'">
      <mu-row>
        <mu-col span="2"></mu-col>
        <mu-col span="3"><div class="large-size">{{from}}</div></mu-col>
        <mu-col span="2"><mu-icon value=":iconfont icon-right-solid-arrow" size="20" color="primary" class="right-arrow"></mu-icon></mu-col>
        <mu-col span="3"><div class="large-size">{{to}}</div></mu-col>
      </mu-row>
      <mu-row>
        <mu-col span="2"></mu-col>
        <mu-col span="3"><div class="medium-size">发起人</div></mu-col>
        <mu-col span="7"><div class="medium-size">{{initiator}}</div></mu-col>
      </mu-row>
      <mu-row>
        <mu-col span="2"></mu-col>
        <mu-col span="3"><div class="medium-size">上车地点</div></mu-col>
        <mu-col span="7"><div class="medium-size">{{location}}</div></mu-col>
      </mu-row>
      <mu-row>
        <mu-col span="2"></mu-col>
        <mu-col span="3"><div class="medium-size">出发时间</div></mu-col>
        <mu-col span="7"><div class="medium-size">{{myStartTime}}</div></mu-col>
      </mu-row>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: 'myorderlist',
  props: {
    from: String,
    to: String,
    initiator: String,
    startTime: String,
    location: String
  },
  computed: {
    myStartTime: function() {
      let startTime = new Date(this.startTime)
      let year = startTime.getFullYear()
      let month = startTime.getMonth() + 1
      let date = startTime.getDate()
      let hour = startTime.getHours()
      let minute = startTime.getMinutes()
      return year + "年" + month + "月" + date + "日" + " " + this.pad(hour) + ":" + this.pad(minute)
    }
  },
  methods: {
    pad (num) {
      if (num < 10) return '0' + num
      else return num
    },
    beforeTime () {
      let startTime = new Date(this.startTime)
      let curTime = new Date()
      return startTime < curTime
    }
  }
};
</script>

<style scoped>
.half-opacity {
  opacity: 0.4;
}
.full-opacity {
  opacity: 1;
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
</style>
