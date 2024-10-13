<template>
  <div>
    <HeaderElement />
    <NavElement />
    <main class="p-4">
      <section>
        <h2 class="govgr-body-l govgr-mb-6 govgr-!-font-weight-bold">Καλωσορίσατε στην Πλατφόρμα Υπολογισμού Δικαιώματος Επιδόματος</h2>
        <p class="govgr-!-font-size-16">
          Αυτή η πλατφόρμα σας βοηθά να δείτε γρήγορα και εύκολα αν δικαιούστε επιδόματα όπως:
        </p>
        <ol class="govgr-list govgr-list--bullet govgr-!-font-size-16">
          <li>Επίδομα Ενοικίου</li>
          <li>Επίδομα Αναπηρίας (ΚΕΠΑ)</li>
          <li>Επίδομα Θέρμανσης</li>
          <li>Επίδομα Παιδιού (Α21)</li>
        </ol>
        <p>
          Η διαδικασία είναι απλή! Απαντήστε σε μερικές ερωτήσεις και θα δείτε αμέσως αν δικαιούστε κάποιο επίδομα.
        </p>
      </section>

      <section>
        <h2>Section 2 Heading</h2>
        <p>This is the content of the second section.</p>
      </section>

      <section>
        <h2>Section 3 Heading</h2>
        <p>This is the content of the third section.</p>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderElement from '@/components/Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/NavElement.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderElement,
    NavElement
  }
};
</script>

<style scoped>
section {
  margin: 4vw;
  text-align: left;
}
</style>
