<template>
  <nav class="govgr-nav govgr-nav--horizontal">
    <ul class="govgr-nav__list">
      <li><a href="" class="govgr-nav__list-item-link govgr-nav__list-item-link--active">Σχετικά</a></li>
      <li><a href="#" class="govgr-nav__list-item-link">Αξιολόγηση</a></li>
      <li><a href="#" class="govgr-nav__list-item-link"><router-link to="/ChildrenBenefit">Επίδομα Παιδιού-Α21</router-link></a></li>
      <li><a href="#" class="govgr-nav__list-item-link">Επίδομα Στέγασης</a></li>
      <li><a href="#" class="govgr-nav__list-item-link">Επίδομα Θέρμανσης</a></li>
      <li><a href="#" class="govgr-nav__list-item-link">ΚΕΠΑ</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavElement'
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .govgr-nav--horizontal .govgr-nav__list {
    width: 80%;
    margin-left: 10%;
  }
}

@media (min-width: 1440px) {
  ul.govgr-nav__list{
    font-size:20px;
  }
}

</style>
