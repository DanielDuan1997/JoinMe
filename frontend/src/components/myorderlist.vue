<template>
  <div>
    {{from}}
    {{to}}
    {{initiator}}
    {{startTime}}
    {{location}}
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
  }
};
</script>

<style scoped>
</style>