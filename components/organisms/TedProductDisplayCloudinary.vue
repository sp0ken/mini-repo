<template>
  <div class="columns product-display">
    <ted-product-slider-cloudinary
      :product-slug="productSlug"
      :number-of-slides="numberOfSlides"
    ></ted-product-slider-cloudinary>

    <div class="col-11 hide-md col-mx-auto d-grid thumbnails">
      <div v-for="i in numberOfSlides" :key="i" class="c-hand thumbnail m-2" @click="setSlide(i)">
        <img
          v-lazy="
            `https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:50:200/v1/products/${productSlug}/slider/slide-${i}-square`
          "
          class="img-responsive img-fit-cover"
          :alt="$t(`product-display.alt.${productSlug}${satSize}.slide-${i}-thumb`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      productSlug: {
        type: String,
        required: true
      },
      numberOfSlides: {
        type: Number,
        required: false,
        default: 1
      },
      satSize: {
        type: String,
        required: false,
        default: ''
      }
    },

    methods: {
      setSlide: function (slide) {
        this.$nuxt.$emit('CHANGE_SLIDE', slide)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-display {
    align-content: start;

    & /deep/ .flickity-page-dots {
      bottom: 4vh;
      position: absolute;
    }

    & .thumbnails {
      grid-template-columns: repeat(auto-fit, minmax(16.66667%, 1fr));
    }
  }
</style>
