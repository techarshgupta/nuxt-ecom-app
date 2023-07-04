// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'My Shopping App',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // meta: [
    //   { charset: 'utf-8' },
    //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //   { hid: 'description', name: 'description', content: '' },
    //   { name: 'format-detection', content: 'telephone=no' },
    // ],
  },
  css: ['~/assets/main.css'],
  modules: ['@pinia/nuxt',
  '@pinia-plugin-persistedstate/nuxt'],
})
