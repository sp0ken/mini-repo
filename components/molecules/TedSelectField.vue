<template>
  <div class="form-group">
    <ted-label :name="name" :class="labelClass">
      <slot name="label"></slot>
    </ted-label>

    <div :class="[dataClass, name]" class="select-wrapper">
      <ted-select
        :value.sync="valueData"
        :name="name"
        :class="selectClass"
        @update:value="updateData"
      >
        <slot name="options"></slot>
      </ted-select>
    </div>

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
        type: [String, Object],
        required: true
      },
      labelClass: {
        type: String,
        required: false,
        default: ''
      },
      selectClass: {
        type: String,
        required: false,
        default: ''
      }
    },

    data() {
      return {
        valueData: this.value,
        dataClass: this.value
      }
    },

    methods: {
      updateData: function (updatedValue) {
        this.$emit('update:value', updatedValue)
        this.dataClass = updatedValue
      }
    }
  }
</script>

<style lang="scss" scoped>
  .select-wrapper {
    position: relative;
  }
</style>
