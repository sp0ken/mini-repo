<template>
  <main class="full-width">
    <div class="columns text-center flex-column">
      <picture v-if="$i18n.locale === 'fr'" class="col-mx-auto my-10">
        <source media="(min-width: 961px)" srcset="~/assets/img/error/header.svg" />
        <source
          media="(orientation: portrait) and (max-width : 840px)"
          srcset="~/assets/img/error/header-mobile.svg"
        />
        <img src="~/assets/img/error/header.svg" />
      </picture>

      <div class="d-flex flex-center flex-column">
        <h4 class="gill">{{ $t('error.text.search') }}</h4>
        <form
          v-if="$i18n.locale === 'fr'"
          ref="searchForm"
          class="input-group input-inline search-form col-2 col-sm-8"
          :action="localePath('search')"
        >
          <input
            type="search"
            class="px-2 col-12"
            :placeholder="$t('error.placeholder.search')"
            name="q"
          />
          <input type="submit" class="btn btn-primary search-submit" value="🔍" />
        </form>

        <nuxt-link
          v-else
          class="btn btn-lg btn-secondary col-mx-auto text-uppercase"
          :to="localePath('index')"
          >{{ $t('error.link.return') }}</nuxt-link
        >
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    props: {
      error: {
        type: Object,
        required: false,
        default: () => {}
      }
    },

    head() {
      return {
        title: this.$t('error.meta.title'),
        meta: [
          { hid: 'og:title', name: 'og:title', content: this.$t('error.meta.title') },
          { hid: 'twitter:title', name: 'twitter:title', content: this.$t('error.meta.title') },
          { hid: 'description', name: 'description', content: this.$t('error.meta.description') },
          { hid: 'og:description', name: 'og:description', content: this.$t('error.meta.title') },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: this.$t('error.meta.title')
          },
          { hid: 'robots', name: 'robots', content: this.$t('error.meta.robots') }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  main {
    background-image: url('~assets/img/error/background.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 35rem;
  }

  @media (max-width: $size-sm) {
    main {
      background-image: url('~assets/img/error/background-mobile.jpg');
      background-position: bottom;
      height: 30rem;

      & picture {
        margin: 0 !important;
        margin-top: 1rem !important;
      }
    }
  }
</style>
