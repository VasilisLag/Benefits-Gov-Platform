<template>
  <nav :class="[{'govgr-nav': isWideScreen}, 'govgr-nav--horizontal']">
    <ul class="govgr-nav__list">
      <li>
        <a href="/" class="govgr-nav__list-item-link ">
          <router-link to="/">Σχετικά</router-link>
        </a>
      </li>
      <li>
        <a href="#" class="govgr-nav__list-item-link">
          <router-link to="/OverallBenefits">Αξιολόγηση</router-link>
        </a>
      </li>
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
          <router-link to="/VulnerableBenefits">ΚΟΤ- ΕΕΕ</router-link>
        </a>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "NavElement",
  data() {
    return {
      isWideScreen: true,
    };
  },
  methods: {
    handleResize() {
      this.isWideScreen = window.innerWidth > 650;
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>

.govgr-nav__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  width: 90%;
  margin: 0 auto;
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
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none; /* Hidden by default */
  min-width: 200px;
}

.govgr-nav__submenu-link {
  display: block;
  text-align: start;
  padding: 10px 15px;
  text-decoration: none;
  color: #333333;
  transition: background 0.3s ease;
}

.govgr-nav__submenu-link:hover {
  background: #f0f0f0;
}

.govgr-nav__list-item--has-submenu:hover .govgr-nav__submenu {
  display: block;
}

/* Medium screens: Tablet (min-width: 768px) */
@media (min-width: 768px) {
  .govgr-nav__list {
    flex-direction: column;
    font-size: 16px;
    width: 85%;
    margin-left: 7.5%;
  }

  .govgr-nav__submenu {
    min-width: 220px;
  }
}

/* Large screens: Desktop (min-width: 1024px) */
@media (min-width: 1024px) {
  .govgr-nav__list {
    flex-direction: row; /* Align items horizontally */
    gap: 20px;
    width: 80%;
    margin: 0 auto;
  }
}

/* Extra large screens (min-width: 1440px) */
@media (min-width: 1440px) {
  ul.govgr-nav__list {
    font-size: 20px;
  }

  .govgr-nav__submenu {
    min-width: 250px;
  }
}
</style>
