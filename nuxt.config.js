import { AXIOS, I18N, ROUTES, SITEMAP, WAIT } from './config'

export default {
  env: {
    baseUrl: process.env.BASE_URL,
    syliusBaseUrl: process.env.SYLIUS_BASE_URL,
    branch: process.env.BRANCH
  },

  /**
   * Nuxt telemetry config
   */
  telemetry: false,

  /*
   ** Headers of the page
   */
  head: {
    title: 'Mini',
    meta: [
      { charset: 'utf-8', once: true },
      { name: 'viewport', content: 'width=device-width, initial-scale=1', once: true },
      { hid: 'description', name: 'description', content: 'Tediber', once: true }
    ],
    link: [
      { rel: 'icon', href: '/favicon-32.png', sizes: '32x32', once: true },
      { rel: 'icon', href: '/favicon-128.png', sizes: '128x128', once: true },
      { rel: 'icon', href: '/favicon-228.png', sizes: '228x228', once: true },
      { rel: 'apple-touch-icon', href: '/favicon-120.png', sizes: '120x120', once: true },
      { rel: 'apple-touch-icon', href: '/favicon-152.png', sizes: '152x152', once: true },
      { rel: 'apple-touch-icon', href: '/favicon-180.png', sizes: '180x180', once: true }
    ]
  },

  /*
   ** CSS files
   */
  css: ['@/assets/css/main'],

  /**
   * Nuxt specific modules
   */
  modules: [
    ['@nuxtjs/axios', AXIOS],
    ['nuxt-i18n', I18N],
    ['vue-wait/nuxt', WAIT],
    ['@nuxtjs/sitemap', SITEMAP]
  ],
  buildModules: [['@nuxtjs/style-resources'], ['@nuxt/components']],

  /**
   * Vue plugins
   */
  plugins: [
    { src: '~/plugins/vue-flickity', mode: 'client' },
    { src: '~/plugins/vue-lazyload', mode: 'client' },
    { src: '~/plugins/vuex-persistance', mode: 'client' },
    { src: '~/plugins/vue-cloudinary', mode: 'client' }
  ],

  /**
   * Watch modules config files for changes
   */
  watch: ['~/config/*.js', '~/mixins/*.js'],

  /*
   ** Build configuration
   */
  build: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: true
      }
    },

    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },

    extractCSS: false,

    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'scripts/[name].[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'scripts/[name].[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/[name].[contenthash].css'),
      img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]'),
      font: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]'),
      video: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]')
    },

    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  },
  render: {
    resourceHints: true
  },

  /**
   * Options for the static page generator
   */
  export: {
    crawler: false,
    fallback: '404.html',
    subFolders: false,
    routes: ROUTES
  },
  target: 'static',

  /**
   * Router options
   * @type {Object}
   */
  router: {
    prefetchLinks: false
  },

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#FAB200',
    height: '3px'
  },

  /**
   * Modules config
   */
  styleResources: {
    scss: ['~assets/css/_variables.scss', 'spectre.css/src/mixins']
  },

  /**
   * Nuxt components module
   */
  components: true
}
