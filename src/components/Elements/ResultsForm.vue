<template>
  <table class="govgr-table govgr-table--dark govgr-mb-6">
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
          <span :class="entry.eligible ? 'govgr-tag govgr-tag--green' : 'govgr-tag govgr-tag--red'">
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
</template>

<script>
export default {
  name: "ResultsTable",
  props: {
    results: {
      type: Array,
      required: true,
      // κάθε entry = { title, eligible, allowanceAmount }
    }
  }
}
</script>
