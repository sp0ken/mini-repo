<template>
  <main>
    <section class="columns product-choice mt-5">
      <h1
        class="gill-regular text-uppercase text-center h3 show-md my-2 col-12 column lp-25"
        v-html="$t(`${packCodeFormated}.product-display.title.incredible-mattress`)"
      ></h1>

      <ted-product-display-cloudinary
        product-slug="mattress"
        :number-of-slides="5"
        :sat-size="variantSat"
        class="col-8 col-md-12 column"
      ></ted-product-display-cloudinary>

      <div class="product-panel col-4 col-md-12 column hide-sm">
        <div class="panel-header p-1">
          <div class="panel-title text-center lp-25">
            <span
              class="text-uppercase h2 mt-0 mb-2"
              v-html="$t(`${packCodeFormated}.product-display.title.incredible-mattress`)"
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

        <div class="panel-body my-2">
          <no-ssr>
            <p
              v-if="$i18n.locale === 'fr'"
              class="mb-0"
              v-html="$t(`${packCodeFormated}.product-display.text.incredible-mattress`)"
            ></p>
            <div v-if="$i18n.locale === 'fr'" class="popover popover-bottom c-help">
              <p
                class="text-bold"
                v-html="$t(`${packCodeFormated}.product-display.text.choice`)"
              ></p>

              <div class="popover-container">
                <div class="card bg-light">
                  <div
                    class="card-body"
                    v-html="$t(`${packCodeFormated}.product-display.text.choice-details`)"
                  ></div>
                  <cld-image
                    secure="true"
                    public-id="site/icons/UFC_horizontal"
                    client-hints="true"
                    lazy
                    placeholder="lqip"
                    class="col-5 col-mx-auto"
                  >
                    <cld-transformation
                      width="auto:50:200"
                      crop="scale"
                      quality="auto"
                      dpr="auto"
                      sizes="100vw"
                      fetchFormat="auto"
                    ></cld-transformation>
                  </cld-image>
                </div>
              </div>
            </div>

            <div v-if="$wait.waiting('fetch.product')" class="loading">&nbsp;</div>
            <div v-else>
              <ted-product-selector
                :forced-variant="variantSat"
                :product="product"
                :has-guide="false"
                @product-changed="setSelectedProduct"
              ></ted-product-selector>

              <template v-if="$i18n.locale === 'fr'">
                <div class="h5 addons">{{
                  $t(`${packCodeFormated}.product-display.title.addons`)
                }}</div>
                <ted-checkbox :checked.sync="hasMattressReturn" name="mattressReturn">
                  {{
                    $t(`${packCodeFormated}.product-display.label.mattress-return`, {
                      returnPrice: $options.returnPrice
                    })
                  }}
                  <span
                    class="tooltip text-warning"
                    :data-tooltip="
                      $t(`${packCodeFormated}.product-display.tooltip.product-return-terms`)
                    "
                    >ⓘ</span
                  >
                </ted-checkbox>
                <ted-checkbox
                  v-if="addons['mattress-protector'].code"
                  :checked.sync="addons['mattress-protector'].selected"
                  name="mattressProtector"
                >
                  {{
                    $t(`${packCodeFormated}.product-display.label.mattress-protector`, {
                      addonPrice: addons['mattress-protector'].price
                    })
                  }}
                </ted-checkbox>
              </template>
            </div>
          </no-ssr>

          <div class="col-12 divider">&nbsp;</div>

          <div
            class="col-12 col-mx-auto my-2 text-center"
            :class="{ loading: $wait.waiting('fetch.*') }"
          >
            <div v-show="selectedProductPrice > 0" class="product-price my-0 py-1">
              <span class="h2">{{ selectedProductPrice }}€</span>
              <small
                class="tooltip"
                :data-tooltip="
                  $t(`${packCodeFormated}.product-display.text.eco-tax`, {
                    tax: selectedVariant.ecotax / 100 || 0
                  })
                "
                >ⓘ</small
              >
              <small
                v-if="matchYounitedCriteria(selectedProductPrice) && !$wait.waiting('fetch.*')"
                class="younited-details"
                v-html="
                  $t(`${packCodeFormated}.product-display.text.price-monthly`, {
                    monthlyPrice: $n(monthlyPayment(selectedProductPrice), {
                      locale: 'fr-FR',
                      maximumFractionDigits: 2
                    })
                  })
                "
              ></small>
            </div>
            <div v-show="product && selectedProductPrice === 0" class="product-price my-0 py-1">
              <span class="h3">{{
                $t(`${packCodeFormated}.product-display.text.out-of-stock`)
              }}</span>
            </div>
          </div>

          <div v-if="product" class="col-12 column text-center">
            <button
              :title="$t(`${packCodeFormated}.product-display.button.add-to-cart`)"
              class="btn btn-xl btn-secondary text-uppercase lp-25"
              :class="{ disabled: !selectedVariant }"
              :disabled="!selectedVariant"
              @click.prevent="addToCart"
            >
              <svg
                v-show="$wait.waiting('cart.add')"
                id="logo-ours"
                height="32"
                width="40"
                viewBox="0 0 64 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" stroke="#fff" stroke-miterlimit="10">
                  <g stroke-linecap="round">
                    <path
                      d="m39.503 21.12c.158.284.574 1.722.94 3.161.637 2.517 1.23 5.053 1.905 7.564.637 2.385 1.539 4.682 1.792 7.186.145 1.451-.568 3.369-1.243 4.644l-.038.069-.441.77c-.757 1.42-1.482 2.556-2.505 3.761-.391.46-.87.744-1.508.852a20.703 20.703 0 0 1 -3.791.29 5.645 5.645 0 0 0 -.751.013c-.58.062-2.978-.038-3.564.006"
                      stroke-width=".631"
                    />
                    <g stroke-width=".946">
                      <path
                        d="m60.41 32.532c.139 1.786.184 1.615 0 2.499-.132.618-.978 1.198-1.501 1.495-2.202 1.242-4.391 2.498-6.719 3.52-2.959 1.3-4.731 1.925-6.706 2.82l-2.474.966"
                        stroke-linejoin="bevel"
                      />
                      <path
                        d="m41.579 2.913c2.529-.088 4.744.145 7.293.359.978.076 2.239.354 3.236.625.277.076.562.132.864.334.58-.473.978-1.091 1.539-1.546.675-.536 1.356-.662 2.133-.359.782.296 1.508.707 2.037 1.363.492.612.523 1.388.523 2.113-.006 1.085-.327 2.082-1.116 2.883-.593.593-1.129 1.249-1.767 1.792-.252.221-.259.454-.189.625.89 2.359 2.89 9.47 4.277 21.431"
                      />
                      <path
                        d="m5.997 8.982c-.851-.864-1.912-1.596-2.593-2.637-.662-1.029-.927-1.956-.138-3.047.883-1.23 1.772-2.341 3.407-2.675.833-.17 1.394-.063 1.899.562.605.745 1.192 1.23 2.347 1.211 1.559-.025 3.129.038 4.694.082 2.75.069 5.501.17 8.252.214 2.852.051 14.857.12 17.715.221"
                      />
                    </g>
                  </g>
                  <path
                    d="m39.503 21.12c-.416-.669-.788-1.407-1.463-1.861-.833-.562-1.748-.593-2.663-.75-2.454-.423-4.902-.164-7.35-.051-.864.038-1.489.492-2.063 1.186-1.426 1.735-1.823 3.861-2.397 5.918-.543 1.943-1.066 3.886-1.596 5.829-.53 1.949-1.161 3.867-1.552 5.842-.208 1.079-.139 2.233.328 3.325.593 1.413 1.312 2.952 2.189 4.265.214.334.448.656.688.959.574.656 1.685 1.842 2.315 2.252.202.195.625.372.953.543 1.098.58 2.208.927 3.407.857"
                    stroke-width=".631"
                  />
                  <path
                    d="m4.124 17.089c-.354 1.122-2.278 11.576-2.499 12.719-.265 1.368-.479 2.75-.486 4.157-.013 1.444.441 2.467 1.754 3.255 2.744 1.646 6.447 3.451 8.34 4.146 3.685 1.337 9.463 3.154 11.514 3.583m-16.75-35.967c-.328 1.287-.707 2.568-.971 3.867-.284 1.419-.637 2.82-.902 4.24m28.288 29.436c2.107 0 2.051.265 2.713-.221 1.375-1.003 2.624-2.587 3.747-3.772.423-.448 1.307-1.338 1.243-2.126-.113-1.445.101-2.139-.019-3.628-.082-1.016-.253-1.174-1.3-1.3-1.938-.239-3.88-.479-5.829-.574-2.839-.145-1.307-.214-4.467-.019-.801.051-1.608-.063-2.429.12-.637.145-.883.467-.972 1.021-.258 1.553-.41 3.11-.391 4.688.013.549.315.909.694 1.212 1.628 1.299 3.274 2.58 4.915 3.86.285.222.613.739 2.095.739z"
                    stroke-linecap="round"
                    stroke-width=".946"
                  />
                </g>
                <path
                  d="m39.755 21.459c.177-.246.857-.947.877-1.211.132-1.35 1.35-1.95 2.467-1.249.555.347.649.965.637 1.577-.006.625-.354 1.091-1.041 1.192-.808.113-1.413-.196-1.88-1.003-.505.618-.939 1.129-.675 2.063zm-15.577-1.943c0 .499.448.372 1.079.946l-.189.29c-.132-.139-.631-.53-.909-.593-.019.581-.492.934-.915 1.066-.593.183-1.161.221-1.703-.107-.505-.315-.581-.953-.511-1.489.272-1.93 3.148-1.381 3.148-.113z"
                  fill="#fff"
                />
              </svg>
              <span v-if="!$wait.waiting('cart.add')">{{
                $t(`${packCodeFormated}.product-display.button.add-to-cart`)
              }}</span>
            </button>
          </div>
        </div>

        <div class="panel-footer my-5">
          <div class="col-12 column">
            <ted-product-trust-badges :guarantee-years="10"></ted-product-trust-badges>
          </div>
        </div>
      </div>
    </section>

    <section class="product-story p-relative margin-top-simple">
      <ted-story class="col-9 col-md-12 col-mx-auto column mt-10">
        <template #title>{{ $t(`${packCodeFormated}.story.text.title`) }}</template>

        <template #excerpt>
          <span v-html="$t(`${packCodeFormated}.story.text.excerpt`)"></span>
        </template>

        <template #image>
          <cld-image
            secure="true"
            public-id="products/mattress/content/story"
            class="col-8 col-sm-12 col-mx-auto"
            client-hints="true"
            lazy
            placeholder="lqip"
            :alt="$t(`${packCodeFormated}.upsell.story.alt`)"
          >
            <cld-transformation
              width="auto:120:300"
              crop="scale"
              quality="auto"
              dpr="auto"
              sizes="100vw"
              fetchFormat="auto"
            ></cld-transformation>
          </cld-image>
        </template>

        <template #body>
          <span v-html="$t(`${packCodeFormated}.story.text.body`)"></span>
        </template>
      </ted-story>

      <div class="bottom-illu"></div>
    </section>
  </main>
