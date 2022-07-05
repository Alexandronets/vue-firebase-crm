<template>
  <div class="col s12 category-wrapper">
    <table  v-if="categories.length">
      <thead>
      <tr>
        <th v-for="title in header">{{ title }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories"
          :key="category.id"
          :value="category.id"
      >
        <td>{{category.title}}</td>
        <td>{{category.limit}}</td>
        <td>
          <a
              class="btn-floating btn waves-effect waves-light orange"
              @click="removed(category.id)"
              title="remove"
          >
            <i class="material-icons">delete</i>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
    <h5 class="center-align" >
      There is no categories yet
    </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllCategories",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    header: ['Name', 'Money', 'Actions']
  }),
  methods: {
    removed(catId) {
      try {
        this.$store.dispatch('removeCategory', catId)
        const categoryIndex = this.categories.findIndex(cat => cat.id === catId)
        this.$message(`Category ${this.categories[categoryIndex].title} successfully removed`)
        this.$emit('removed', categoryIndex)
      } catch (e) {}
    }
  }
}
</script>

<style scoped lang="scss">
.category-wrapper {
  margin-top: 30px;
}
</style>