/**
 * Store to handle calendar operations and requests
 */
export const state = () => ({
  requestDate: new Date().toISOString().split('T')[0],
  rawPayload: {},
  selectedDate: new Date().toISOString().split('T')[0],
  selectedStartTime: '',
  selectedEndTime: '',
  selectedProvider: '',
  selectedWarehouse: '',
  selectedLocality: ''
})

export const getters = {
  /**
   * Returns the available delivery dates
   *
   * @return Array
   */
  availableDates: (state) =>
  {
    return Object.keys(state.rawPayload).filter((key) =>
    {
      const slots = state.rawPayload[key]['times']
      if (slots) {
        const length = Array.isArray(slots) ? slots.length : Object.keys(slots).length
        return length >= 1
      } else {
        return false
      }
    })
  },

  /**
   * Returns the first available dates
   *
   * @return String
   */
  startDate: (state, getters) => {
    if (getters.availableDates.length) {
      return getters.availableDates[0]
    } else {
      return state.requestDate
    }
  },

  /**
   * Returns the disabled dates
   *
   * @return Array
   */
  disabledDates: (state, getters) => {
    let disabledDates = []

    const daysToLoop = 40
    let startDate = new Date(getters.startDate)
    startDate.setDate(1)
    let endDate = new Date(startDate.toISOString())
    endDate.setDate(startDate.getDate() + daysToLoop)

    let currentDate = startDate

    while (currentDate <= endDate) {
      let monthString = `0${currentDate.getMonth() + 1}`
      let dayString = `0${currentDate.getDate()}`
      let dateString = `${currentDate.getFullYear()}-${monthString.slice(-2)}-${dayString.slice(
        -2
      )}`

      if (getters.availableDates.indexOf(dateString) === -1) {
        disabledDates.push(
          `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        )
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return disabledDates
  },

  /**
   * Returns the available delivery time slots
   *
   * @return Array
   */
  availableSlots: (state) =>
  {
    if (state.selectedDate in state.rawPayload && state.selectedDate !== 'error') {
      return state.rawPayload[state.selectedDate]['times']
    } else {
      return []
    }
  },

  /**
   * Returns whether a time slot has been selected
   *
   * @return Boolean
   */
  hasSelectedSlot: (state) =>
  {
    if (
      state.selectedStartTime !== '' &&
      state.selectedEndTime !== '' &&
      state.selectedProvider !== '' &&
      state.selectedWarehouse !== ''
    ) {
      return true
    } else {
      return false
    }
  },

  /**
   * Returns the selected delivery date
   * in a locale formated string
   *
   * @return String
   */
  localeFormatedDate: (state) =>
  {
    const selectedDate = state.selectedDate ? new Date(state.selectedDate) : new Date()
    return selectedDate.toLocaleDateString('fr-fr', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
  },

  /**
   * Returns the selected delivery slot
   * in a local formated string
   *
   * @return Object
   */
  localeFormatedSlot: (state, getters) =>
  {
    if (getters.hasSelectedSlot) {
      return {
        start_time: state.selectedStartTime,
        end_time: state.selectedEndTime
      }
    } else {
      return {
        start_time: '',
        end_time: ''
      }
    }
  },

  /**
   * Returns a properly formated object
   * to be fed to the backend API
   *
   * @return Object
   */
  apiPayload: (state) =>
  {
    return {
      erp_id: state.selectedWarehouse,
      method: state.selectedProvider,
      start_slot: `${state.selectedDate} ${state.selectedStartTime}:00`,
      end_slot: `${state.selectedDate} ${state.selectedEndTime}:00`
    }
  },

  /**
   * Returns the first date
   * compatible with credit payment
   * Need +1 to show the first allowed date
   *
   * @return Date
   */
  creditSafeDate: () =>
  {
    const safetyDays = 5
    const today = new Date()
    today.setDate(today.getDate() + safetyDays + 1)

    return today
  }
}

export const mutations = {
  setRequestDate(state, date)
  {
    state.requestDate = new Date(date).toISOString().split('T')[0]
  },
  setPayload(state, payload)
  {
    state.rawPayload = payload
    state.selectedDate = Object.keys(payload)[0]
  },
  setSelectedDate(state, date)
  {
    state.selectedDate = date
  },
  setSelectedStartTime(state, startTime)
  {
    state.selectedStartTime = startTime
  },
  setSelectedEndTime(state, endTime)
  {
    state.selectedEndTime = endTime
  },
  setSelectedProvider(state, provider)
  {
    state.selectedProvider = provider
  },
  setSelectedWarehouse(state, warehouse)
  {
    state.selectedWarehouse = warehouse
  },
  setSelectedLocality(state, locality)
  {
    state.selectedLocality = locality
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
   * Queries the ERP API to get the calendar data
   * Based on the provided parameters
   *
   * @param  String payload.postalCode
   * @param  String payload.countryCode
   * @param  Date payload.date
   * @param  Integer payload.limit Number of days to fetch
   * @param  Array payload.products Products in the cart
   *
   */
  async fetchCalendarResponse(
    { commit, rootState },
    { postalCode, countryCode, date, limit, products }
  )
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const postBody = {
      postalCode,
      countryCode,
      date,
      limit,
      products
    }

    const res = await this.$axios.$post(`${locale}/erp/calendar`, postBody)
    commit('setPayload', res)
  },

  /**
   * Adds a shipment method to a cart
   * Based on the apiPayload getter
   *
   */
  async addShipment({ getters, rootState, rootGetters })
  {
    const locale = `${rootState.i18n.locale}_${rootState.i18n.locale.toUpperCase()}`
    const postBody = getters.apiPayload
    const cartToken = rootGetters['cart/cartToken']

    if (postBody) {
      await this.$axios.$put(`${locale}/order/${cartToken}/shipping`, postBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  },

  /**
   * Resets the store
   */
  async resetState({ state, commit })
  {
    commit('resetState', state)
  }
}
