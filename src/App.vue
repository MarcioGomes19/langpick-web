<template>
  <v-app :theme="theme">
    <v-app-bar color="primary" flat>
      <v-app-bar-title>
        <router-link to="/" class="text-white text-decoration-none font-weight-bold text-h6">
          🎬 LangPick
        </router-link>
      </v-app-bar-title>
      <template #append>
        <v-btn :icon="theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="toggleTheme" />
        <v-btn v-if="!authStore.isLoggedIn" to="/auth" icon="mdi-login" />
        <template v-else>
          <v-btn to="/favorites" icon="mdi-heart" />
          <v-btn icon="mdi-logout" @click="authStore.logout" />
        </template>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from './stores/auth'

const theme = ref('light')
const authStore = useAuthStore()

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
