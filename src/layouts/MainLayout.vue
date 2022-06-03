<template>
  <div class="app-main-layout">
    <Navbar @navToggle="isOpen = !isOpen" />

   <Sidebar v-model="isOpen"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true
  }),
  components: {Sidebar, Navbar, Footer}

}
</script>

<style scoped>

</style>