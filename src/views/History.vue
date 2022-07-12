<template>
  <div>
    <div class="page-title">
      <h3>Records history</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length"> There are no records yet</p>

    <section v-else>
      <div class="history-chart">
        <ApexChart type="pie" width="380" :options="chartOptions" :series="series"></ApexChart>
      </div>
      <HistoryTable :records="items"/>
      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="onPageChange"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      >
      </Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import Loader from "@/components/Loader";
import Paginate from 'vuejs-paginate-next';
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "History",
  mixins: [paginationMixin],
  components: {
    Loader,
    HistoryTable,
    Paginate
  },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    page: 10,
    series: [],
    chartOptions: null
  }),
  async mounted() {
    this.records = await this.$store.dispatch('getRecords')
    const categories = await this.$store.dispatch('getCategories')
    this.setup(categories)

    this.initChart(categories, this.records)
    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
            return {
              ...record,
              categoryName: categories.find(c => c.id === record.categoryId).title,
              typeClass: record.type === 'income' ? 'green' : 'red',
              typeText: record.type === 'income' ? 'income' : 'outcome'
            }
          }))
    },
    initChart(categories, records) {
      this.series = categories.map(cat => {
        return records.reduce((total, record) => {
          if(record.categoryId === cat.id && record.type === 'outcome') {
            total += +record.amount
          }
          return total
        }, 0)
      })
      this.chartOptions = {
        chart: {
          width: 500,
          type: 'pie',
        },
        labels: categories.map(cat => cat.title),
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.VuePagination {
  nav {
    background: none;
    box-shadow: none;
  }
}
</style>