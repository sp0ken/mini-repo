/**
 * Store to handle cart and payments operations
 */
export const state = () => ({
  cart: {
    number: '',
    tokenValue: '',
    checkoutState: '',
    items: [],
    cartDiscounts: {}
  },
  payments: {},
  captureUrl: '',
  selectedProduct: {
    product: '',
    size: '',
    options: {},
    variant: '',
    quantity: 1
  },
  errors: [],
  productWarnings: [],
  crosssell: {
    'mattress': [
      'bed-frame',
      'storage-bed-frame',
      'bed-head',
      'pillow',
      'blanket',
      'mattress-protector',
      'bed-linen-flat-sheet',
      'small-mattress',
      'small-sheet',
      'bed-linen-quilt-cover',
      'bed-linen-pillow-case',
      'bed-linen-fitted-sheet',
      'bed-linen-flat-sheet'
    ],
    'kid-mattress': ['small-mattress', 'mattress-protector', 'bed-linen-flat-sheet', 'small-sheet'],
    'bed-frame': [
      'bed-head',
      'mattress',
      'small-mattress',
      'small-sheet',
      'bed-linen-quilt-cover',
      'bed-linen-pillow-case',
      'bed-linen-fitted-sheet',
      'bed-linen-flat-sheet'
    ],
    'storage-bed-frame': [
      'bed-head',
      'mattress',
      'small-mattress',
      'small-sheet',
      'bed-linen-quilt-cover',
      'bed-linen-pillow-case',
      'bed-linen-fitted-sheet',
      'bed-linen-flat-sheet'
    ],
    'bed-head': ['mattress', 'bed-frame', 'pillow', 'blanket'],
    'pillow': [
      'mattress',
      'sofa-bed-duo',
      'bed-frame',
      'storage-bed-frame',
      'bed-head',
      'pillow-protector',
      'blanket',
      'bed-linen-quilt-cover',
      'bed-linen-pillow-case',
      'bed-linen-fitted-sheet',
      'bed-linen-flat-sheet',
      'bolster'
    ],
    'bolster': ['pillow', 'mattress-protector', 'bed-linen'],
    'pillow-protector': ['pillow', 'bed-linen-pillow-case', 'mattress-protector'],
    'blanket': [
      'mattress',
      'bed-frame',
      'storage-bed-frame',
      'bed-head',
      'pillow',
      'bed-linen-quilt-cover',
      'sofa-bed-duo',
      'bed-linen-pillow-case',
      'bed-linen-fitted-sheet',
      'bed-linen-flat-sheet',
      'bolster'
    ],
    'small-mattress': ['small-sheet', 'mattress-protector'],
    'small-sheet': ['small-mattress'],
    'bed-linen': ['mattress', 'bed-frame', 'storage-bed-frame', 'blanket', 'pillow', 'bolster'],
    'bed-linen-quilt-cover': [
      'mattress',
      'bed-frame',
      'storage-bed-frame',
      'blanket',
      'pillow',
      'bed-linen-flat-sheet',
      'sofa-bed-duo'
    ],
    'bed-linen-pillow-case': ['mattress', 'pillow', 'blanket', 'pillow-protector'],
    'bed-linen-fitted-sheet': [],
    'bed-linen-flat-sheet': [],
    'mattress-protector': ['mattress', 'bed-frame', 'storage-bed-frame', 'bolster']
  }
})

