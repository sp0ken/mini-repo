<template>
  <div class="form-color">
    <input
      :id="`${name}${isMobile ? '-mobile' : ''}`"
      type="radio"
      :name="group"
      :value="color.name"
      :checked="$attrs.value === color.name"
      :class="{ checked: $attrs.value === color.name }"
      @change="$emit('update:value', $event.target.value)"
    />
    <label
      class="tooltip"
      :class="{ slotted: $slots.color }"
      :data-tooltip="color.label"
      :for="`${name}${isMobile ? '-mobile' : ''}`"
      :style="{ '--background-color': color.code }"
    >
      <slot name="color" />
      <slot name="text" />
    </label>
  </div>
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
        required: true
      },
      group: {
        type: String,
        required: false,
        default: 'colors'
      },
      color: {
        type: Object,
        required: true,
        default: () => {}
      },
      isMobile: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    display: inline-block;

    & input {
      clip: rect(0, 0, 0, 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      position: absolute;
      width: 1px;

      &:checked,
      &.checked {
        & ~ label {
          color: $primary-color;
          transform: scale(1.15);

          &:not(.slotted)::before {
            border-color: $primary-color;
          }
        }
      }

      & ~ label {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        text-align: center;
        transition: transform 100ms ease;
        width: 1.5rem;

        & img {
          height: 1.5rem;
          margin-bottom: $unit-2;
          width: 1.5rem;
        }

        &:not(.slotted)::before {
          background-position: center;
          background-repeat: no-repeat;
          background-color: var(--background-color);
          border: $border-width-lg solid $field-color;
          border-radius: 50%;
          content: ' ';
          display: inline-block;
          height: 1.5rem;
          margin-bottom: $unit-2;
          width: 1.5rem;
        }

        &:hover {
          color: $primary-color;

          &::before {
            border-color: $primary-color;
          }
        }
      }
    }
  }

  @media screen and (max-width: $size-md) {
    div {
      & input {
        &:checked {
          & ~ label {
            transform: scale(1.15) translateX(6px);
          }
        }
      }
    }
  }
</style>
