<template>
    <HeaderElement />
    <NavElement />
    <div class="govgr-layout-wrapper">
        <div class="govgr-width-container">
                <main class="govgr-grid-column-two-thirds">
                    <slot />
                </main>    
        </div>
    </div>
    <FooterElement />
</template>

<script>

import HeaderElement from '@/components/Elements/Page Elements/HeaderElement.vue';
import NavElement from '@/components/Elements/Page Elements/NavElement.vue';
import FooterElement from '@/components/Elements/Page Elements/FooterElement.vue';

export default {
  name: 'MainLayout',
  components: {
    HeaderElement,
    NavElement,
    FooterElement
  },
}
</script>
