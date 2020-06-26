<template>
  <div class="form-group">
    <ted-label :class="labelClass" :name="name">
      <slot name="label"></slot>
    </ted-label>

    <ted-input
      :value.sync="valueData"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :class="inputClass"
      @update:value="$emit('update:value', valueData)"
    >
    </ted-input>

    <slot name="error"></slot>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'valueData',
      event: 'update'
    },

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
      },
      labelClass: {
        type: String,
        required: false,
        default: ''
      },
      inputClass: {
        type: String,
        required: false,
        default: ''
      }
    },

    data() {
      return {
        valueData: this.value
      }
    }
  }
</script>
