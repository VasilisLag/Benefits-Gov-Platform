<template>
  <div class="info-box">
    <h2 class="govgr-!-font-weight-bold" id="service-title">{{ title }}</h2>
    <p>{{ briefDescription }}</p>
    
    <button @click="toggleContent">
      {{ isExpanded ? '−' : '+' }}
       Μάθετε περισσότερα για τo {{ title }}.
    </button>

    <!-- Show more info when expanded -->
    <p v-if="isExpanded" class="more-info">
      {{ moreInformation }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    briefDescription: {
        type: String,
        required: true
    },
    moreInformation: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false  // State to track if content is expanded or not
    };
  },
  methods: {
    toggleContent() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style scoped>
.info-box {
  border: 1px solid #ccc;
  border-color:#003375;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #00b0f0;
}

.more-info {
  margin-top: 10px;
}

#service-title{
    font-size: 20px;
}
</style>
