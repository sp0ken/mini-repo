<template>
  <label class="form-label" :for="name">
    <slot />
  </label>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: false,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-label {
    font-size: 1rem;
  }
</style>
