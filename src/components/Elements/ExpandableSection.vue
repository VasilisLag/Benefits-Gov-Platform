<template>
    <div class="govgr-accordion govgr-mb-3">
      <details class="govgr-accordion__section">
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button govgr-!-font-size-30">{{ title }}</span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content">
          <p class="govgr-body govgr-!-font-size-19 govgr-mb-3">{{ briefDescription }}</p>
          
          <p v-html="moreInformation" class="govgr-body govgr-body govgr-!-font-size-19"></p>

          <p>
            <router-link :to="link">
              <button class="govgr-btn govgr-btn-primary govgr-mt-3 govgr-!-font-size-19">
                Αξιολόγηση - {{ title }}
              </button>
            </router-link>
          </p>
        </div>
      </details>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    briefDescription: {
      type: String,
      required: true
    },
    moreInformation: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>

p.govgr-\!-font-size-19 {
  line-height: 1.5 !important;
}

</style>
