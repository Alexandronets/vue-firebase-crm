<template>
  <div class="layout-wrapper">
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @navToggle="isOpen = !isOpen" />

      <Sidebar v-model="isOpen"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Create new record'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import messages from "@/utils/messages";
export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length){
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {Sidebar, Navbar, Footer},
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || 'something went wrong!')
    }
  }
}
</script>

<style scoped>

</style>