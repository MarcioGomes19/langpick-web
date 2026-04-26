<template>
  <v-card flat class="pa-4 mb-4" color="surface-variant" rounded="lg">
    <v-row dense>
      <!-- País -->
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="store.filters.country"
          :items="countries"
          item-title="label"
          item-value="code"
          label="País"
          prepend-inner-icon="mdi-earth"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>

      <!-- Plataforma -->
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="store.filters.platform"
          :items="platforms"
          item-title="label"
          item-value="id"
          label="Plataforma"
          prepend-inner-icon="mdi-television-play"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>

      <!-- Áudio -->
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-model="store.filters.audioLang"
          :items="languages"
          item-title="label"
          item-value="code"
          label="Áudio"
          prepend-inner-icon="mdi-volume-high"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>

      <!-- Legenda -->
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-model="store.filters.subtitleLang"
          :items="languages"
          item-title="label"
          item-value="code"
          label="Legenda"
          prepend-inner-icon="mdi-subtitles"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>

      <!-- Tipo -->
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-model="store.filters.showType"
          :items="showTypes"
          item-title="label"
          item-value="value"
          label="Tipo"
          prepend-inner-icon="mdi-filter"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>

      <!-- Género -->
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-model="store.filters.genre"
          :items="genres"
          item-title="label"
          item-value="id"
          label="Género"
          prepend-inner-icon="mdi-drama-masks"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>
    </v-row>

    <div class="d-flex justify-end ga-2 mt-1">
      <v-btn
        variant="text"
        @click="store.reset(); store.filters.country = 'br'"
        :disabled="store.loading"
      >
        Limpar
      </v-btn>
      <v-btn
        color="primary"
        prepend-icon="mdi-magnify"
        @click="store.search()"
        :loading="store.loading"
      >
        Pesquisar
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { PLATFORMS, LANGUAGES, COUNTRIES, GENRES } from '../services/api'
import { useSearchStore } from '../stores/search'

const store = useSearchStore()

const platforms = PLATFORMS
const languages = LANGUAGES
const countries = COUNTRIES
const genres = GENRES
const showTypes = [
  { label: 'Filmes', value: 'movie' },
  { label: 'Séries', value: 'series' },
]
</script>
