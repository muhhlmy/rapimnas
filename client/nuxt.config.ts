import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  runtimeConfig: {
    secret: {},
    public: {
      GoogleClient: process.env.GOOGLE_CLIENT_ID,
      BaseUrl: process.env.BASE_URL || 'http://localhost:3001',
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'RAPIMNAS SYSTEM',
    }},
  modules: ['@kalimahapps/vue-icons/nuxt', "@nuxt/fonts"],
  fonts: {
    families: [
      { 
        name: 'Montserrat', 
        provider: 'google',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ['normal', 'italic']
      }
    ]
  }
});