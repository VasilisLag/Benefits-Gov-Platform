<template>
  <div class="summary-table-container">
    <table class="summary-table">
      <thead>
        <tr>
          <th>Ερώτηση</th>
          <th>Απάντηση</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questions" :key="index">
          <td class="question-cell">{{ question }}</td>
          <td class="answer-cell">{{ answers[index] || "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SummaryTable",
  props: {
    questions: {
      type: Array,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.summary-table-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.summary-table {
  width: 100%;
  border-collapse: collapse;
}

.summary-table th,
.summary-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.summary-table th {
  background-color: #f4f4f4;
  font-weight: bold;
  color: #333;
}

.question-cell {
  font-weight: 500;
  color: #555;
}

.answer-cell {
  color: #222;
}

.summary-table tr:nth-child(even) {
  background-color: #fafafa;
}
</style>
