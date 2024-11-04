<template>
  <header class="govgr-header">
    <div class="govgr-header__container no-top-margin">
      <div class="govgr-header__content">
        <a href="https://www.gov.gr/">
          <img class="govgr-header__logo logo-image" src="../../assets/gov_gr_logo.svg" alt="gov.gr logo" />
        </a>
      </div>
      <a href="/" class="govgr-header__title service-title govgr-!-font-size-24">Υπολογισμός Παροχών</a>
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

@media (min-width: 1440px) {
  .govgr-header__container {
      max-width: 96rem;
  }

  .logo-image{
    width:60%
  }
}
</style>
