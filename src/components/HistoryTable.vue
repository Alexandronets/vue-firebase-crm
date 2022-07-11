<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Category</th>
      <th>Type</th>
      <th>Open</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.id">
      <td>{{ index + 1 }}</td>
      <td>{{ record.amount }}</td>
      <td>{{ record.date }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span class="white-text badge"
        :class="record.typeClass"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
            v-tooltip="'Open record'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>