<template>
  <mu-dialog :open.sync="open" :title="title" width="360">
        {{text}}
    <mu-button slot="actions" flat :color="closeColor" @click="closeAction">好</mu-button>
  </mu-dialog>
</template>

<script>
export default {
  name: 'mydialog',
  props: {
    open: Boolean,
    title: String,
    text: String,
    closeColor: String,
    closeAction: Function
  },
  data () {
    return {
      myOpen: this.open
    }
  },
  watch: {
    myOpen (val) {
      this.$emit('update:open', val)
    }
  }
};
</script>

<style scoped>
</style>
