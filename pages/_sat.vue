<template>
  <main>
    <component
      v-if="variantCode"
      :is="satComponent"
      :variant-sat="variantCode"
      :pack-code="pack.code"
    ></component>
  </main>
</template>

<script>
  const mattressSat = () => import('~/components/templates/mattressSat')
  import { ROUTES } from '~/config/routes.js'

  export default {
    components: {
      mattressSat
    },

    async fetch() {
      try {
        this.pack = await this.$axios.$get(`fr_FR/packs/sat_${this.$nuxt.context.params.sat}`)

        if (this.pack.variants.length) {
          this.product = this.pack.variants[0].product
          this.variantCode = this.splitCombinedProducts(this.pack.variants[0].code)
        }
      } catch (e) {
        console.log(e)
        this.$nuxt.error({ statusCode: 404, message: 'Product not found' })
      }
    },

    data() {
      return {
        pack: {},
        product: {},
        variantCode: ''
      }
    },

    computed: {
      satComponent: function () {
        return `${this.product}-sat`
      }
    },

    methods: {
      splitCombinedProducts: function (variantCode) {
        return variantCode.indexOf('_') !== -1 ? variantCode.split('_')[0] : variantCode
      }
    },

    validate({ params }) {
      return ROUTES.indexOf(params.sat) !== -1 && params.sat !== '404'
    }
  }
</script>
