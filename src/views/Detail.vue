<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a class="breadcrumb" @click.prevent>
          {{ record.type === 'income' ? 'Income' : 'Outcome' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
               :class="record.class"
          >
            <div class="card-content white-text">
              <p>Description: {{ record.description}}</p>
              <p>Amount: {{ record.amount }}</p>
              <p>Category: {{ record.categoryName}}</p>

              <small>{{ record.date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Such record with id <strong>{{$route.params.id}}</strong> not found</p>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  name: "Detail",
  components: {Loader},
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('getRecordById', id)
    const category = await this.$store.dispatch('getCategoryById', record.categoryId)
    this.record = {
      ...record,
      categoryName: category.title,
      class: record.type === 'outcome' ? 'red': 'green',
      amount: this.$currency(record.amount)
    }
    this.loading = false
  }
}
</script>

<style scoped>

</style>