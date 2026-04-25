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
          primary: '#6750A4',
          secondary: '#625B71',
          surface: '#FFFBFE',
          background: '#F6F0FF',
          error: '#B3261E',
          success: '#386A20',
        }
      },
      dark: {
        colors: {
          primary: '#D0BCFF',
          secondary: '#CCC2DC',
          surface: '#1C1B1F',
          background: '#141218',
          error: '#F2B8B5',
          success: '#B5CCAD',
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
