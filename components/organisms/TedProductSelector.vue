<template>
  <div class="col-12">
    <div v-for="(option, index) in product.options" :key="option.code" class="columns">
      <template v-if="selectedProduct.options[option.code]">
        <ted-select-field
          v-if="option.code.indexOf('color') === -1"
          :id="option.code"
          :value.sync="selectedProduct.options[option.code]"
          :name="`option-select-${option.code}`"
          class="column"
          :class="getSelectorClass(option.code)"
          @update:value="changeSlide"
        >
          <template v-if="option.code.indexOf('size') !== -1" #label>
            <span v-html="$t('product-selector.label.choose-option-size')"></span>
            <span
              v-if="hasGuide"
              @click="toggleGuide"
              v-html="$t('product-selector.label.choose-option-size-guide')"
            ></span>
          </template>

          <template v-if="option.code.indexOf('size') !== -1" #options>
            <optgroup
              v-if="productSizes.standard.length"
              :label="$t('product-selector.option.standard-size')"
            >
              <option v-for="size in productSizes.standard" :key="size.code" :value="size.code">
                {{
                  `${size.value} - ${
                    getVariantPriceBySize(size.code)
                      ? getVariantPriceBySize(size.code)
                      : $t('product-selector.option.out-of-stock')
                  }`
                }}
              </option>
            </optgroup>
            <optgroup
              v-if="productSizes.other.length"
              :label="$t('product-selector.option.other-size')"
            >
              <option v-for="size in productSizes.other" :key="size.code" :value="size.code">
                {{
                  `${size.value} - ${
                    getVariantPriceBySize(size.code)
                      ? getVariantPriceBySize(size.code)
                      : $t('product-selector.option.out-of-stock')
                  }`
                }}
              </option>
            </optgroup>
          </template>

          <template v-else #options>
            <option
              v-for="value in option.values.filter((value) => value.optgroup === optGroupId)"
              :key="value.code"
              :value="value.code"
              >{{ value.value }}</option
            >
          </template>
        </ted-select-field>

        <ted-input-field
          v-if="option.code.indexOf('size') !== -1"
          :value.sync="selectedProduct.quantity"
          name="quantity"
          type="number"
          class="col-3 column"
        >
          <template #label>{{ $t('product-selector.label.quantity') }}</template>
        </ted-input-field>

        <div
          v-if="option.code.indexOf('color') !== -1"
          :id="option.code"
          class="colors form-group column"
        >
          <ted-label>{{ $t(`product-selector.label.choose-option-${option.code}`) }}</ted-label>
          <div class="ted-colors">
            <ted-color
              v-for="color in getColorValues(option.code, optGroupId)"
              :key="color.code"
              :value.sync="selectedProduct.options[option.code]"
              :name="color.code"
              group="colors"
              :color="getColorObject(color)"
              :is-mobile="isMobile"
              class="mx-2"
              @update:value="changeSlide"
            ></ted-color>
          </div>
        </div>

        <ted-input-field
          v-if="!sizeOption && index === 0"
          :value.sync="selectedProduct.quantity"
          name="quantity"
          type="number"
          class="quantity column"
        >
          <template #label>{{ $t('product-selector.label.quantity') }}</template>
        </ted-input-field>

        <div v-show="getOptionHelpText(option.code)" class="col-12 column option-help">
          <span class="help-text mt-1 text-left">{{ getOptionHelpText(option.code) }}</span>
        </div>

        <transition name="fade">
          <div v-if="showGuide" class="guide">
            <ted-guide-modal :product="product.code" @close-modal="toggleGuide"></ted-guide-modal>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
  import colorsMixin from '~/mixins/colors.js'

  export default {
    codeToSlide: {},

    mixins: [colorsMixin],

    i18n: {
      messages: {
        fr: require('~/locales/fr/ProductSelector.json')
      }
    },

    props: {
      product: {
        type: [Object, String],
        required: true
      },
      optGroupId: {
        type: Number,
        default: 1,
        required: false
      },
      hasGuide: {
        type: Boolean,
        default: false
      },
      forcedVariant: {
        type: String,
        default: null,
        required: false
      },
      isMobile: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        selectedProduct: {
          product: '',
          options: {},
          quantity: 1
        },
        showGuide: false
      }
    },

    computed: {
      /**
       * Returns the product's size option
       *
       * @return Array
       */
      sizeOption: function () {
        let sizeOption = ''
        if (this.product && this.product.options && this.product.options.length) {
          sizeOption = this.product.options.find(
            (option) => option.code === `${this.product.code}-size`
          )
        }
        return sizeOption
      },

      /**
       * Returns the product's size
       *
       * @return Object
       */
      productSizes: function () {
        let sizes = {
          standard: {},
          other: {}
        }

        if (this.sizeOption) {
          sizes.standard = this.sizeOption.values.filter((option) => option.optgroup === 1)
          sizes.other = this.sizeOption.values.filter((option) => option.optgroup !== 1)
        }
        return sizes
      },

      /**
       * Returns the overridden variant if set
       *
       * @return String
       */
      variantToSelect: function () {
        if (this.$props.forcedVariant) {
          return this.$props.forcedVariant
        } else if (this.$route.query.variant) {
          return this.$route.query.variant
        } else {
          return ''
        }
      }
    },

    watch: {
      /**
       * Emits an event on product change
       */
      selectedProduct: {
        handler(newValue) {
          this.$emit('product-changed', newValue)
        },
        deep: true
      },
      product: {
        handler() {
          this.setSelectedProduct()
        },
        immediate: true,
        deep: true
      }
    },

    beforeDestroy() {
      this.showGuide = false
    },

    methods: {
      /**
       * Returns the class values for select component
       *
       * @param  string code
       *
       * @return string
       */
      getSelectorClass: function (code) {
        return code === `${this.product.code}-size` ? 'col-9' : 'col-12'
      },

      /**
       * Sets the selected product in a product collection
       *
       * @param String product
       */
      setSelectedProduct: function () {
        try {
          this.selectedProduct.product = this.product.code
          this.selectedProduct.options = {}
          if (this.product && this.product.options && this.product.options.length) {
            for (var i = this.product.options.length - 1; i >= 0; i--) {
              const option = this.product.options[i]
              this.$set(
                this.selectedProduct.options,
                option.code,
                this.getOptionDefaultValue(option)
              )
            }
          }
        } catch (e) {
          console.log(e)
        }
      },

      /**
       * Returns the default value for the given option
       *
       * @param Object option Product option to parse
       *
       * @return Object
       */
      getOptionDefaultValue: function (option) {
        let defaultOption
        if (option && option.values.length) {
          if (option.code.indexOf('color') === -1 || this.$props.optGroupId === 1) {
            const defaultValue = this.variantToSelect
              ? this.variantToSelect
              : option.defaultOptionValue
            defaultOption = this.findDefaultOption(option, defaultValue)
          } else {
            // Capsule Collection specific
            defaultOption = option.values.find((value) => value.optgroup === this.$props.optGroupId)
          }

          return defaultOption
            ? defaultOption.code
            : this.findDefaultOption(option, option.defaultOptionValue).code
        }
      },

      /**
       * Return the default option
       *
       * @param  Object option
       * @param  String defaultValue
       *
       * @return Object
       */
      findDefaultOption: function (option, defaultValue) {
        return option.values.find((value) => value.code === defaultValue)
      },

      /**
       * Returns the variant's price for a given size
       * of a product
       *
       * @param String size
       *
       * @return Number
       */
      getVariantPriceBySize: function (size) {
        if (!this.product.variants || !this.product.variants.length) {
          return ''
        }

        let variant = ''
        let sizeCode = size
        if (size.indexOf('_') !== -1) sizeCode = size.split('_')[1] // Sylius has two naming conventions
        if (this.$props.optGroupId > 1) {
          // Collection products
          variant = [...this.product.variants]
            .reverse()
            .find((variant) => variant.code.indexOf(sizeCode) !== -1)
        } else {
          variant = this.product.variants.find((variant) => variant.code.indexOf(sizeCode) !== -1)
        }

        return variant ? `${variant.price / 100}€` : ''
      },

      /**
       * Returns the help text for the given option
       *
       * @param  Object option
       *
       * @return String
       */
      getOptionHelpText: function (option) {
        const optionCode = this.selectedProduct.options[option]
        const optionValues = this.product.options.find(
          (productOption) => productOption.code === option
        ).values

        return optionValues.find((value) => value.code === optionCode).help
      },

      /**
       * Emits an event if the selected product option
       * entails a slide change
       *
       * @param String code Product option's code
       */
      changeSlide: function (code) {
        if (Object.keys(this.$options.codeToSlide).indexOf(code) !== -1) {
          this.$nuxt.$emit('CHANGE_SLIDE', this.$options.codeToSlide[code])
        }
      },

      /**
       * Hide and show the guide
       *
       * @return Boolean
       */
      toggleGuide: function () {
        this.showGuide = !this.showGuide
      }
    }
  }
</script>

<style lang="scss" scoped>
  @media screen and (max-width: $size-md) {
    .colors {
      & /deep/ .form-color:first-of-type {
        margin-left: 0 !important;
      }
    }
  }
</style>
