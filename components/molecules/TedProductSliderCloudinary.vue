<template>
  <div
    class="slider col-11 col-sm-12 col-mx-auto column"
    :class="{ imageLoaded: isImageLoaded }"
    :style="{
      backgroundImage: `url(https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,q_auto,f_auto,w_5/e_blur,c_scale/v1/products/${productSlug}/slider/slide-1)`
    }"
  >
    <client-only>
      <flickity ref="flickity" :options="$options.flickityOptions">
        <div v-for="i in numberOfSlides" :key="i" class="slide">
          <picture
            v-if="i >= currentSlide - 1 && i <= currentSlide + 1"
            class="img-fit-cover col-12"
          >
            <source
              media="(min-width: 961px)"
              :srcset="`https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:120:1500/v1/products/${productSlug}/slider/slide-${i}`"
            />
            <source
              media="(orientation: portrait) and (max-width : 840px)"
              :srcset="`https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:120:600/v1/products/${productSlug}/slider/slide-${i}-square`"
            />
            <source
              media="(orientation: landscape) and (max-width : 840px)"
              :srcset="`https://res.cloudinary.com/dgodjz1pn/image/upload/c_fill,g_auto:classic,dpr_auto,f_auto,q_auto,w_auto:120:1334,ar_16:9/v1/products/${productSlug}/slider/slide-${i}`"
            />
            <img
              class="img-fit-cover col-12"
              :src="`https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:120:1200/v1/products/${productSlug}/slider/slide-${i}`"
              :alt="$t(`product-display.alt.${productSlug}.slide-${i}`)"
              @load="imageLoaded"
            />
          </picture>
        </div>
      </flickity>
    </client-only>
  </div>
</template>

<script>
  export default {
    i18n: {
      messages: {
        fr: require('~/locales/fr/ProductDisplay.json')
      }
    },

    flickityOptions: {
      selectedAttraction: 0.2,
      friction: 0.8,
      prevNextButtons: true,
      pageDots: true,
      wrapAround: true,
      setGallerySize: true
    },

    props: {
      productSlug: {
        type: String,
        required: true
      },
      numberOfSlides: {
        type: Number,
        required: false,
        default: 1
      }
    },

    data() {
      return {
        currentSlide: 1,
        isImageLoaded: false
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.$refs.flickity.on('change', (index) => {
          this.currentSlide = index + 1
        })
      })
    },

    methods: {
      getCurrentSlide: function () {
        if (this.$refs.flickity) {
          return this.$refs.flickity.data('flickity').selectedIndex + 1
        }
      },

      imageLoaded: function () {
        this.isImageLoaded = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  $viewport-height: 500px;
  $viewport-height-xl: 650px;
  $viewport-height-sm-portrait: 350px;
  $viewport-height-sm-landscape: 250px;
  $viewport-height-md-portrait: 600px;
  $viewport-height-md-landscape: 450px;

  .slider {
    background-size: cover;
    min-height: $viewport-height;
    position: relative;

    &.imageLoaded {
      background: none !important;
    }

    & /deep/ .flickity-viewport {
      min-height: $viewport-height;

      & .slide {
        width: 100%; /* full width */
        height: auto; /* height of carousel */
      }
    }

    & /deep/ .flickity-page-dots .dot {
      opacity: 1;
    }

    & /deep/ .flickity-prev-next-button {
      top: calc(50% - 0.75rem);

      &.previous {
        left: -3%;
      }

      &.next {
        right: -3%;
      }
    }
  }

  @media (min-width: $size-2x) {
    .slider {
      min-height: $viewport-height-xl;

      & /deep/ .flickity-viewport {
        min-height: $viewport-height-xl;
      }
    }
  }

  @media (max-width: $size-md) and (orientation: portrait) {
    .slider {
      min-height: $viewport-height-md-portrait;

      & /deep/ .flickity-viewport {
        min-height: $viewport-height-md-portrait;

        & ~ .flickity-prev-next-button {
          display: none;
        }

        & .slide {
          width: 86%; /* full width */
          margin-right: $unit-2;
        }
      }
    }
  }

  @media (max-width: $size-md) and (orientation: landscape) {
    .slider {
      min-height: $viewport-height-md-landscape;

      & /deep/ .flickity-viewport {
        min-height: $viewport-height-md-landscape;

        & ~ .flickity-prev-next-button {
          display: none;
        }

        & .slide {
          width: 86%; /* full width */
          margin-right: $unit-2;
        }
      }
    }
  }

  @media (max-width: $size-sm) and (orientation: portrait) {
    .slider {
      min-height: $viewport-height-sm-portrait;

      & /deep/ .flickity-viewport {
        min-height: $viewport-height-sm-portrait;

        & ~ .flickity-prev-next-button {
          display: none;
        }

        & .slide {
          width: 86%; /* full width */
          margin-right: $unit-2;
        }
      }
    }
  }

  @media (max-width: $size-sm) and (orientation: landscape) {
    .slider {
      min-height: $viewport-height-sm-landscape;

      & /deep/ .flickity-viewport {
        min-height: $viewport-height-sm-landscape;

        & ~ .flickity-prev-next-button {
          display: none;
        }

        & .slide {
          width: 86%; /* full width */
          margin-right: $unit-2;
        }
      }
    }
  }
</style>
