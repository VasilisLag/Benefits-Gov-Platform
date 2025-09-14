<template>
  <div>
    <div v-if="items.length > 1" class="govgr-table__caption govgr-table__caption--m">Πληροφορίες</div>
    <div v-if="items.length === 1">
      <div class="govgr-body">
        <p  class = "govgr-heading-m results-content" style="margin-bottom:0.5rem;">
          {{ items[0].eligible ? 'Πληροίτε όλες τις προϋποθέσεις' : 'Δεν πληροίτε τα παρακάτω κριτήρια' }}
        </p>
        <ul v-if="Array.isArray(items[0].content)" class="govgr-list govgr-list--bullet results-content">
          <li v-for="(reason, i) in items[0].content" :key="i">{{ reason }}</li>
        </ul>
        
        <p v-else v-html="items[0].content" class="results-content"></p>
        <div v-if="items[0].eligible && items[0].link" v-html="items[0].link" class="results-content govgr-mt-2">       
        </div>
      </div>
    </div>
    <div v-else class="govgr-accordion govgr-mb-6">
      <details
        v-for="(item, index) in items"
        :key="index"
        class="govgr-accordion__section"
      >
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button">{{ item.title }}</span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content govgr-body govgr-!-font-size-19">
          <ul v-if="Array.isArray(item.content)" class="govgr-list govgr-list--bullet results-content" >
            <li v-for="(reason, i) in item.content" :key="i">{{ reason }}</li>
          </ul>
          <p v-else v-html="item.content" class="results-content"></p>
          <div v-if="item.eligible && item.link" v-html="item.link" class="results-content govgr-mt-2"></div>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsAccordion',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.results-content {
  text-align: left;
  margin-left: 1.5rem;
}

</style>
