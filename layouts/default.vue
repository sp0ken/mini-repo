<template>
  <div id="off-canvas">
    <div class="off-canvas-content">
      <ted-header-simple></ted-header-simple>

      <div class="container">
        <nuxt />
      </div>

      <lazy-the-footer-simple></lazy-the-footer-simple>
    </div>
  </div>
</template>

<script>
  export default {
    async mounted() {
      try {
        const locale = `${
          this.$store.state.i18n.locale
        }_${this.$store.state.i18n.locale.toUpperCase()}`
        const res = await this.$axios.$get(`${locale}/products`)
        this.$store.commit('reviews/setProducts', res)
      } catch (e) {
        console.log(e)
      } finally {
        if (this.$i18n) {
          this.$store.commit('i18n/setLocale', this.$i18n.locale)
        }
      }
    }
  }
</script>
