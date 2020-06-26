<template>
  <div class="form-group form-box">
    <input
      :id="name"
      type="checkbox"
      :name="name"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <label :class="{ disabled: disabled }" :for="name">
      <slot />
    </label>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },

    props: {
      name: {
        type: String,
        required: true
      },
      checked: {
        type: Boolean,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-box {
    position: relative;

    & label {
      &::before {
        background: $light-color;
        border: $border-width solid $primary-color;
        color: $primary-color;
        content: ' ';
        cursor: pointer;
        display: inline-block;
        height: 1rem;
        left: 0;
        margin-right: $unit-1;
        position: relative;
        text-align: center;
        top: 3%;
        width: 1rem;
      }

      &.disabled::before {
        border-color: $shadow-color;
        cursor: not-allowed;
      }
    }

    & input {
      clip: rect(0, 0, 0, 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      position: absolute;
      width: 1px;

      &:checked + label:not(.disabled)::before,
      &:not(:checked) + label:not(.disabled):hover::before {
        content: '✓';
      }

      &:not(:checked) + label:hover::before {
        color: transparentize($primary-color, 0.7);
      }

      &:focus + label::before {
        box-shadow: 0 0 0 0.1rem rgba(32, 36, 71, 0.2);
      }
    }
  }
</style>
