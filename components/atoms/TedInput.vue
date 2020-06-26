<template>
  <input
    :id="name"
    :value="value"
    class="form-input"
    :type="type"
    :name="name"
    :autocomplete="autocomplete"
    min="0"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
        default: null
      },
      value: {
        type: [String, Number, Object],
        required: true
      },
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      autocomplete: {
        type: String,
        required: false,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-input {
    border-radius: 0;
    border-width: $border-width-lg;
    height: 2rem;

    &:valid {
      border-color: $field-color;
    }

    &:focus {
      box-shadow: 0 0 0 0.1rem transparentize($primary-color, 0.8);
    }
  }

  @media (max-width: $size-lg) {
    input[type='number'] {
      -moz-appearance: textfield;
      text-align: center;
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
  }
</style>
