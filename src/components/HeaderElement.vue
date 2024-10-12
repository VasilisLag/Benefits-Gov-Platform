<template>
  <header class="govgr-header">
    <div class="govgr-header__container no-top-margin">
      <div class="govgr-header__content">
        <a href="https://www.gov.gr/">
          <img class="govgr-header__logo logo-image" src="https://www.gov.gr/gov_gr_logo.svg" alt="gov.gr logo" />
        </a>
      </div>
      <svg class="govgr-svg-icon govgr-svg-icon--burger" focusable="true" viewBox="0 0 24 24" aria-hidden="true">
        <rect id="govgr-svg-icon--burger__line-1" width="20" height="3.3" />
        <rect id="govgr-svg-icon--burger__line-2" width="20" height="3.3" />
        <rect id="govgr-svg-icon--burger__line-3" width="20" height="3.3" />
      </svg>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderElement'
};
</script>

<style scoped>
.logo-image{
  width:50%
}
</style>
