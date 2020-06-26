/**
 * Stores to handle UI change on the website
 */
export const state = () => ({
  sidebar: false,
  showCrosssell: {
    'mattress': false,
    'slim-mattress': false,
    'bed-frame': false,
    'storage-bed-frame': false,
    'bed-head': false,
    'pillow': false,
    'blanket': false,
    'small-mattress': false,
    'small-sheet': false,
    'bed-linen-pillow-case': false,
    'sofa-bed-duo': false,
    'bed-linen-quilt-cover': false,
    'mattress-protector': false
  },
  showDeliveryModal: false,
  showOpModal: false,
  showBeesModal: false,
  showSaveCartModal: false
})

export const mutations = {
  openSidebar(state) {
    state.sidebar = true
  },
  closeSidebar(state) {
    state.sidebar = false
  },
  toggleSidebar(state) {
    state.sidebar = !state.sidebar
  },
  openCartToast(state) {
    state.showCartToast = true
  },
  closeCartToast(state) {
    state.showCartToast = false
  },
  toggleCrosssell(state, slug) {
    state.showCrosssell[slug] = !state.showCrosssell[slug]
  },
  toggleDeliveryModal(state) {
    state.showDeliveryModal = !state.showDeliveryModal
  },
  toggleOpModal(state) {
    state.showOpModal = !state.showOpModal
  },
  toggleBeesModal(state) {
    state.showBeesModal = !state.showBeesModal
  },
  toggleSaveCartModal(state) {
    state.showSaveCartModal = !state.showSaveCartModal
  },
  resetState(s) {
    const initial = state()
    Object.keys(initial).forEach((key) => {
      s[key] = initial[key]
    })
  }
}

export const actions = {
  /**
   * Resets the store
   */
  async resetState({ state, commit }) {
    commit('resetState', state)
  }
}
