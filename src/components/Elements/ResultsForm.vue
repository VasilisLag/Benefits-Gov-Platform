<template>
  <div>
    <h2> Αποτελέσματα </h2>
    <p v-if="eligible">{{ message }}</p>
    <p v-else>{{ message }}</p>
    <ul v-if="reasons && reasons.length > 0">
      <li v-for="(reason, index) in reasons" :key="index">{{ reason }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    eligible: {
      type: Boolean,
      required: true
    },
    benefitAmount: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    reasons: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
/* Add your styling here */
</style>
