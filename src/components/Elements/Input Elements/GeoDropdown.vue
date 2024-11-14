<template>
  <div class="geo-dropdown">
    <label class="question-label" v-html="question"></label>

    <!-- Input field that doubles as a search and a trigger for dropdown -->
    <input
      type="text"
      v-model="searchQuery"
      @focus="isDropdownVisible = true"
      @input="filterOptions"
      placeholder="Search for your location..."
      class="search-input"
    />

    <!-- Dropdown list that appears when input is focused or has a search query -->
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
import locationData from '@/questions/postal_codes.json';

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
      filteredOptions: locationData.slice(0, 5), // Display top 5 by default
      selectedOption: this.answer || ""
    };
  },
  watch: {
    answer(newAnswer) {
      this.selectedOption = newAnswer;
      this.searchQuery = newAnswer; // Update the input with the selected answer
    }
  },
  methods: {
    filterOptions() {
      // Filter locations based on the search query and limit results
      this.filteredOptions = this.allOptions
        .filter(option =>
          option.area.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit to first 5 results
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
    // Clean up the event listener on component destruction
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
.geo-dropdown {
  display: flex;
  flex-direction: column; /* Stack input and dropdown vertically */
  align-items: flex-start; /* Align children to start of column */
  width: 100%;
}

.search-input {
  width: 60%; /* Relative to .geo-dropdown width */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem; /* Slightly smaller font size */
}

.dropdown-list {
  width: 60%; /* Matches input width */
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem; /* Slightly smaller font size */
}

.dropdown-item {
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
