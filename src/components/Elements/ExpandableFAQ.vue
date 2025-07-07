<template>
    <div class="govgr-accordion ">
      <details class="govgr-accordion__section">
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button govgr-!-font-size-24">{{ question }}</span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content">
          <p class="govgr-body govgr-!-font-size-19">{{ answer }}</p>
        </div>
      </details>
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
    },
  }
};
</script>

<style scoped>

p.govgr-\!-font-size-19 {
  line-height: 1.5 !important;
}

.govgr-accordion .govgr-accordion__section:first-child {
    border-top-width: 0px;
}

</style>
