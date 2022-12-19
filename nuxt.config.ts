// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost/v1'
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
