export default {
  telemetry: false,
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      {
        name: 'theme-color',
        content: '#00813c',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#00813c',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/firebase',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    loaders: {
      // Disable inline fonts and images to avoid CSP violations
      fontUrl: { limit: 0 },
      imgUrl: { limit: 0 },
    },
  },

  generate: {
    // Enable 404 page
    fallback: true,
  },

  // Disable loading transition
  loading: false,

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: [
      'ButtonPlugin',
      'NavPlugin',
      'FormPlugin',
      'FormGroupPlugin',
      'FormRadioPlugin',
      'FormInputPlugin',
      'FormCheckboxPlugin',
      'AlertPlugin',
      'SpinnerPlugin',
    ],
  },

  styleResources: {
    scss: ['~assets/scss/global.scss'],
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyDyux-K4__0Uvsyu9NtP7rxDHpo2fVuyGA',
      authDomain: 'website-2df68.firebaseapp.com',
      databaseURL: 'https://website-2df68.firebaseio.com',
      projectId: 'website-2df68',
      storageBucket: 'website-2df68.appspot.com',
      messagingSenderId: '1041372024792',
      appId: '1:1041372024792:web:ae3a304f888ad4448eecad',
    },
    services: {
      firestore: true,
    },
  },

  // https://firebase.nuxtjs.org/service-options/firestore#settings
  render: {
    bundleRenderer: {
      runInNewContext: false,
    },
  },
}
