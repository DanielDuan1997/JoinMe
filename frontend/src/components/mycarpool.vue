<template>
  <mu-container>
    <mylogo></mylogo>
    <mu-list class="margin-top-20">
      <mylist icon=":iconfont icon-start" content="发起拼单" color="#03a9f4" to="/initiateorder"></mylist>
      <div class="divider-large"></div>
      <mylist icon=":iconfont icon-search" content="可加拼单" color="#673ab7"></mylist>
      <div class="divider"></div>
      <mylist icon=":iconfont icon-ongoing" content="进行中" color="#4caf50" to="/ongoing"></mylist>
      <div class="divider"></div>
      <mylist icon=":iconfont icon-need-comment" content="待评价" color="#ff5722"></mylist>
    </mu-list>
  </mu-container>
</template>

<script>
export default {
  name: "mycarpool"
};
</script>

<style scoped>
.margin-top-20 {
  margin-top: 20px;
}
.divider {
  height: 5px;
}
.divider-large {
  height: 30px;
}
</style>
