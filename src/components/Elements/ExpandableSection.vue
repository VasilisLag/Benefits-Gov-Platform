<template>
  <div class="info-box">
    <h2 class="govgr-!-font-weight-bold" id="service-title">{{ title }}</h2>
    <p>{{ briefDescription }}</p>
    
    <button class="button-expand" @click="toggleContent">
      {{ isExpanded ? '−' : '+' }}
       Μάθετε περισσότερα για τo {{ title }}.
    </button>

    <!-- Show more info when expanded -->
    <p v-if="isExpanded" class="more-info"  v-html="moreInformation"></p>
    <p v-if="isExpanded" class="more-info">
      <router-link :to="linkToBenefit">
        <button id="button-assesment" class="govgr-btn govgr-btn-primary govgr-mt-3">
          Αξιολόγηση - {{ title }}
        </button>
      </router-link> 
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
    },
    link: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false 
    };
  },
  computed: {
    linkToBenefit() {
      const basePath = process.env.NODE_ENV === 'production' ? '/Benefits-Gov-Platform' : '';
      return `${basePath}${this.link}`;
    }
  },
  methods: {
    toggleContent() {
      this.isExpanded = !this.isExpanded;
    },
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

.button-expand {
  margin-top: 10px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #00b0f0;
}

.more-info {
  margin: 10px;
}

#service-title{
    font-size: 20px;
}

#button-assesment{
  font-size: 14px;
  width:auto;
}

</style>
