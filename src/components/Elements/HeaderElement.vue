<template>
  <header class="govgr-header">
    <div class="govgr-header__container no-top-margin">
      <div class="govgr-header__content">
        <a href="https://www.gov.gr/">
          <img class="govgr-header__logo logo-image" src="https://www.gov.gr/gov_gr_logo.svg" alt="gov.gr logo" />
        </a>
      </div>
      <a href="/" class="govgr-header__title service-title">Υπολογισμός Παροχών</a>
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
.service-title{
  color:white
}
</style>
