import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  define: {
    // Disponível em produção via variável de ambiente VITE_API_URL
    // Ex: https://<ip-oracle>:8080
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || ''),
  }
})
