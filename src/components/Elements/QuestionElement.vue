<template>
  <div class="">
    <p class="govgr-!-font-weight-bold">{{ question }}</p>
    <p class="govgr-mb-6">{{ answer }}</p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
