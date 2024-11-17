<template>
  <header class="govgr-header">
    <div class="govgr-header__container no-top-margin">
      <div class="govgr-header__content">
        <a href="https://www.gov.gr/">
          <img class="govgr-header__logo logo-image" src="../../../assets/gov_gr_logo.svg" alt="gov.gr logo" />
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
/* Base styles */
.govgr-header {
  padding: 10px 15px;
}

.govgr-header__container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.govgr-header__content {
  flex: 1;
}

.govgr-header__logo {
  display: block;
}

.logo-image {
  width: 100%;
  max-width: 150px;
}

.govgr-header__title {
  flex: 1;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
}

.no-top-margin {
  margin-top: 0;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .govgr-header__container {
    flex-direction: column;
    text-align: center;
  }

  .govgr-header__content {
    margin-bottom: 10px;
  }

  .govgr-header__title {
    font-size: 1.2rem;
  }

  .logo-image {
    max-width: 120px;
  }
}

@media (min-width: 1024px) {
  .govgr-header__container {
    flex-wrap: nowrap;
    padding-left:5%;
  }

  .govgr-header__title {
    font-size: 1.75rem;
  }

  .logo-image {
    max-width: 180px;
  }
}

@media (min-width: 1440px) {
  .govgr-header__container {
    max-width: 96rem;
    padding-left:10%;
  }

  .govgr-header__title {
    font-size: 2rem;
  }

  .logo-image {
    max-width: 200px;
  }
}

</style>
