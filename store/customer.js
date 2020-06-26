/**
 * Store to handle cart customer operations and requests
 */
export const state = () => ({
  email: '',
  phone: '',
  shippingAddress: {
    firstName: '',
    lastName: '',
    city: '',
    street: '',
    streetLine2: '',
    countryCode: '',
    postcode: '',
    details: '',
    company: ''
  },
  billingAddress: {
    firstName: '',
    lastName: '',
    city: '',
    street: '',
    streetLine2: '',
    countryCode: '',
    postcode: '',
    tva: ''
  },
  hasBilling: false,
  hasNewsletter: false,
  hasRGPD: false,
  hasSaveCart: false
})

export const mutations = {
  setPhone (state, phone) {
    state.phone = phone
  },
  setEmail (state, email) {
    state.email = email
  },
  setShippingFirstName (state, firstName) {
    state.shippingAddress.firstName = firstName
  },
  setShippingLastName (state, lastName) {
    state.shippingAddress.lastName = lastName
  },
  setShippingCity (state, city) {
    state.shippingAddress.city = city
  },
  setShippingStreet (state, street) {
    state.shippingAddress.street = street
  },
  setShippingStreetLine2 (state, streetLine2) {
    state.shippingAddress.streetLine2 = streetLine2
  },
  setShippingCountryCode (state, countryCode) {
    state.shippingAddress.countryCode = countryCode
  },
  setShippingPostCode (state, postcode) {
    state.shippingAddress.postcode = postcode
  },
  setShippingDetails (state, details) {
    state.shippingAddress.details = details
  },
  setShippingCompany (state, company) {
    state.shippingAddress.company = company
  },
  setBillingFirstName (state, firstName) {
    state.billingAddress.firstName = firstName
  },
  setBillingLastName (state, lastName) {
    state.billingAddress.lastName = lastName
  },
  setBillingCity (state, city) {
    state.billingAddress.city = city
  },
  setBillingStreet (state, street) {
    state.billingAddress.street = street
  },
  setBillingStreetLine2(state, streetLine2) {
    state.billingAddress.streetLine2 = streetLine2
  },
  setBillingCountryCode(state, countryCode) {
    state.billingAddress.countryCode = countryCode
  },
  setBillingPostCode (state, postcode) {
    state.billingAddress.postcode = postcode
  },
  setBillingVAT (state, vat) {
    state.billingAddress.tva = vat
  },
  setHasBilling (state, hasBilling) {
    state.hasBilling = hasBilling
  },
  setHasRGPD (state, hasRGPD) {
    state.hasRGPD = hasRGPD
  },
  setHasNewsletter (state, hasNewsletter) {
    state.hasNewsletter = hasNewsletter
  },
  setHasSaveCart (state, hasSaveCart) {
    state.hasSaveCart = hasSaveCart
  },
  setAddress (state, payload) {
    state[`${payload.type}Address`] = payload.address
  },
  setCustomer (state, payload) {
    state.email = payload.email
    state.phone = payload.phone
    state.hasRGPD = payload.hasRGPD
    state.hasNewsletter = payload.hasNewsletter
    state.hasSaveCart = payload.hasSaveCart
  },
  resetState (s) {
    const initial = state()
    Object.keys(initial).forEach(key => { s[key] = initial[key] })
  }
}

export const actions = {
  /**
   * Adds the current customer addresses to the current cart
   */
  async addAddresses ({ state, commit, dispatch, rootState, rootGetters }) {
    if (!rootState.cart.cart) {
      await dispatch('cart/retrieveCart', null, { root: true })
    }

    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const cartToken = rootGetters['cart/cartToken']
    const postBody = {
      shippingAddress: JSON.parse(JSON.stringify(state.shippingAddress)),
      billingAddress: JSON.parse(JSON.stringify(state.billingAddress)),
      customer: {
        firstName: state.shippingAddress.firstName,
        lastName: state.shippingAddress.lastName,
        email: state.email,
        phoneNumber: state.phone,
        newsletter: state.hasNewsletter
      }
    }
    if (postBody.shippingAddress.streetLine2) postBody.shippingAddress.street = `${postBody.shippingAddress.street} \n ${postBody.shippingAddress.streetLine2}`
    if (postBody.billingAddress.streetLine2) postBody.billingAddress.street = `${postBody.billingAddress.street} \n ${postBody.billingAddress.streetLine2}`
    if (state.hasBilling) postBody.billingAddress.lastName = postBody.billingAddress.firstName

    const res = await this.$axios.$put(`${locale}/order/${cartToken}/address`, postBody)
    await dispatch('cart/setCart', res, { root: true })

    try {
      const consent = (window.localStorage.getItem('vue-cookie-accept-decline-footer') === 'accept') ? 'granted' : 'denied'
      let tags = (state.hasSaveCart) ? ['savedCart'] : ['initiateCheckout']

      let identity = {
        email: state.email.trim(),
        user_id: res.customer.id,
        first_name: state.shippingAddress.firstName,
        last_name: state.shippingAddress.lastName,
        phone: state.phone,
        address1: postBody.shippingAddress.street,
        zip: state.shippingAddress.postcode,
        city: state.shippingAddress.city,
        country: state.shippingAddress.countryCode,
        tags: tags,
        eu_consent: consent
      }
      if (state.hasNewsletter !== null) {
        identity.newsletter = state.hasNewsletter
      }

      /* eslint-disable-next-line no-undef */
      _dcq.push([
        'identify',
        {
          ...identity,
          failure: function(response) {
            console.log(response)
          }
        }
      ])
    } catch (e) {
      console.log(e)
    } finally {
      commit('setHasSaveCart', false)
    }

    try {
      /* eslint-disable-next-line no-undef */
      ADMO.method.call_partners_tv_info('drip', { email: state.email })
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * Resets the store
   */
  async resetState ({ state, commit }) {
    commit('resetState', state)
  }
}
