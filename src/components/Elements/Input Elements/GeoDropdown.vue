<template>
  <div class="geo-dropdown">
    <label class="question-label" v-html="question"></label>

    <input
      type="text"
      v-model="searchQuery"
      @focus="isDropdownVisible = true"
      @input="filterOptions"
      placeholder="Search for your location..."
      class="search-input"
    />

    <ul v-if="isDropdownVisible && filteredOptions.length" class="dropdown-list">
      <li
        v-for="option in filteredOptions"
        :key="option.area"
        @click="selectOption(option)"
        class="dropdown-item"
      >
        {{ option.area }}
      </li>
    </ul>

    <label v-html="note"></label>
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
  watch: {
    answer(newAnswer) {
      this.selectedOption = newAnswer;
      this.searchQuery = newAnswer;
    }
  },
  methods: {
    filterOptions() {
      const query = this.searchQuery.toLowerCase();

      const priorityMatches = this.allOptions.filter(option =>
        this.priorityAreas.includes(option.area) &&
        option.area.toLowerCase().startsWith(query)
      );

      const otherMatches = this.allOptions.filter(option =>
        option.area.toLowerCase().startsWith(query) &&
        !this.priorityAreas.includes(option.area)
      );

      this.filteredOptions = [...priorityMatches, ...otherMatches].slice(0, 5);

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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-input {
  width: 60%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

.dropdown-list {
  width: 60%;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
}

.dropdown-item {
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