export const getters = {
  /**
   * Returns the percentage of VAT
   *
   * @return Number
   */
  localeVATPercent: (state) =>
  {
    if (state.cart.totals) {
      return state.cart.totals.taxesRate * 100 || 0
    }
    return 0
  },

  /**
   * Returns the cart's total price
   * in cents
   *
   * @return Number
   */
  cartTotalPriceInCents: (state) =>
  {
    if (state.cart.totals) {
      return state.cart.totals.total || 0
    }
    return 0
  },

  /**
   * Returns the cart's total price
   * VAT taken into account
   *
   * @return Float
   */
  cartTotalPrice: (state, getters) =>
  {
    return getters.cartTotalPriceInCents / 100
  },

  /**
   * Returns the cart's VAT value
   *
   * @return Float
   */
  cartVATPrice: (state) =>
  {
    if (state.cart.totals) {
      return state.cart.totals.taxes / 100 || 0
    }
    return 0
  },

  /**
   * Returns the cart's tax-free value
   * based on the locale
   *
   * @return Number
   */
  cartTaxFreePrice: (state, getters) =>
  {
    return getters.cartTotalPrice - getters.cartVATPrice
  },

  /**
   * Returns the cart's Ecotax value
   *
   * @return Float
   */
  cartEcoPrice: (state) =>
  {
    if (state.cart.totals) {
      return state.cart.totals.ecotax / 100 || 0
    }
    return 0
  },

  /**
   * Returns the cart's size
   *
   * @return Number
   */
  cartSize: (state) =>
  {
    let size = 0
    if (state.cart.items) {
      for (let index in state.cart.items) {
        size += state.cart.items[index].quantity
      }
    }
    return size
  },

  /**
   * Returns the cart's backend token
   * Used in various API calls
   *
   * @return String
   */
  cartToken: (state) =>
  {
    if (state.cart) {
      return state.cart.tokenValue
    }
  },

  /**
   * Returns the cart's order id
   *
   * @return Number
   */
  orderId: (state) =>
  {
    if (state.cart) {
      return state.cart.number
    }
  },

  /**
   * Returns an array of dates and associated values
   * Used in three-times payment method (i.e. Be2Bill)
   *
   * @param Number times
   * @param String locale
   *
   * @return Array
   */
  nTimesPaymentDatesAndAmounts: (state, getters) => (times) =>
  {
    const fullAmount = getters.cartTotalPrice
    const splitAmount = getters.cartTotalPrice / times
    const intSplitAmount = parseInt(splitAmount)
    const now = new Date()
    const nowMonth = now.getMonth()
    let payments = []

    for (var i = 1; i <= times; i++) {
      const currentMonth = nowMonth + (i - 1)
      const currentDate = new Date(now.toISOString())
      currentDate.setMonth(currentMonth)
      let amount = 0

      if (i === 1) {
        const combinedAmount = fullAmount - times * intSplitAmount
        const finalAmount = (intSplitAmount + combinedAmount) * 100
        amount = finalAmount
      } else {
        amount = intSplitAmount * 100
      }

      let payment = {
        date: currentDate,
        amount: amount
      }
      payments.push(payment)
    }
    return payments
  },

  /**
   * Checks if the provided product
   * is present in the cart
   *
   * @param  String productSlug
   *
   * @return Boolean
   */
  hasProduct: (state) => (productSlug) =>
  {
    let hasProduct = false
    if (state.cart.items) {
      hasProduct = state.cart.items.findIndex((item) => item.product.slug === productSlug) !== -1
    }
    return hasProduct
  },

  /**
   * Checks if the provided variant
   * is present in the cart
   *
   * @param  String variantCode
   *
   * @return Boolean
   */
  hasVariant: (state) => (variantCode) =>
  {
    let hasVariant = false
    if (state.cart.items) {
      hasVariant =
        state.cart.items.findIndex((item) => item.product.variants[0].code === variantCode) !== -1
    }
    return hasVariant
  },

  /**
   * Checks if the given product
   * has the given size
   *
   *
   * @param  String productCode
   * @param  Array size
   *
   * @return Boolean
   */
  hasProductSize: (state, getters) => (productCode, sizes) => {
    let hasSize = false
    if (state.cart.items && getters.hasProduct(productCode)) {
      const product = state.cart.items.find((item) => item.product.code === productCode)
      const variant = product.product.variants[0]

      for (let size of sizes) {
        if (variant.code.indexOf(size) !== -1) {
          hasSize = true
        }
      }
    }

    return hasSize
  },

  /**
   * Retrieves the product's name based on its variant code
   *
   * @param  String variantCode
   *
   * @return String
   */
  getProductNameByCode: (state) => (variantCode) =>
  {
    let productName = variantCode
    if (state.cart.items) {
      const item = state.cart.items.find(
        (item) => item.product.variants[0].code.indexOf(variantCode) !== -1
      )
      productName = item ? item.product.name : variantCode
    }
    return productName
  },

  /**
   * Return the product's quantity
   * based on its variant code
   *
   * @param  String variantCode
   *
   * @return Number
   */
  getProductQuantityByCode: (state) => (variantCode) =>
  {
    let quantity = 0
    if (state.cart.items) {
      const item = state.cart.items.find((item) => item.product.variants[0].code === variantCode)
      quantity = item ? item.quantity : 0
    }
    return quantity
  },

  /**
   * Checks if the given product slug shoud have its crosssell displayed
   * The same product must not be present in the cart
   * And at least one of the trigger product must be present
   *
   * @param  String productSlug
   *
   * @return Boolean
   */
  showProductCrosssell: (state, getters) => (productSlug) =>
  {
    let show = false
    const triggerProducts = state.crosssell[productSlug]
    if (!getters.hasProduct(productSlug)) {
      triggerProducts.forEach((product) =>
      {
        if (!show && getters.hasProduct(product)) {
          show = true
        }
      })
    }
    if (!getters.cartSize) show = true

    return show
  },

  /**
   * Checks if the provided payment gateway
   * is present in the payment array
   *
   * @param  String gateway
   *
   * @return Boolean
   */
  hasGateway: (state) => (gateway) =>
  {
    if (state.payments) {
      for (let index in state.payments) {
        const payment = state.payments[index]
        if (payment.code === gateway) return true
      }
    }
    return false
  },

  /**
   * Checks if the cart is editable in the backend
   *
   * @return Boolean
   */
  isEditable: (state) =>
  {
    return state.cart && state.cart.checkoutState !== 'payment_selected'
  },

  /**
   * Checks if the cart contains a single framed bed-frame
   *
   * @return Boolean
   */
  isBedFrameTooLarge: (state) =>
  {
    let isTooLarge = false
    if (state.cart.items) {
      state.cart.items.forEach((item) =>
      {
        if (item.product.variants[0].code.startsWith('TEDSO140190')) isTooLarge = true
        if (item.product.variants[0].code.startsWith('TEDSO140200')) isTooLarge = true
        if (item.product.variants[0].code.startsWith('TEDSO160200')) isTooLarge = true
      })
    }
    return isTooLarge
  },

  /**
   * Checks if the cart contains the two given product
   * and whether they belong to the same pack
   *
   * @return Boolean
   */
  doesProductPacksMatch: (state, getters) => (productSlugOne, productSlugTwo) =>
  {
    let doesMatch = true
    if (getters.hasProduct(productSlugOne) && getters.hasProduct(productSlugTwo)) {
      const productOne = state.cart.items.find((item) => item.product.slug === productSlugOne)
      const productTwo = state.cart.items.find((item) => item.product.slug === productSlugTwo)
      if ('packs' in productOne.product.variants[0] && 'packs' in productTwo.product.variants[0]) {
        const productOnePacks = productOne.product.variants[0].packs.filter(
          (pack) => !pack.startsWith('upsell_')
        )
        const productTwoPacks = productTwo.product.variants[0].packs.filter(
          (pack) => !pack.startsWith('upsell_')
        )

        if (productOnePacks && productTwoPacks) {
          doesMatch = false
          productOnePacks.some((pack) =>
          {
            doesMatch =
              productTwoPacks.findIndex((productTwoPack) => productTwoPack === pack) !== -1
            return doesMatch
          })
        }
      }
    }

    return doesMatch
  },

  /**
   * Returns a properly formated object
   * to be fed to the backend calendar API
   *
   * @return Object
   */
  calendarPayload: (state) =>
  {
    let payload = []
    if (state.cart.items) {
      for (let index in state.cart.items) {
        payload.push({
          code: state.cart.items[index].product.variants[0].code,
          quantity: state.cart.items[index].quantity
        })
      }
    }
    return payload
  }
}

