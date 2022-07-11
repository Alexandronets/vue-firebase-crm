<template>
  <div class="col s12 category-wrapper">
    <table  v-if="categories.length">
      <thead>
      <tr>
        <th v-for="head in header" :style="{textAlign: head.align}" :key="head.title">{{ head.title }}</th>
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
              class="btn-small btn"
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
    header: [
      {title: 'Name', align: 'start'},
      {title:'Money', align: 'start'},
      {title:'Actions', align: 'center'}
    ]
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
tbody {
  tr {
    td {
      &:last-child {
        text-align: center;
      }
    }
  }
}
</style>