import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1565C0',
          secondary: '#00838F',
          surface: '#FFFFFF',
          background: '#F0F4F8',
          error: '#C62828',
          success: '#2E7D32',
          info: '#0277BD',
          warning: '#EF6C00',
        }
      },
      dark: {
        colors: {
          primary: '#90CAF9',
          secondary: '#80DEEA',
          surface: '#1E2A3A',
          background: '#121E2D',
          error: '#EF9A9A',
          success: '#A5D6A7',
          info: '#81D4FA',
          warning: '#FFCC80',
        }
      }
    }
  },
  icons: { defaultSet: 'mdi' }
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
