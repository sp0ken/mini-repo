<template>
  <footer>
    <div class="columns col-gapless">
      <div class="col-sm-12 col-lg-6 col-6 column">
        <span class="d-flex text-light bg-dark p-1 my-2">{{ $t('footer.title.address') }}</span>
      </div>
      <div class="col-sm-12 col-lg-6 col-3 column">
        <span class="d-flex text-light bg-dark p-1 my-2">
          <a :href="$t('footer.url.phone')" class="text-light">{{ $t('footer.title.phone') }}</a>
        </span>
      </div>
      <div class="col-sm-12 col-lg-12 col-3 column">
        <span class="d-flex text-light bg-dark p-1 my-2">
          <a :href="$t('footer.url.email')" class="text-light">{{ $t('footer.title.email') }}</a>
        </span>
      </div>
      <div class="col-sm-12 col-lg-6 col-9 column">
        <p class="text-payment ml-2 mb-0">{{ $t('footer.text.payment') }}</p>
        <cld-image
          v-if="$i18n.locale === 'fr'"
          secure="true"
          public-id="site/footer/cb"
          lazy
          client-hints="true"
          placeholder="lqip"
          :alt="$t('footer.alt.cb')"
          class="mx-2 d-inline-block"
        >
          <cld-transformation
            width="auto:50:120"
            crop="scale"
            quality="auto"
            dpr="auto"
            sizes="100vw"
            fetchFormat="auto"
          ></cld-transformation>
        </cld-image>
        <img
          v-lazy="`https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/visa.svg`"
          :alt="$t('footer.alt.visa')"
          class="mx-2"
        />
        <img
          v-lazy="`https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/mastercard.svg`"
          :alt="$t('footer.alt.mastercard')"
          class="mx-2"
        />
        <img
          v-lazy="`https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/amex.svg`"
          :alt="$t('footer.alt.american-express')"
          class="mx-2"
        />
        <img
          v-lazy="`https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/3dsecure.svg`"
          :alt="$t('footer.alt.3D-secure')"
          class="mx-2"
        />
        <cld-image
          secure="true"
          public-id="site/footer/paypal"
          lazy
          client-hints="true"
          placeholder="lqip"
          :alt="$t('footer.alt.paypal')"
          class="mx-2 d-inline-block"
        >
          <cld-transformation
            width="auto:50:120"
            crop="scale"
            quality="auto"
            dpr="auto"
            sizes="100vw"
            fetchFormat="auto"
          ></cld-transformation>
        </cld-image>
        <img
          v-lazy="`https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/younited.svg`"
          :alt="$t('footer.alt.younited')"
          class="mx-2"
        />
      </div>
      <div class="col-sm-12 col-lg-6 col-3 column">
        <nuxt-link
          v-if="$i18n.locale !== 'fr'"
          class="btn btn-link col-2"
          :to="switchLocalePath('fr')"
        >
          <img
            v-lazy="`https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/ours-france.svg`"
            :alt="$t('footer.alt.french')"
          />
        </nuxt-link>
        <nuxt-link
          v-if="$i18n.locale !== 'es'"
          class="btn btn-link col-2"
          :to="switchLocalePath('es')"
        >
          <img
            v-lazy="
              `https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/ours-espagne.svg`
            "
            :alt="$t('footer.alt.spanish')"
          />
        </nuxt-link>
        <nuxt-link
          v-if="$i18n.locale !== 'it'"
          class="btn btn-link col-2"
          :to="switchLocalePath('it')"
        >
          <img
            v-lazy="`https://res.cloudinary.com/dgodjz1pn/image/upload/site/footer/ours-italie.svg`"
            :alt="$t('footer.alt.italian')"
          />
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    i18n: {
      messages: {
        fr: require('~/locales/fr/TheFooter.json')
      }
    }
  }
</script>

<style lang="scss" scoped>
  img,
  .cld-image /deep/ img {
    max-height: 1.5rem;
    width: auto;
  }

  dt {
    & dl {
      margin: 0;
      & .btn-link {
        height: 1.5rem;
      }
    }
  }
</style>
