<template>
  <div>
    <div class="page-title">
      <h3>Records history</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length"> There are no records yet</p>

    <section v-else>
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
    page: 10
  }),
  async mounted() {
    this.records = await this.$store.dispatch('getRecords')
    const categories = await this.$store.dispatch('getCategories')
    this.setupPagination(this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'income' : 'outcome'
          }
        })
    )

    this.loading = false
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