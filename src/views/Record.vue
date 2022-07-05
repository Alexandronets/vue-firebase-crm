<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">There is no categories yet
    <router-link to="/categories">Add new category</router-link>
    </p>
    <form class="form" v-else>
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
          >{{ category.title }}</option>
        </select>
        <label>Choose category</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  name: "Record",
  components: {Loader},
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'income'
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('getCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    this.select = setTimeout(() => {
      M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  unmounted() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>

<style scoped>

</style>