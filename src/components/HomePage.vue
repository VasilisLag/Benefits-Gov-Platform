<template>
  <div>
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <h1 class="text-2xl font-bold">Welcome to the Home Page</h1>
      <p class="mt-2">This is where your main content will go.</p>
    </main>
  </div>
</template>

<script>
import HeaderElement from '@/components/HeaderElement.vue';
import NavElement from '@/components/NavElement.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderElement,
    NavElement
  }
};
</script>

<style scoped>
/* You can add specific styles for the home page here if needed */
</style>
