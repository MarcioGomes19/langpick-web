<template>
  <v-card flat class="pa-4 mb-4" color="white" rounded="lg" border>

    <!-- Campo de pesquisa por título (destaque) -->
    <v-text-field
      v-model="store.filters.query"
      label="Pesquisar por título"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      clearable
      class="mb-3"
      @keyup.enter="store.search()"
    />

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

      <!-- Faixa etária -->
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-model="store.filters.maxAge"
          :items="ageOptions"
          item-title="label"
          item-value="value"
          label="Faixa etária"
          prepend-inner-icon="mdi-account-child"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>

      <!-- Ordenar por -->
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-model="store.filters.sortBy"
          :items="sortByOptions"
          item-title="label"
          item-value="value"
          label="Ordenar por"
          prepend-inner-icon="mdi-sort"
          variant="outlined"
          density="compact"
        />
      </v-col>

      <!-- Direção da ordenação -->
      <v-col cols="12" sm="6" md="2">
        <v-btn-toggle
          v-model="store.filters.sortDir"
          density="compact"
          variant="outlined"
          color="primary"
          class="mt-1"
          mandatory
        >
          <v-btn value="asc" size="small">
            <v-icon>mdi-sort-ascending</v-icon>
          </v-btn>
          <v-btn value="desc" size="small">
            <v-icon>mdi-sort-descending</v-icon>
          </v-btn>
        </v-btn-toggle>
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
const ageOptions = [
  { label: 'Livre (todos os públicos)', value: 0 },
  { label: 'Até 7 anos', value: 7 },
  { label: 'Até 10 anos', value: 10 },
  { label: 'Até 12 anos', value: 12 },
  { label: 'Até 13 anos', value: 13 },
  { label: 'Até 14 anos', value: 14 },
  { label: 'Até 16 anos', value: 16 },
  { label: 'Até 17 anos (R)', value: 17 },
  { label: '18+ (adultos)', value: 18 },
]
const sortByOptions = [
  { label: 'Título', value: 'title' },
  { label: 'Ano de lançamento', value: 'releaseYear' },
]
</script>
