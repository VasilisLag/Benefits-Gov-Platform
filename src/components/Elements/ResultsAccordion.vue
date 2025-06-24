<template>
  <div class="govgr-accordion govgr-mb-6" v-if="items.length">
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
        <ul v-if="Array.isArray(item.content)" class="govgr-list govgr-list--bullet">
          <li v-for="(reason, i) in item.content" :key="i">{{ reason }}</li>
        </ul>
        <p v-else v-html="item.content"></p>
      </div>
    </details>
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
