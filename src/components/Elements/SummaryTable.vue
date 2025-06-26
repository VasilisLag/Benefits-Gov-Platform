<template>
  <div class="summary-table">
    <p class="govgr-heading-l" style="text-align:left;">
      Σύνοψη Απαντήσεων
    </p>
    <dl class="govgr-summary-list">
      <div
        class="govgr-summary-list__row"
        v-for="(question, index) in questions"
        :key="index"
      >
        <dt class="govgr-summary-list__key">{{ question }}</dt>
        <dd class="govgr-summary-list__value">
          {{ answers[index] || '-' }}
        </dd>
        <dd class="govgr-summary-list__actions">
          <button class="govgr-link" @click="$emit('edit', index)">
            Αλλαγή<span class="govgr-visually-hidden"> της απάντησης για: {{ question }}</span>
          </button>
        </dd>
      </div>
    </dl>
  </div>

</template>

<script>
export default {
  name: 'SummaryTable',
  props: {
    questions: {
      type: Array,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
      default: () => []
    },
  },
};
</script>

<style scoped>
.summary-table {
  width:90%
}

.govgr-summary-list__key {
  width: 70%;
  text-align: left;
}

</style>