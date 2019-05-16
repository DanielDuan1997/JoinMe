<template>
  <mu-list-item button class="list-item" @click="$router.push(to)">
    <mu-list-item-action style="min-width: 48px">
      <div>
        <mu-icon :value="icon" :color="color" size="25"></mu-icon>
      </div>
    </mu-list-item-action>
    <mu-list-item-title>{{content}}</mu-list-item-title>
    <mu-list-item-action>
      <mu-icon value=":iconfont icon-right-arrow"></mu-icon>
    </mu-list-item-action>
  </mu-list-item>
</template>

<script>
export default {
  name: 'mylist',
  props: {
    icon: String,
    color: String,
    content: String,
    to: String
  }
};
</script>

<style scoped>
.list-item {
  background-color: rgba(255, 255, 255, 1);
}
</style>
