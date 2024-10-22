<template>
  <div>
    <HeaderElement />
    <NavElement />
    <main class="p-4">
    </main>
    <FooterElement/>
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/NavElement.vue';
import FooterElement from '@/components/Elements/FooterElement.vue';

export default {
  name: 'ChildrenBenefit',
  components: {
    HeaderElement,
    NavElement,
    FooterElement,
  }
};
</script>

<style scoped>
section {
  margin: 4vw;
  text-align: left;
}
</style>
