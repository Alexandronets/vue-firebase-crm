<template>
  <div>
    <div class="page-title">
      <h3>{{ title }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"
        />
        <AllCategories
            :categories="categories"
            @removed="removeCategory"
            :key="removeCount"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
import AllCategories from "@/components/AllCategories";
import Loader from "@/components/Loader";
export default {
  name: 'Categories',
  data: () => ({
    title: 'Categories',
    categories: [],
    loading: true,
    updateCount: 0,
    removeCount: -1
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('getCategories')
    this.loading = false
  },
  components: {Loader, CategoryEdit, CategoryCreate, AllCategories},
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const index = this.categories.findIndex(cat => cat.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.removeCount++
    },
    async removeCategory(categoryId) {
      this.categories.splice(categoryId, 1)
      this.removeCount--
    }
  }
}
</script>

<style scoped lang="scss">

</style>