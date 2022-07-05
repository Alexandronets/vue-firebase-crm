<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ name }}</h4>
      </div>

      <form @submit.prevent="onSubmit()">
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
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  name: "CategoryCreate",
  setup: () => ({
    v$: useVuelidate()
  }),
  data: () => ({
    name: 'Create',
    title: '',
    limit: 100
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
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async onSubmit() {
      if(this.v$.$invalid) {
        this.v$.$validate()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.$emit('created', category)
        this.title = ''
        this.v$.title.$dirty = false
      } catch (e) {}
    }
  }
}
</script>

<style scoped>

</style>