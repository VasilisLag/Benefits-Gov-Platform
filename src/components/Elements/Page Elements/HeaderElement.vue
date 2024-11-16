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
  background-color: #005b96;
  padding: 10px 15px;
}

.govgr-header__container {
  display: flex;
  flex-wrap: wrap; /* Ensure responsiveness */
  align-items: center;
  justify-content: space-between; /* Space between the logo and title */
  margin: 0 auto;
  width: 100%;
  max-width: 1200px; /* Default max-width */
}

.govgr-header__content {
  flex: 1;
}

.govgr-header__logo {
  display: block;
}

.logo-image {
  width: 100%; /* Default logo size */
  max-width: 150px; /* Prevent it from being too large */
}

.govgr-header__title {
  flex: 1;
  text-align: center;
  color: white;
  font-size: 1.5rem; /* Default font size */
  text-decoration: none;
}

.no-top-margin {
  margin-top: 0;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .govgr-header__container {
    flex-direction: column; /* Stack items vertically on small screens */
    text-align: center;
  }

  .govgr-header__content {
    margin-bottom: 10px; /* Add spacing between logo and title */
  }

  .govgr-header__title {
    font-size: 1.2rem; /* Slightly smaller title */
  }

  .logo-image {
    max-width: 120px; /* Smaller logo for small screens */
  }
}

@media (min-width: 1024px) {
  .govgr-header__container {
    flex-wrap: nowrap; /* Align items horizontally */
  }

  .govgr-header__title {
    font-size: 1.75rem; /* Slightly larger title for larger screens */
  }

  .logo-image {
    max-width: 180px; /* Slightly larger logo */
  }
}

@media (min-width: 1440px) {
  .govgr-header__container {
    max-width: 96rem; /* Wider container for larger screens */
  }

  .govgr-header__title {
    font-size: 2rem; /* Larger title */
  }

  .logo-image {
    max-width: 200px; /* Even larger logo */
  }
}

</style>
