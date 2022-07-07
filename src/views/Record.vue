<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">There is no categories yet
    <router-link to="/categories">Add new category</router-link>
    </p>
    <form class="form" v-else @submit.prevent="onSubmit">
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
          <span>Income</span>
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
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: v$.amount.$dirty && v$.amount.minValue.$invalid}"
        >
        <label for="amount">Amount</label>
        <span class="helper-text"
              :class="{invalid: v$.amount.$dirty && v$.amount.minValue.$invalid, hide: !v$.amount.minValue.$invalid}"

        >Minimum value is {{ v$.amount.minValue.$params.min}}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: v$.description.$dirty && v$.description.required.$invalid}"
        >
        <label for="description">Description</label>
        <span v-if="v$.description.$dirty && v$.description.required.$invalid"
              class="helper-text"
              :class="{invalid: v$.description.$dirty && v$.description.required.$invalid}"
        >
            Type description</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import useVuelidate from "@vuelidate/core";
import {minValue, required} from "@vuelidate/validators";
import {mapGetters} from 'vuex'

export default {
  name: "Record",
  components: {Loader},
  setup: () => ({
    v$: useVuelidate()
  }),
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {
      required,
      minValue: minValue(1),
      $autoDirty: true
    },
    description: {
      required,
      $autoDirty: true
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('getCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    this.select = setTimeout(() => {
      M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  unmounted() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onSubmit() {
      if(this.v$.$invalid) {
        this.v$.validate()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' ?
              this.info.bill + this.amount :
              this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.$message(`Record successfully created`)
          this.v$.$reset()
          this.amount = 1
          this.description = ''
          this.v$.description.$dirty = false
        } catch (e) {}
      } else {
        this.$message(`Not enough ${this.amount - this.info.bill} money on account`)
      }
    }
  }
}
</script>

<style scoped>

</style>