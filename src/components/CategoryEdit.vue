<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ name }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="category in categories"
                    :key="category.id"
                    :value="category.id"

            >{{ category.title }}</option>
          </select>
          <label>Choose category</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
          >
          <label for="name">Name</label>
          <span v-if="v$.title.$dirty && v$.title.required.$invalid"
                class="helper-text"
                :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
          >
            Type category name</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"
          >
          <label for="limit">Limit</label>
          <span class="helper-text"
                :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid, 'hide': !v$.limit.minValue.$invalid}"

          >Minimum value is {{ v$.limit.minValue.$params.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {minValue, required} from "@vuelidate/validators";
import categories from "@/views/Categories";

export default {
  name: "CategoryEdit",
  setup: () => ({
    v$: useVuelidate()
  }),
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    name: 'Edit',
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: {
      required,
      $autoDirty: true
    },
    limit: {
      minValue: minValue(100),
      $autoDirty: true
    }
  },
  watch: {
    current(catId) {
      const cat = this.categories.find(cat => cat.id === catId)
      this.title = cat.title
      this.limit = cat.limit
    }
  },
  created() {
    const cat = this.categories[0]
    if(this.categories.length) {
      this.current = cat.id
      this.title = cat.title
      this.limit = cat.limit
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  unmounted() {
    if(this.select && this.select.destroy()) {
      this.select.destroy()
    }
  },
  methods: {
    async onSubmit() {
      if(this.v$.$invalid) {
        this.v$.validate()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        this.$store.dispatch('updateCategory', categoryData)
        this.$message(`Category ${categoryData.title} successfully updated`)
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  }
}
</script>

<style scoped>

</style>