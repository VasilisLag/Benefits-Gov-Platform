<template>
  <div class="geo-dropdown">
    <label class="question-label" v-html="question"></label>
    <p class="govgr-heading-l">Εισάγετε την τοποθεσία σας</p>
    <p class="govgr-hint govgr-mb-6">
      Αναζητήστε τον τόπο διαμονής 
      σας με τον Τ.Κ. (προτείνεται)
    </p>
    <input
      type="text"
      v-model="searchQuery"
      @focus="isDropdownVisible = true"
      @input="filterOptions"
      placeholder=""
      class="search-input govgr-input"
    />

    <ul v-if="isDropdownVisible && filteredOptions.length" class="dropdown-list">
      <li
        v-for="option in filteredOptions"
        :key="option.area"
        @click="selectOption(option)"
        class="dropdown-item"
      >
        {{ option.area }} 
        <!-- Εμφάνιση του ΤΚ μόνο αν το searchQuery έχει 5 χαρακτήρες και είναι αριθμός -->
        <span v-if="isPostalCodeValid">
          (ΤΚ: {{ this.searchQuery}})
        </span>
      </li>
    </ul>

    <!-- <label v-html="note"></label> -->
  </div>
</template>

<script>
import locationData from '@/utils/geo_data.json';
import greekCapitals from '@/utils/greek_capitals.js';

export default {
  name: "GeoDropdown",
  props: {
    question: String,
    answer: {
      type: String,
      default: null
    },
    note: String
  },
  data() {
    return {
      searchQuery: "",
      isDropdownVisible: false,
      allOptions: locationData,
      filteredOptions: locationData.slice(0, 5),
      selectedOption: this.answer || "",
      priorityAreas: greekCapitals
    };
  },
  computed: {
    isPostalCodeValid() {
      const query = this.searchQuery.trim();
      return query.length === 5 && !isNaN(query); // Αν το query είναι αριθμός και έχει 5 χαρακτήρες
    }
  },
  watch: {
    answer(newAnswer) {
      this.selectedOption = newAnswer;
      this.searchQuery = newAnswer;
    }
  },
  methods: {
    filterOptions() {
      const query = this.searchQuery.toLowerCase();
      const isNumeric = !isNaN(query); // Check if query is a number (potential postal code)

      if (isNumeric) {
        this.filteredOptions = this.allOptions.filter(option =>
          option.postal_codes.some(code => code.startsWith(query)) // Check if any postal code matches
        ).slice(0, 5);
      } else {
        const priorityMatches = this.allOptions.filter(option =>
          this.priorityAreas.includes(option.area) &&
          option.area.toLowerCase().startsWith(query)
        );

        const otherMatches = this.allOptions.filter(option =>
          option.area.toLowerCase().startsWith(query) &&
          !this.priorityAreas.includes(option.area)
        );

        this.filteredOptions = [...priorityMatches, ...otherMatches].slice(0, 5);
      }
    },
    selectOption(option) {
      // Set the selected option, update the search query, and hide the dropdown
      this.selectedOption = option.area;
      this.searchQuery = option.area;
      this.isDropdownVisible = false;
      this.$emit("onAnswerChange", option.area);
    },
    handleClickOutside(event) {
      // Hide the dropdown if clicking outside the component
      if (!this.$el.contains(event.target)) {
        this.isDropdownVisible = false;
      }
    }
  },
  mounted() {
    this.$emit("onAnswerChange", this.selectedOption);
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
.geo-dropdown {
  position: relative; /* για απόλυτη θέση στο dropdown */
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  margin-bottom: 6rem;
}

.search-input {
  width: 60%;
  border-width: 2px;
  /* --tw-border-opacity: 1;
  border-color: rgba(var(--color-base-content-rgb), var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgba(var(--color-base-100-rgb), var(--tw-bg-opacity));
  padding: .5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 4px;
  margin-top: 20px; */
}

.dropdown-list {
  position: absolute;
  top: calc(100% + 0.5rem); /* λίγο κάτω από το input */
  left: 0;
  width: 60%;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  z-index: 1000; /* υψηλή προτεραιότητα */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 0.5rem;
  cursor: pointer;
}

.search-input {
  position: relative;
  z-index: 2;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
