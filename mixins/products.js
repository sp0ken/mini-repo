import Vivus from 'vivus'

export default {
  returnPrice: 30,
  returnHeadPrice: 15,

  data() {
    return {
      collection: '',
      product: '',
      selectedProduct: '',
      selectedVariant: '',
      addons: {
        'mattress-protector': {
          code: '',
          price: 0,
          selected: false
        },
        'pillow-protector': {
          code: '',
          price: 0,
          selected: false
        },
        'mattress': {
          code: '',
          price: 0,
          selected: false
        },
        'bed-frame': {
          code: '',
          price: 0,
          selected: false
        },
        'bed-head': {
          code: '',
          price: 0,
          selected: false
        },
        'build': {
          code: '',
          price: 0,
          selected: false
        }
      },
      hasMattressReturn: false,
      hasBedFrameReturn: false,
      hasBedHeadReturn: false
    }
  },

  computed: {
    locale: function () {
      return `${this.$store.state.i18n.locale}_${this.$store.state.i18n.locale.toUpperCase()}`
    },

    /**
     * Returns the selected variant's price
     *
     * @return Number
     */
    selectedProductPrice: function () {
      const variantPrice = this.selectedVariant.price / 100
      let price = variantPrice * this.selectedProduct.quantity || 0

      for (let productCode of Object.keys(this.addons)) {
        const addon = this.addons[productCode]
        if (addon.selected) price = price + addon.price
      }

      price =
        this.hasMattressReturn || this.hasBedFrameReturn ? price + this.$options.returnPrice : price
      price = this.hasBedHeadReturn ? price + this.$options.returnHeadPrice : price

      // Bed-head temp offer
      if (this.addons['mattress'].selected && this.addons['bed-head'].selected) {
        price = price - this.addons['bed-head'].price
      }

      return price
    }
  },

  methods: {
    /**
     * Queries the backend API for the given products category
     * Sets the products
     */
    retrieveCollection: async function (taxon) {
      this.$wait.start('fetch.collection')
      let collection
      try {
        collection = await this.$axios.$get(`${this.locale}/category/${taxon}`)

        this.collection = collection
        if (collection.products.length) this.setProduct(collection.products[0])
      } catch (e) {
        console.log(e)
      } finally {
        this.$wait.end('fetch.collection')
      }

      return collection
    },

    /**
     * Queries the backend API for the given product's variants
     */
    retrieveProduct: async function (productSlug) {
      this.$wait.start('fetch.product')
      let product
      try {
        product = await this.$axios.$get(`${this.locale}/products/${productSlug}`)
        this.product = product
        this.getMinProductPrice(product)
      } catch (e) {
        console.log(e)
      } finally {
        this.$wait.end('fetch.product')
      }

      return product
    },

    /**
     * Sets the product from the given one
     *
     * @param Object product
     */
    setProduct: function (product) {
      this.product = product

      this.getMinProductPrice(product)
    },

    /**
     * Emits an event with the product min price
     *
     * @param Object product
     */
    getMinProductPrice: function (product) {
      const prices = product.variants.map((variant) => variant.price / 100)
      const minPrice = Math.min(...prices)

      this.$nuxt.$emit('PRODUCT_PRICE', minPrice)

      return minPrice
    },

    /**
     * Sets the selected product from the given payload
     *
     * @param Object payload
     */
    setSelectedProduct: async function (payload) {
      if (!payload.product) return

      const variant = await this.getSelectedVariant(payload.product, payload.options)

      if (variant && variant.code) {
        this.selectedProduct = {
          productCode: payload.product,
          variantCode: variant.code,
          quantity: payload.quantity
        }

        this.$nuxt.$emit('PRODUCT_CHANGED', {
          variantName: variant.name,
          variantCode: variant.code,
          quantity: payload.quantity
        })

        this.selectedVariant = variant

        this.setAvailablePacks(variant.code)
      } else {
        this.selectedProduct = ''
        this.selectedVariant = ''
      }
    },

    /**
     * Queries the backend for the product's variant
     * based on options combination
     *
     * @return String
     */
    getSelectedVariant: async function (product, options) {
      if (!product) return

      this.$wait.start('fetch.variant')
      try {
        let postBody = {}
        for (let key in options) {
          postBody[key] = options[key]
        }

        const variant = await this.$axios.$post(
          `${this.locale}/products/${product}/variants`,
          postBody
        )
        return variant.code !== 404 ? variant.items[0] : ''
      } catch (e) {
        console.log(e)
      } finally {
        this.$wait.end('fetch.variant')
      }
    },

    /**
     * Sets the available addons data
     *
     * @param String variantCode
     *
     */
    setAvailablePacks: async function (variantCode) {
      if (!variantCode) return

      const packs = await this.getAvailablePacks(variantCode)

      if (packs && packs.length) {
        for (let productCode of Object.keys(this.addons)) {
          let matchingVariant
          for (let pack of packs) {
            matchingVariant = pack.variants.find(
              (variant) => variant.product === productCode && variant.enabled
            )
            if (matchingVariant) break
          }

          if (matchingVariant) {
            this.addons[productCode].price = matchingVariant.price / 100
            this.addons[productCode].code = matchingVariant.code
          } else {
            this.addons[productCode].price = 0
            this.addons[productCode].code = ''
            this.addons[productCode].selected = false
          }
        }

        this.$nuxt.$emit('PACK_CHANGED')
      }
    },

    /**
     * Queries the backend for the variant's packs
     *
     * @return Array
     */
    getAvailablePacks: async function (variantCode) {
      if (!variantCode) return

      this.$wait.start('fetch.packs')
      try {
        const res = await this.$axios.$get(`${this.locale}/packs/variant/${variantCode}`)
        return res.packs.filter((pack) => pack.code.startsWith('upsell_')) || []
      } catch (e) {
        console.log(e)
      } finally {
        this.$wait.end('fetch.packs')
      }
    },

    /**
     * Checks if product addons have been selected
     * and adds them to the given product array
     *
     * @param  Array items
     *
     * @return Array
     */
    checkAddons: function (items) {
      if (this.hasMattressReturn && !this.$store.getters['cart/hasVariant']('REPMAT')) {
        const mattressReturn = {
          productCode: 'logistique',
          variantCode: 'REPMAT',
          quantity: 1
        }
        items.push(mattressReturn)
      }
      if (this.hasBedFrameReturn && !this.$store.getters['cart/hasVariant']('REPSOM')) {
        const bedFrameReturn = {
          productCode: 'logistique',
          variantCode: 'REPSOM',
          quantity: 1
        }
        items.push(bedFrameReturn)
      }
      if (this.hasBedHeadReturn && !this.$store.getters['cart/hasVariant']('REPTET')) {
        const bedHeadReturn = {
          productCode: 'logistique',
          variantCode: 'REPTET',
          quantity: 1
        }
        items.push(bedHeadReturn)
      }

      for (let productCode of Object.keys(this.addons)) {
        const addon = this.addons[productCode]
        if (addon.selected) {
          const productAddon = {
            productCode: productCode,
            variantCode: addon.code,
            quantity: 1
          }
          items.push(productAddon)
        }
      }

      return items
    },

    /**
     * Adds the selected product to the current cart
     */
    addToCart: async function () {
      this.$wait.start('cart.add')

      // SVG Animation
      let vivus
      try {
        vivus = new Vivus(
          'logo-ours',
          {
            duration: 50
          },
          function (myVivus) {
            myVivus.play(myVivus.getStatus() === 'end' ? -1 : 1)
          }
        )
        vivus.play()
      } catch (e) {
        console.log(e)
      }

      let items = [this.selectedProduct]
      items = this.checkAddons(items)

      try {
        await this.$store.dispatch('cart/addItems', items)

        this.$nuxt.$emit('CART_CLASS', 'pulse')
        this.$nuxt.$emit('CART_TOAST', 'true')
      } catch (e) {
        console.log(e)
      } finally {
        if (vivus) vivus.stop()
        if (vivus) vivus.reset()
        this.$wait.end('cart.add')
      }
    }
  }
}
