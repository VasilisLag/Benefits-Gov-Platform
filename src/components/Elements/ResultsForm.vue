<template>
  <div class="result-container">
    <div class="result-title">
      <h2>{{ title }}</h2>
    </div>

    <div v-if="eligible" class="eligible-message">
      <span class="status eligible">Επιλέξιμος/η</span>
    </div>
    <div v-else class="eligible-message">
      <span class="status not-eligible">Μη Επιλέξιμος/η</span>
    </div>
    <div class="header">
      <p v-html="message"></p>
    </div>
    <!-- Expandable reasons section -->
    <div v-if="reasons && reasons.length > 0" class="reasons-container">
      <button @click="toggleReasons" class="expand-toggle">
        {{ expanded ? 'Σύμπτυξη' : 'Εμφάνιση Λόγων' }}
      </button>

      <ul v-show="expanded" class="reasons-list">
        <li v-for="(reason, index) in reasons" :key="index">{{ reason }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required:true
    },
    eligible: {
      type: Boolean,
      required: true
    },
    allowanceAmount: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    reasons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggleReasons() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style scoped>
.result-container {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}

.result-title {
  margin-bottom: 15px;
  text-align: center;
}

.result-title h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.header {
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #555;
}

.eligible-message {
  margin-top: 10px;
}

.status {
  font-weight: bold;
}

.eligible {
  color: #28a745;
}

.not-eligible {
  color: #dc3545;
}

.reasons-container {
  margin-top: 15px;
}

.expand-toggle {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.expand-toggle:hover {
  background-color: #0056b3;
}

.reasons-list {
  margin-top: 10px;
  padding-left: 20px;
  list-style-type: disc;
  color: #555;
}

.reasons-list li {
  margin-bottom: 5px;
}
</style>
