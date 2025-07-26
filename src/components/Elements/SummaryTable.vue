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
          {{ answers[index] !== undefined && answers[index] !== null && answers[index] !== '' ? answers[index] : '-' }}
        </dd>
        <dd class="govgr-summary-list__actions">
          <button class="govgr-link" @click="$emit('edit', questionKeys ? questionKeys[index] : index)">
            Αλλαγή<span class="govgr-visually-hidden"> της απάντησης για: {{ question }}</span>
          </button>
          <span v-if="false">{{ logRow(index) }}</span>
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
    questionKeys: {
      type: Array,
      required: false
    }
  },
  methods: {
    logAllRows() {
      (this.questions || []).forEach((question, index) => {
        const key = this.questionKeys ? this.questionKeys[index] : index;
        const answer = this.answers[index];
        console.log('SummaryTable row:', { key, index, answer });
      });
    }
  },
  mounted() {
    this.logAllRows();
  },
  updated() {
    this.logAllRows();
  }
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