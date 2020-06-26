export const I18N = {
  locales: [
    {
      code: 'fr',
      iso: 'fr-FR'
    }
  ],

  vueI18n: {
    fallbackLocale: 'fr',
    dateTimeFormats: {
      'fr-FR': {
        day: {
          day: 'numeric'
        },
        short: {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        },
        long: {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }
      }
    }
  },

  defaultLocale: 'fr',

  vuex: {
    // Module namespace
    moduleName: 'i18n',

    // If enabled, current app's locale is synced with nuxt-i18n store module
    syncLocale: true
  },

  detectBrowserLanguage: {
    // If enabled, a cookie is set once a user has been redirected to his
    // preferred language to prevent subsequent redirections
    // Set to false to redirect every time
    useCookie: true,
    // Cookie name
    cookieKey: 'i18n_redirected'
  },

  seo: true,

  parsePages: false,

  pages: {
    'mattress/index': {
      fr: '/matelas'
    }
  }
}
