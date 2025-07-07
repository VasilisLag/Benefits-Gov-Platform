<template>
    <div class="govgr-accordion">
      <details class="govgr-accordion__section">
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button govgr-!-font-size-24">{{ title }}</span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content">
          <p class="govgr-body govgr-!-font-size-19">{{ briefDescription }}</p>
          
          <p v-html="moreInformation" class="govgr-body govgr-body govgr-!-font-size-19"></p>

          <p>
            <router-link :to="link">
              <button class="govgr-btn govgr-btn-primary govgr-!-font-size-19">
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

.govgr-accordion .govgr-accordion__section:first-child{
  border-top-width: 0px;
}

.govgr-mb-6 {
  margin-bottom: 0!important;
}

</style>
