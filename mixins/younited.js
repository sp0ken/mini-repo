export default {
  methods: {
    /**
    * Calculates the monthly payments
    * for the credit payment option
    *
    * @return Number
    */
    monthlyPayment: function (amount)
    {
      const duration = 12
      const rate = 9.99 / 100

      // Younited formula

      let result =
        (amount * (Math.pow(1 + rate, 1 / 12) - 1)) / (1 - Math.pow(1 + rate, -duration / 12))

      // Need toFixed to match with Younited formula
      result = result.toFixed(2)

      return result
    },

    /**
    * Check if price is available for Younited
    *
    * @return Boolean
    */
    matchYounitedCriteria: function (amount)
    {
      return (amount >= 300 && amount <= 2000) ? true : false
    }
  }
}