<template>
  <button class="btn text-uppercase lp-15" :class="[`btn-${type}`, `btn-${size}`, {'loading': isLoading }]" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        required: false,
        default: 'primary'
      },
      size: {
        type: String,
        required: false,
        default: 'normal'
      },
      isLoading: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    &:hover {
      color: $light-color;
    }

    &.btn-light {
      &:hover {
        background-color: $primary-color;
        color: $light-color;
      }
    }

    &.btn-secondary {
      background-color: $secondary-color;
      border-color: $secondary-color;
      color: $light-color;
      height: unset;
      min-height: 1.8rem;
      white-space: pre-line;

      &:hover {
        background-color: lighten($secondary-color, 25);
        border-color: lighten($secondary-color, 25);
      }

      &.loading::after {
        border: .1rem solid $light-color;
        border-right-color: transparent;
        border-top-color: transparent;
      }
    }

    &.btn-lg {
      height: unset;
      min-height: 2rem;
    }

    &.btn-xl {
      font-size: 1.2rem;
      height: unset;
      min-height: 2.5rem;
      padding: $unit-4 $unit-5;
    }
  }
</style>
