<template>
  <main>
    <section class="columns product-choice mt-5">
      <h1
        class="gill-regular text-uppercase text-center h3 show-md my-2 col-12 column lp-25"
        v-html="$t(`${packCodeFormated}.product-display.title.dynamic-title`)"
      ></h1>

      <ted-product-display-cloudinary
        product-slug="mini-repo"
        :number-of-slides="5"
        :sat-size="variantSat"
        class="col-8 col-md-12 column"
      ></ted-product-display-cloudinary>

      <div class="product-panel col-4 col-md-12 column hide-sm">
        <div class="panel-header p-1">
          <div class="panel-title text-center lp-25">
            <span
              class="text-uppercase h2 mt-0 mb-2"
              v-html="$t(`${packCodeFormated}.product-display.title.dynamic-title`)"
            ></span>
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
    leftSheets: ['guide', 'manufacture', 'materials', 'care', 'delivery', 'guarantee'],
    rightSheets: ['size', 'bed-frame', 'environment', 'recommanded', 'product-return', 'trial'],
    differences: ['delivery', 'experience', 'reviews'],

    mixins: [reviewsMixin],

    props: {
      variantSat: {
        type: String,
        required: false,
        default: 'TED160200'
      },
      packCode: {
        type: String,
        required: false,
        default: 'sat_matelas-160x200'
      }
    },

    i18n: {
      messages: {
        fr: require(`~/locales/fr/mattress-sat.json`)
      }
    },

    computed: {
      /** Better format for pack code */
      packCodeFormated: function () {
        return this.$props.packCode.split('_')[1]
      }
    },

    head() {
      return {
        title: this.$t(`${this.packCodeFormated}.meta.title`),
        meta: [
          {
            hid: 'og:title',
            name: 'og:title',
            property: 'og:title',
            content: this.$t(`${this.packCodeFormated}.meta.title`)
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            property: 'twitter:title',
            content: this.$t(`${this.packCodeFormated}.meta.title`)
          },
          {
            hid: 'description',
            name: 'description',
            content: this.$t(`${this.packCodeFormated}.meta.description`)
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: this.$t(`${this.packCodeFormated}.meta.description`)
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            property: 'twitter:description',
            content: this.$t(`${this.packCodeFormated}.meta.description`)
          },
          {
            hid: 'og:image',
            name: 'og:image',
            property: 'og:image',
            content:
              'https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,q_auto,f_auto,w_auto:120:600/products/mattress/slider/slide-1-square.jpg'
          },
          {
            hid: 'twitter:image',
            name: 'twitter:image',
            property: 'twitter:image',
            content:
              'https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,q_auto,f_auto,w_auto:120:600/products/mattress/slider/slide-1-square.jpg'
          },
          {
            hid: 'robots',
            name: 'robots',
            content: this.$t(`${this.packCodeFormated}.meta.robots`)
          }
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

    .our-clients {
      margin-top: 2rem;
    }
  }
</style>
