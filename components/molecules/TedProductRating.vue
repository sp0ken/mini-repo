<template>
  <nuxt-link
    tag="div"
    :to="localePath(`reviews-${reviewLink}`)"
    class="product-rating d-flex flex-center c-hand"
  >
    <ted-rating :rating="rating"></ted-rating>
    <slot name="text">
      <span
        class="ml-5"
        v-html="$t('link.reviews', { reviewCount: $n(reviewCount, { locale: 'fr-FR' }) })"
      ></span>
    </slot>
  </nuxt-link>
</template>

<script>
  export default {
    i18n: {
      messages: {
        fr: {
          link: {
            reviews: 'Découvrez les <strong class="text-secondary">{reviewCount}</strong> avis 〉'
          }
        }
      }
    },

    props: {
      productSlug: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      reviewCount: {
        type: Number,
        required: true
      }
    },

    computed: {
      reviewLink: function () {
        return this.productSlug.startsWith('bed-linen') ? 'bed-linen' : this.productSlug
      },

      formattedReviewCount: function () {
        return new Intl.NumberFormat('fr-FR').format(this.reviewCount)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-rating {
    flex-wrap: wrap-reverse;
  }

  span:hover {
    text-decoration: underline;
  }
</style>