export const mutations = {
  setCart(state, cart)
  {
    state.cart = cart
  },
  setCartToken(state, token)
  {
    state.cart.tokenValue = token
  },
  setSelected(state, payload)
  {
    state.selectedProduct = payload
  },
  setPayments(state, payments) {
    if (payments && payments.length) {
      state.payments = payments[0].methods
    }
  },
  setCaptureUrl(state, url)
  {
    state.captureUrl = url
  },
  addError(state, payload)
  {
    state.errors.push(payload)
  },
  deleteError(state, index)
  {
    state.errors.splice(index, 1)
  },
  addProductWarning(state, payload)
  {
    state.productWarnings.push(payload)
  },
  deleteProductWarning(state, index)
  {
    state.productWarnings.splice(index, 1)
  },
  resetProductWarnings(state)
  {
    state.productWarnings = []
  },
  resetState(s)
  {
    const initial = state()
    Object.keys(initial).forEach((key) =>
    {
      s[key] = initial[key]
    })
  }
}

export const actions = {
  /**
   * Adds an error
   *
   * @param Object payload
   */
  async addError({ commit }, payload)
  {
    commit('addError', payload)
  },

  /**
   * Resets the calendar and ui stores
   */
  async resetCalendar({ dispatch })
  {
    await dispatch('calendar/resetState', null, { root: true })
    await dispatch('ui/resetState', null, { root: true })
  },

  /**
   * Resets the calendar, customer and ui stores
   */
  async resetCalendarAndCustomer({ dispatch })
  {
    await dispatch('calendar/resetState', null, { root: true })
    await dispatch('ui/resetState', null, { root: true })
    await dispatch('customer/resetState', null, { root: true })
  },

  /**
   * Sets the cart
   */
  async setCart({ commit }, cart)
  {
    commit('setCart', cart)
  },

  /**
   * Queries the backend API for a new cart
   * and commits it to the store
   *
   */
  async initCart({ commit, rootState })
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    try {
      let body = {
        "version": process.env.branch ? process.env.branch : null,
        "user-agent": navigator.userAgent ? navigator.userAgent : null
      }
      const res = await this.$axios.$post(`${locale}/carts`, body)
      commit('setCart', res)
    } catch (e) {
      commit('addError', { id: Date.now(), type: 'error', message: e.response.data.message })
      console.log(e)
    }
  },

  /**
   * Queries the backend API for a given cart
   * based on its token
   *
   */
  async retrieveCart({ getters, commit, rootState })
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`

    if (getters.cartToken) {
      try {
        const res = await this.$axios.$get(`${locale}/carts/${getters.cartToken}`)
        if (res.shipments.length && res.shipments[0].state !== 'cancelled') commit('setCart', res)
      } catch (e) {
        console.log(e)
      }
    }
  },

  /**
   * Deletes the store cart
   * (Does not delete it from the backend)
   * Remove previously added coupon
   */
  async deleteCart({ state, commit, dispatch })
  {
    try {
      for (let coupon in state.cart.cartDiscounts) {
        await dispatch('cart/deleteCoupon', coupon, { root: true })
      }

      /* eslint-disable no-undef, no-unused-vars */
      var adapter = OptiMonk.Visitor.createAdapter()
      adapter.Cart.clear()
      /* eslint-enable no-undef, no-unused-vars */
    } catch (e) {
      console.log(e)
    } finally {
      commit('setCart', { tokenValue: '', items: [], cartDiscounts: {} })
    }
  },

  /**
   * Sets the cart as editable in the backend
   * and commits the cart
   *
   */
  async modifyCart({ getters, commit, rootState })
  {
    commit('setCaptureUrl', '')

    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`

    try {
      const res = await this.$axios.$put(`${locale}/order/${getters.cartToken}/modify`)
      if (res) commit('setCart', res)
    } catch (e) {
      commit('addError', { id: Date.now(), type: 'error', message: e.response.data.message })
      console.log(e)
    }
  },

  /**
   * Sets the cart as completed in the backend
   * and commits the checkout url if available
   *
   * @param payload.email
   * @param payload.redirectUrl
   * @param payload.cancelUrl
   *
   */
  async completeCart({ getters, commit, rootState }, { email, redirectUrl, cancelUrl, version, userAgent })
  {
    commit('setCaptureUrl', '')

    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const postBody = {
      email: email,
      redirectUrl: redirectUrl,
      cancelUrl: cancelUrl,
      version: version,
      'user-agent': userAgent
    }

    try {
      const res = await this.$axios.$put(
        `${locale}/order/${getters.cartToken}/complete`,
        postBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (res) commit('setCaptureUrl', res.captureUrl)
    } catch (e) {
      commit('addError', { id: Date.now(), type: 'error', message: e.response.data.message })
      console.log(e)
    }
  },

  /**
   * Adds the given item to the current cart
   * and commits it to the store
   *
   * @param Array items
   */
  async addItems({ getters, dispatch, commit, rootState }, items)
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`

    if (!getters.cartToken) {
      await dispatch('initCart')
    }

    const res = await this.$axios.$post(`${locale}/carts/${getters.cartToken}/items`, items)
    commit('setCart', res)
    await dispatch('resetCalendar')
  },

  /**
   * Changed the quantity of a cart item
   * and commits it to the store
   *
   * @param String item
   *
   */
  async putItem({ getters, commit, dispatch, rootState }, item)
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`

    const res = await this.$axios.$put(`${locale}/carts/${getters.cartToken}/items/${item.id}`, {
      quantity: item.quantity
    })
    commit('setCart', res)
    await dispatch('resetCalendar')
  },

  /**
   * Deletes a product from the current cart
   * and commits it to the store
   *
   * Deletes the cart if it was the last product
   * and resets various stores
   *
   * @param String item
   *
   */
  async deleteItem({ state, getters, dispatch, commit, rootState }, item)
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`

    if (state.cart.items.length > 1) {
      try {
        const res = await this.$axios.$delete(
          `${locale}/carts/${getters.cartToken}/items/${item.id}`
        )
        commit('setCart', res)
      } catch (e) {
        commit('resetState', state)
        await dispatch('resetCalendarAndCustomer')
        console.log(e)
      }
    } else {
      await dispatch('cart/deleteCart', null, { root: true })
      await dispatch('resetCalendarAndCustomer')
    }
  },

  /**
   * Checks the backend availability of a product
   * Adds a product warning in case of product shortage
   * Splits the variant code if necessary (Backend requirement)
   *
   * @param String variantCode
   *
   */
  async checkProductAvailability({ commit, rootState }, variantCode) {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const code = variantCode.indexOf('_') !== -1 ? variantCode.split('_')[0] : variantCode

    const res = await this.$axios.$get(`${locale}/erp/product/availability/${code}`)
    const availabilityDate = new Date(res[code].date).setHours(0, 0, 0, 0)
    const today = new Date().setHours(0, 0, 0, 0)
    if (availabilityDate > today) {
      commit('addProductWarning', {
        id: Date.now(),
        type: 'shortage',
        product: code,
        date: availabilityDate
      })
    }
  },

  /**
   * Adds a discount coupon for the current cart
   * and commits it to the store
   *
   * @param String coupon
   *
   */
  async addCoupon({ getters, commit, dispatch, rootState }, coupon)
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const postBody = {
      coupon: coupon
    }

    const res = await this.$axios.$put(`${locale}/carts/${getters.cartToken}/coupon`, postBody)
    if ('tokenValue' in res) {
      commit('setCart', res)
    } else if ('productCode' in res) {
      await dispatch('addItems', [res])
    }
  },

  /**
   * Deletes a discount coupon from the current cart
   * and commits it to the store
   *
   * @param String coupon
   *
   */
  async deleteCoupon({ getters, commit, rootState }, coupon)
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const postBody = {
      coupon: coupon
    }

    const res = await this.$axios.$delete(`${locale}/carts/${getters.cartToken}/coupon`, postBody)
    commit('setCart', res)
  },

  /**
   * Adds customer address and shipping method
   *
   */
  async addAddressesAndShipment({ dispatch })
  {
    await dispatch('customer/addAddresses', null, { root: true })
    await dispatch('calendar/addShipment', null, { root: true })
  },

  /**
   * Queries the backend API for available payment gateway
   * and commits it to the store
   *
   */
  async fetchPayments({ getters, commit, rootState })
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`

    const res = await this.$axios.$get(`${locale}/order/${getters.cartToken}/payment`)
    commit('setPayments', res.payments)
  },

  /**
   * Sets the selected payment gateway for the current cart
   * and commits it to the store
   *
   * @param String gateway
   *
   */
  async addGateway({ getters, commit, rootState }, gateway)
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const postBody = { code: gateway }

    const res = await this.$axios.$put(`${locale}/order/${getters.cartToken}/payment`, postBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('setCart', res)
  },

  /**
   * Sets the selected payment gateway for the current cart
   * and queries the backend API to retrieve the payment form URL
   * and commits it to the store
   *
   * @param payload.gateway
   * @param payload.email
   * @param payload.redirectUrl
   * @param payload.cancelUrl
   * @param payload.version
   * @param payload.userAgent
   *
   */
  async setGateway({ dispatch, commit }, { gateway, email, redirectUrl, cancelUrl, version, userAgent })
  {
    commit('setCaptureUrl', '')

    await dispatch('addGateway', gateway)
    await dispatch('completeCart', { email, redirectUrl, cancelUrl, version, userAgent })
  }
}
