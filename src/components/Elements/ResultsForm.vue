<template>
  <div>
    <div v-if="results.length === 1" class="single-benefit-result">
      <h2 class="govgr-heading-l" id="result">
        {{ results[0].eligible ? `Είστε Δικαιούχος για το ${results[0].title}` : `Δεν είστε Δικαιούχος για το ${results[0].title}` }}
      </h2>
    </div>
    <table v-else class="govgr-table govgr-table--dark govgr-mb-6">
      <caption class="govgr-table__caption govgr-table__caption--m">Αποτελέσματα Αξιολόγησης</caption>
      <thead class="govgr-table__head">
        <tr class="govgr-table__row">
          <th class="govgr-table__header" scope="col">Επίδομα</th>
          <th class="govgr-table__header" scope="col">Επιλεξιμότητα</th>
          <th class="govgr-table__header" scope="col">Ποσό Επιδότησης</th>
        </tr>
      </thead>
      <tbody class="govgr-table__body">
        <tr v-for="(entry, index) in results" :key="index" class="govgr-table__row">
          <td class="govgr-table__cell">{{ entry.title }}</td>
          <td class="govgr-table__cell">
            <span>
              {{ entry.eligible ? 'Επιλέξιμος/η' : 'Μη Επιλέξιμος/η' }}
            </span>
          </td>
          <td class="govgr-table__cell">
            <span v-if="entry.eligible">€{{ entry.allowanceAmount.toLocaleString('el-GR') }}</span>
            <span v-else>–</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ResultsTable",
  props: {
    results: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>

#result {
  text-align:left;
  margin-bottom:0;
}

.single-benefit-result {
  border-radius: 8px;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  margin-bottom: 0;
}
</style>
