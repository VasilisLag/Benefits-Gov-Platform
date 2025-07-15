<template>
    <footer class="govgr-footer footer" role="contentinfo">
        <div class="govgr-width-container">
            <div class="govgr-footer__meta">
                <div class="govgr-footer__meta-item govgr-footer__meta-item--grow">
                    <div class="govgr-footer__content">
                        <p class="govgr-footer__licence-description" style="text-align: left;">
                            Αυτή η διαδικτυακή πλατφόρμα αναπτύχθηκε στο πλαίσιο διπλωματικής εργασίας του Μεταπτυχιακού Προγράμματος Σπουδών Εφαρμοσμένης Πληροφορικής 
                            του Πανεπιστημίου Μακεδονίας απο τον φοιτητή Βασίλειο Λαγόπουλο
                        </p>
                    </div>
                </div>
                <div class="govgr-footer__meta-item">
                    <img class="govgr-footer__government-logo" src="@/assets/government-logo2.svg" alt="government logo"/>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'FooterElement'
};
</script>

<style scoped>
.footer {
  margin-top: 2rem;
  align-self: end;
}
</style>