</template>

<script>
  import younitedMixin from '~/mixins/younited.js'
  import productsMixin from '~/mixins/products.js'
  import reviewsMixin from '~/mixins/reviews.js'

  export default {
    flickityOptions: {
      selectedAttraction: 0.2,
      friction: 0.8,
      lazyLoad: true,
      prevNextButtons: false,
      pageDots: true,
      wrapAround: true,
      setGallerySize: true,
      watchCSS: true
    },
    leftSheets: ['guide', 'manufacture', 'materials', 'care', 'delivery', 'guarantee'],
    rightSheets: ['size', 'bed-frame', 'environment', 'recommanded', 'product-return', 'trial'],
    differences: ['delivery', 'experience', 'reviews'],

    mixins: [younitedMixin, productsMixin, reviewsMixin, networkMixin],

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

    async mounted() {
      await this.retrieveProduct('mattress')
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
        ],
        script: [
          {
            type: 'application/ld+json',
            json: {
              '@context': 'http://schema.org',
              '@type': 'Product',
              'name': this.$t(`${this.packCodeFormated}.meta.title`),
              'image': [
                'https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,q_auto,f_auto,w_auto:120:600/products/mattress/slider/slide-5-square.jpg',
                'https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,q_auto,f_auto,w_auto:120:1200/products/mattress/slider/slide-5.jpg'
              ],
              'description': this.$t(`${this.packCodeFormated}.meta.description`),
              'brand': 'Tediber',
              'gtin': '3760292711240',
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': 4.6,
                'bestRating': 5,
                'worstRating': 1,
                'ratingCount': 15162,
                'reviewCount': 15162
              },
              'offers': {
                '@type': 'AggregateOffer',
                'lowPrice': this.$t(`${this.packCodeFormated}.meta.lowprice`),
                'priceCurrency': 'EUR'
              }
            }
          },
          {
            type: 'application/ld+json',
            json: {
              '@context': 'http://schema.org',
              '@type': 'VideoObject',
              'name': this.$t(`${this.packCodeFormated}.meta.video-name`),
              'description': this.$t(`${this.packCodeFormated}.meta.video-description`),
              'thumbnailUrl': [
                `https://i.ytimg.com/vi/${this.$t(
                  `${this.packCodeFormated}.meta.video-id`
                )}/sddefault.jpg`,
                `https://i.ytimg.com/vi/${this.$t(
                  `${this.packCodeFormated}.meta.video-id`
                )}/mqdefault.jpg`,
                `https://i.ytimg.com/vi/${this.$t(
                  `${this.packCodeFormated}.meta.video-id`
                )}/hqdefault.jpg`
              ],
              'uploadDate': this.$t(`${this.packCodeFormated}.meta.video-upload-date`),
              'duration': this.$t(`${this.packCodeFormated}.meta.video-duration`),
              'contentUrl': `https://www.youtube.com/watch?v=${this.$t(
                `${this.packCodeFormated}.meta.video-id`
              )}`,
              'embedUrl': `https://www.youtube.com/embed/${this.$t(
                `${this.packCodeFormated}.meta.video-id`
              )}`
            }
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
