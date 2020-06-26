<template>
  <select :id="name" :ref="name" :value="value" class="form-select" :name="name" @change="$emit('update:value', $event.target.value)">
    <slot />
  </select>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'change'
    },

    props: {
      name: {
        type: String,
        required: true,
        default: null
      },
      value: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.form-select {
  border-color: $border-color;
  border-radius: 0;
  border-width: $border-width-lg;
  height: 2rem;

  &:valid {
    border-color: $field-color;
  }

  &:focus {
    box-shadow: 0 0 0 .1rem transparentize($primary-color, .8);
  }

  &:not([multiple]):not([size]) {
    background: $light-color url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEpIiBzdHJva2U9IiMyMDI0NDciIHN0cm9rZS13aWR0aD0iLjkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PHBhdGggZD0iTS4xNS4yMjVsMi45NDcgNC40Mk01Ljk0Ny40NUwzIDQuODciLz48L2c+PC9zdmc+') no-repeat right .35rem center / .4rem .5rem;
    background-size: .6rem;
  }
}
</style>
