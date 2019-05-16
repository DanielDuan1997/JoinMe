<template>
  <div class="hinder">
    <mu-circular-progress class="circular-progress" color="warning" :stroke-width="10" :size="80"></mu-circular-progress>
  </div>
</template>

<script>
export default {
  name: 'waiting',
  props: {
    status: Boolean
  }
};
</script>

<style scoped>
.hinder {
  background: rgba(157, 157, 157, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.circular-progress {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #ffc107;
}
</style>