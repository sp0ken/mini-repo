<template>
  <div class="col-12 columns">
    <div class="social-bloc columns col-12 column col-mx-auto">
      <div
        v-lazy:background-image="
          `https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:120:600/v1/products/${productSlug}/social/social-1.jpg`
        "
        class="social social-item-1"
      ></div>
      <div
        v-lazy:background-image="
          `https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:120:300/v1/products/${productSlug}/social/social-2.jpg`
        "
        class="social social-item-2"
      ></div>
      <div
        v-lazy:background-image="
          `https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:120:300/v1/products/${productSlug}/social/social-3.jpg`
        "
        class="social social-item-3 hide-sm"
      ></div>
      <div
        v-lazy:background-image="
          `https://res.cloudinary.com/dgodjz1pn/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto:120:600/v1/products/${productSlug}/social/social-4.jpg`
        "
        class="social social-item-4"
      ></div>
      <div class="social social-item-5 show-sm text-center d-flex flex-center flex-column">
        <a
          :href="$t('social.instagram-link')"
          class="text-uppercase text-bold h5 pt-2 lp-15"
          target="_blank"
          @click="$trackLink(`${productSlug}-social-block`, 'instagram')"
          >{{ $t('social.instagram') }}</a
        >
      </div>
    </div>
    <div class="col-2 column col-ml-auto py-2 text-right hide-sm">
      <a
        :href="$t('social.instagram-link')"
        class="text-uppercase text-bold h5 lp-15"
        target="_blank"
        @click="$trackLink(`${productSlug}-social-block`, 'instagram')"
        >{{ $t('social.instagram') }}</a
      >
    </div>
  </div>
</template>

<script>
  export default {
    i18n: {
      messages: {
        fr: {
          social: {
            'instagram-link': 'https://instagram.com/tediber_fr',
            'instagram': '@tediber_fr'
          }
        }
      }
    },

    props: {
      productSlug: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .social-bloc {
    display: grid;
    grid-column-gap: $unit-4;
    grid-row-gap: $unit-2;
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-rows: repeat(2, 1fr);
    height: 385px;

    .social {
      background-position: center center;
      background-size: cover;
    }

    & .social-item-1 {
      grid-area: 1 / 1 / 3 / 2;
    }

    & .social-item-2 {
      grid-area: 1 / 2 / 2 / 3;
    }

    & .social-item-3 {
      grid-area: 2 / 2 / 3 / 3;
    }

    & .social-item-4 {
      grid-area: 1 / 3 / 3 / 4;
    }
  }

  @media (max-width: $size-sm) {
    .social-bloc {
      grid-row-gap: $unit-4;
      grid-template-columns: repeat(2, 1fr);

      & .social-item-1,
      & .social-item-2,
      & .social-item-3,
      & .social-item-4 {
        grid-area: unset;
      }

      & .social-item-5 {
        display: flex !important;

        & a {
          font-size: $unit-5;
          padding-top: $unit-1;
        }

        & .ted-rating {
          justify-content: center;
          margin-bottom: $unit-1;
        }
      }
    }
  }
</style>
