<template>
  <ul class="sidenav app-sidenav" :class="{open: modelValue}" >
    <router-link
        v-for="link in links"
        :key="link.href"
        :to="link.href"
        v-slot="{ href, isActive}"
        :exact="link.exact"
    >
      <li :class="[isActive && 'active']">
        <a :href="link.href" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ['modelValue'],
  data: () => ({
    links: [
      {title: 'Account', href: '/', exact: 'true'},
      {title: 'History', href: '/history', exact: 'false'},
      {title: 'Planning', href: '/planning', exact: 'false'},
      {title: 'New Record', href: '/record', exact: 'false'},
      {title: 'Categories', href: '/categories', exact: 'false'},
    ]
  }),
  methods: {
    navigate() {
      console.log('navigated!!')
    }
  }
}
</script>

<style scoped>

</style>