<template>
  <div class="columns">
    <div class="column text-center" :class="colClass">
      <ted-figure>
        <template #image>
          <img
            src="https://res.cloudinary.com/dgodjz1pn/image/upload/v1589374112/site/badges/trial.svg"
            :alt="$t('trust-badge.trial.alt.trial')"
          />
        </template>
        <template #caption>
          <span
            v-if="guaranteeYears < 1"
            v-html="$tc('trust-badge.trial.caption.short-trial')"
          ></span>
          <span
            v-else
            v-html="$tc('trust-badge.trial.caption.trial', 10, { years: guaranteeYears })"
          ></span>
        </template>
      </ted-figure>
    </div>
    <div class="column text-center" :class="colClass">
      <ted-figure>
        <template #image>
          <img
            src="https://res.cloudinary.com/dgodjz1pn/image/upload/v1589374112/site/badges/delivery.svg"
            :alt="$t('trust-badge.delivery.alt.delivery')"
          />
        </template>
        <template #caption>
          <span v-html="$t('trust-badge.delivery.caption.delivery')"></span>
        </template>
      </ted-figure>
    </div>
    <div class="column text-center" :class="colClass">
      <ted-figure>
        <template #image>
          <img
            src="https://res.cloudinary.com/dgodjz1pn/image/upload/v1589374112/site/badges/price.svg"
            :alt="$t('trust-badge.price.alt.price')"
          />
        </template>
        <template #caption>
          <span v-html="$t('trust-badge.price.caption.price')"></span>
        </template>
      </ted-figure>
    </div>
    <div
      v-if="$i18n.locale === 'fr'"
      class="column text-center popover popover-bottom c-help"
      :class="colClass"
    >
      <ted-figure>
        <template #image>
          <img
            src="https://res.cloudinary.com/dgodjz1pn/image/upload/v1589374112/site/badges/credit.svg"
            :alt="$t('trust-badge.credit.alt.credit')"
          />
        </template>
        <template #caption>
          <span v-html="$t('trust-badge.credit.caption.credit')"></span> ⓘ
        </template>
      </ted-figure>

      <div class="popover-container">
        <div class="card bg-grey">
          <div class="card-header h4 my-0" v-html="$t('trust-badge.popover.title.credit')"></div>
          <div class="card-body" v-html="$t('trust-badge.popover.text.credit')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    i18n: {
      messages: {
        fr: require('~/locales/fr/TrustBadges.json')
      }
    },

    props: {
      guaranteeYears: {
        type: Number,
        default: 5
      }
    },

    computed: {
      colClass: function () {
        return this.$i18n.locale === 'fr' ? 'col-3' : 'col-4'
      }
    }
  }
</script>

<style lang="scss" scoped>
  img {
    height: 3.5rem;
  }

  .popover-container {
    left: -75% !important;
    text-align: left;
    width: 400px;
  }
</style>
