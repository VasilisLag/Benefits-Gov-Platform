<template>
  <div class="page">
    <HeaderElement />
    <NavElement />
    <div class="govgr-layout-wrapper govgr-mt-12 govgr-mb-12">
      <div class="govgr-width-container">
        <div class="custom-title-row">
          <h2 class="govgr-heading-xl govgr-mb-9 custom-title">{{ title }}</h2>
        </div>
        <div class="custom-content-row">
          <main>
            <div v-if="!showForm" class="govgr-mb-12">
                <button class="govgr-btn govgr-btn-primary govgr-btn-cta govgr-mb-12" @click="showForm = true">
                    Ας ξεκινήσουμε
                  <svg viewBox="0 0 24 24" 
                    class="govgr-svg-icon--arrow--right govgr-svg-icon"
                    focusable="false"
                    aria-hidden="true"> <path d="M8.5,2L6.1,4.3l7.6,7.7l-7.6,7.6L8.5,22l10-10L8.5,2z"/> 
                  </svg>
                </button>
            </div>
            <div v-if="showForm">
              <slot name="form"/>
            </div>
            <hr class="govgr-section-break govgr-section-break--visible govgr-mt-12 govgr-mb-12" />
            <slot name="faq" class="faq" />
          </main>
        </div>
      </div>
    </div>
  </div>
  <FooterElement/>
</template>

<script>
import HeaderElement from '@/components/Elements/Page Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/Page Elements/NavElement.vue';
import FooterElement from '../Page Elements/FooterElement.vue';

export default {
  name: 'BenefitPageLayout',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    HeaderElement,
    NavElement,
    FooterElement
  },
  data() {
    return {
      showForm: false
    };
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.custom-title-row {
  display: flex;
}
.custom-title {
  width: 66.6666%;
  min-width: 0;
  text-align: left;
  overflow-wrap: break-word;
}
.custom-content-row {
  width: 100%;
}
main {
  flex: 1;
  overflow-wrap: break-word;
}
.govgr-main-wrapper{
  display: block;
}
.govgr-summary-list {
  margin-bottom:0;
}
.faq{
    text-align: left;
}

.govgr-btn:hover .govgr-svg-icon--arrow--right {
  transform: translateX(6px);
  transition: transform 0.3s ease;
}

.govgr-svg-icon--arrow--right {
  transition: transform 0.3s ease;
}


</style>