<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "emptyLayout",
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError);
    }
  }
}
</script>

<style scoped>

</style>