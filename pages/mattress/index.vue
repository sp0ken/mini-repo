<template>
  <main>
    <section class="columns product-choice mt-5">
      <h1 class="gill-regular text-uppercase text-center h3 show-md my-2 col-12 column lp-25">
        {{ $t('mattress.product-display.title.normal-title') }}
      </h1>

      <ted-product-display-cloudinary
        product-slug="mini-repo"
        :number-of-slides="5"
        class="col-8 col-md-12 column"
      ></ted-product-display-cloudinary>

      <div class="product-panel col-4 col-md-12 column hide-sm">
        <div class="panel-header p-1">
          <div class="panel-title text-center lp-25">
            <span class="text-uppercase h2 mt-0 mb-2">{{
              $t('mattress.product-display.title.normal-title')
            }}</span>
          </div>
          <no-ssr>
            <ted-product-rating
              v-if="!$wait.waiting('fetch.products')"
              product-slug="mattress"
              :rating="getProductRating('mattress')"
              :review-count="getProductReviewCount('mattress')"
              class="h5 my-2"
            ></ted-product-rating>
          </no-ssr>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import reviewsMixin from '~/mixins/reviews.js'

  export default {
    mixins: [reviewsMixin],

    i18n: {
      messages: {
        fr: require('~/locales/fr/mattress.json')
      }
    },

    head() {
      return {
        title: this.$t('mattress.meta.title'),
        meta: [
          {
            hid: 'og:title',
            name: 'og:title',
            property: 'og:title',
            content: this.$t('mattress.meta.title')
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            property: 'twitter:title',
            content: this.$t('mattress.meta.title')
          },
          {
            hid: 'description',
            name: 'description',
            content: this.$t('mattress.meta.description')
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: this.$t('mattress.meta.description')
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            property: 'twitter:description',
            content: this.$t('mattress.meta.description')
          },
          {
            hid: 'og:image',
            name: 'og:image',
            property: 'og:image',
            content:
              'https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,q_auto,f_auto,w_auto:120:600/v1588595042/products/mattress/slider/slide-1-square.jpg'
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            property: 'twitter:image',
            content:
              'https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,q_auto,f_auto,w_auto:120:600/v1588595042/products/mattress/slider/slide-1-square.jpg'
          },
          { hid: 'robots', name: 'robots', content: this.$t('mattress.meta.robots') }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-choice {
    & .product-rating,
    & .addons {
      font-family: $base-font-family;
    }
  }

  .product-story {
    &::before {
      content: url('~assets/img/mattress/story-left.svg');
      left: -2%;
      position: absolute;
      top: 5rem;
    }

    &::after {
      content: url('~assets/img/mattress/story-right.svg');
      position: absolute;
      right: -1%;
      top: 13rem;
    }

    .bottom-illu {
      pointer-events: none;
      content: url('~assets/img/mattress/story-bottom.svg');
      position: absolute;
      bottom: -5%;
      right: 15%;
    }
  }

  @media (max-width: $size-sm) {
    .product-choice {
      margin-top: 5rem !important;
    }

    .product-story {
      & .story {
        margin-top: 4rem !important;
      }

      &::before {
        transform: scale(0.5);
        left: -40%;
      }

      &::after {
        transform: scale(0.5);
        right: -40%;
      }
    }
  }
</style>
