/**
 * Store to handle product reviews
 */
export const state = () => ({
  products: {
    items: []
  }
})

export const getters = {
  /**
   * Returns reviews for the given product
   *
   * @param String productSlug
   *
   * @return Object
   */
  getProductReviews: (state) => (productSlug) => {
    if (productSlug.startsWith('bed-linen')) productSlug = 'bed-linen-pillow-case'
    return state.products.items.find((product) => product.code === productSlug)
  },

  /**
   * Returns the total number of reviews
   * across all products
   *
   * @return Number
   */
  totalReviewCount: (state) => {
    if (state.products.items) {
      return state.products.items.reduce((total, product) => {
        return total + product.numberOfRating
      }, 0)
    }
  },

  /**
   * Returns the average rating
   * across all products
   *
   * @return Float
   */
  averageReviewRating: (state) => {
    if (state.products.items) {
      const totalRatings = state.products.items.reduce((total, product) => {
        if (product.averageRating > 0) {
          return total + product.averageRating
        } else {
          return total
        }
      }, 0)
      const eligibleProducts = state.products.items.reduce((total, product) => {
        if (product.averageRating > 0) {
          return total + 1
        } else {
          return total
        }
      }, 0)

      return totalRatings / eligibleProducts
    }
  },

  /**
   * Returns the rounded number of reviews
   *
   * @return Number
   */
  roundedReviewCount: (state, getters) => {
    return Math.floor(getters.totalReviewCount / 10) * 10
  },

  /**
   * Returns the rounded average rating
   *
   * @return Float
   */
  roundedReviewRating: (state, getters) => {
    return Number(getters.averageReviewRating.toFixed(1))
  }
}

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  }
}

export const actions = {
  /**
   * Queries the backend for the product reviews
   * and commits it to the store
   *
   */
  async fetchProductReviews({ commit, rootState }) {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`

    const res = await this.$axios.$get(`${locale}/products`)
    commit('setProducts', res)
  }
}
