<template>
  <nav class="govgr-nav govgr-nav--horizontal">
    <ul class="govgr-nav__list">
      <li>
        <a href="/" class="govgr-nav__list-item-link ">
          <router-link to="/">Σχετικά</router-link>
        </a>
      </li>
      <li><a href="#" class="govgr-nav__list-item-link">Αξιολόγηση</a></li>
      <li class="govgr-nav__list-item govgr-nav__list-item--has-submenu">
        <a href="#" class="govgr-nav__list-item-link">ΟΠΕΚΑ</a>
        <ul class="govgr-nav__submenu">
          <li>
            <router-link to="/ChildrenBenefit" class="govgr-nav__submenu-link">
              Επίδομα Παιδιού-Α21
            </router-link>
          </li>
          <li>
            <router-link to="/HousingBenefit" class="govgr-nav__submenu-link">
              Επίδομα Στέγασης
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" class="govgr-nav__list-item-link">
          <router-link to="/HeatingBenefit">Επίδομα Θέρμανσης</router-link>
        </a>
      </li>
      <li>
        <a href="#" class="govgr-nav__list-item-link">
          <router-link to="/VulnerableBenefits">ΚΟΤ-ΚΕΑ</router-link>
        </a>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: 'NavElement'
};
</script>

<style scoped>
/* Basic styles for the navigation */
.govgr-nav__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}

.govgr-nav__list-item {
  position: relative;
  padding:0;
}

.govgr-nav__list-item-link {
  text-decoration: none;
  color: #333333;
  padding: 10px 15px;
  display: block;
  transition: background 0.3s ease;
}

.govgr-nav__list-item-link:hover {
  background: #f0f0f0;
  border-radius: 5px;
}

/* Submenu styles */
.govgr-nav__submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 45;
  min-width: 200px;
}

.govgr-nav__submenu-link {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333333;
  transition: background 0.3s ease;
}

.govgr-nav__submenu-link:hover {
  background: #f0f0f0;
}

/* Show submenu on hover */
.govgr-nav__list-item--has-submenu:hover .govgr-nav__submenu {
  display: block;
}

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
