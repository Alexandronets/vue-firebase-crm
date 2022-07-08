<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{ bill }}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">There is no categories yet
      <router-link to="/categories">Add new category</router-link>
    </p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend }} из {{ cat.limit }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import {mapGetters} from "vuex";

export default {
  name: "Planning",
  components: {Loader},
  data: () => ({
    loading: true,
    categories: [],
    bill: ''
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('getRecords')
    const categories = await this.$store.dispatch('getCategories')
    this.bill = this.$currency(this.info.bill)

    this.categories = categories.map(cat => {
      const spend = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)
      const spendMoney = this.$currency(spend)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
          percent < 60 ?
              'green' :
          percent < 100 ?
              'yellow' :
              'red'
      const limit = this.$currency(cat.limit)
      const tooltipValue = cat.limit - spend
      const tooltipText = this.$currency(Math.abs(tooltipValue))
      const tooltip = `${tooltipValue < 0 ? 'Excess by' : 'Left'} ${tooltipText}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spendMoney,
        limit,
        tooltip
      }
    })
    this.loading = false
  }
}
</script>

<style scoped>

</style>