export default {
  computed: {
    /**
     * Returns the product's color option
     *
     * @return Array
     */
    colorOptions: function () {
      let colorOptions = {}
      if (this.product && this.product.options && this.product.options.length) {
        colorOptions = this.product.options.filter((option) => {
          return option.code.indexOf('color') !== -1
        })
      }
      return colorOptions
    }
  },

  methods: {
    getColorValues: function (code, optGroupId) {
      return this.colorOptions
        .find((option) => option.code === code)
        .values.filter((color) => color.optgroup === optGroupId)
    },

    /**
     * Returns a properly build "color" object
     *
     * @param  Object color
     *
     * @return Object
     */
    getColorObject: function (color) {
      return {
        name: color.code,
        label: color.value,
        code: this.getColorCode(color.code)
      }
    },

    /**
     * Returns a hex color code based on the backend code
     *
     * @param  string color
     *
     * @return string
     */
    getColorCode: function (color) {
      if (color.toLowerCase().endsWith('vanille')) return '#EFEAD7'
      if (color.toLowerCase().endsWith('terracotta')) return '#C75F4E'
      if (color.toLowerCase().endsWith('vert')) return '#236952'
      if (color.toLowerCase().endsWith('blancgf')) return '#ffffff'
      if (color.toLowerCase().endsWith('bleuzp')) return '#7683A0'
      if (color.toLowerCase().endsWith('bleuml')) return '#202447'
      if (color.toLowerCase().endsWith('grisle')) return '#727578'
      if (color.toLowerCase().endsWith('bleu')) return '#1d213c'
      if (color.toLowerCase().endsWith('roui')) return '#882e1b'
      if (color.toLowerCase().endsWith('crem')) return '#DECDBF'
      if (color.toLowerCase().endsWith('gris')) return '#61605f'
      if (color.toLowerCase().endsWith('bois')) return '#E0CEC7'
      if (color.toLowerCase().endsWith('noir')) return '#34303A'

      return '#ffffff'
    }
  }
}
