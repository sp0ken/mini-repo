export default {
  computed: {
    /**
     * Returns the rounded number of reviews across all products
     *
     * @return Number
     */
    globalReviewCount: function() {
      const count = this.$store.getters['reviews/roundedReviewCount']
      if (count) {
        return count
      } else {
        return 22000
      }
    }
  },

  methods: {
    /**
     * Returns the current product's number of reviews
     *
     * @return Number
     */
    getProductReviewCount: function(productSlug) {
      const review = this.$store.getters['reviews/getProductReviews'](productSlug)
      if (review) {
        return review.numberOfRating
      }
    },

    /**
     * Returns the product rating
     *
     * @return Object
     */
    getProductRating: function(productSlug) {
      const review = this.$store.getters['reviews/getProductReviews'](productSlug)
      if (review) {
        return review.averageRating
      }
    }
  }
}
