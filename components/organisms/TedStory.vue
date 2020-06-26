<template>
  <div class="story bg-primary columns p-10">
    <div class="col-6 col-sm-12 column pr-5 pt-5">
      <div class="col-10 col-mx-auto column show-sm image mb-5">
        <slot name="image" />
      </div>

      <h2 class="h2 mt-0 text-center text-uppercase zigzagdown-reverse-white">
        <slot name="title">{{ $t('title.story') }}</slot>
      </h2>

      <p class="h5 gill-regular">
        <slot name="excerpt" />
      </p>

      <div class="divider hide-sm">&nbsp;</div>
    </div>

    <div class="col-6 column pl-5 pt-5 hide-sm text-center">
      <slot name="image" />
    </div>

    <div class="col-12 column body mt-5" :class="{ expanded: displayStory }">
      <slot name="body" />
    </div>

    <div class="expander c-hand show-sm p-relative col-12" @click="toggleStory"></div>
  </div>
</template>

<script>
  export default {
    i18n: {
      messages: {
        fr: {
          title: {
            story: 'L’Incroyable histoire'
          }
        }
      }
    },

    data() {
      return {
        displayStory: false
      }
    },

    methods: {
      /**
       * Display the "story" section of the product
       */
      toggleStory: function() {
        this.displayStory = !this.displayStory
      }
    }
  }
</script>

<style lang="scss" scoped>
  img {
    margin-left: auto;
    margin-right: auto;
    max-height: 12rem;
    width: auto;
  }

  .divider {
    margin-left: -#{$unit-4};
  }

  .body {
    column-count: 2;
    column-gap: 2rem;
  }

  @media screen and (max-width: $size-sm) {
    .story {
      margin-top: 6rem !important;

      .pr-5 {
        padding-right: unset;
      }

      .image {
        margin-top: -4rem;
      }

      .body {
        column-count: 1;
        max-height: 0;
        overflow-y: hidden;
        transition: max-height 0.25s ease-out;

        &.expanded {
          margin-bottom: 2rem;
          max-height: inherit;
          overflow-y: inherit;

          & ~ .expander::after {
            bottom: 0;
            left: 43%;
            transform: rotate(-90deg);
          }
        }
      }

      & .expander {
        &::after {
          bottom: -1rem;
          color: $grey-color;
          content: '〉';
          font-size: 2rem;
          left: 40%;
          position: absolute;
          transform: rotate(90deg);
          transition: transform 0.25s ease-out;
        }

        &:hover::after {
          color: $light-color;
        }
      }
    }
  }
</style>
