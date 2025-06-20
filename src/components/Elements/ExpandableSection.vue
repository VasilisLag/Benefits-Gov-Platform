<template>
    <div class="govgr-accordion mb-4">
      <details class="govgr-accordion__section">
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button">{{ title }}</span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content">
          <p class="govgr-body govgr-!-font-size-16">{{ briefDescription }}</p>
          
          <p v-html="moreInformation" class="govgr-body govgr-body govgr-!-font-size-16"></p>

          <p>
            <router-link :to="link">
              <button class="govgr-btn govgr-btn-primary govgr-mt-3 govgr-!-font-size-16">
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

</style>
