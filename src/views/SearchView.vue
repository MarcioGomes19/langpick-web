<template>
  <v-container fluid class="pa-4">
    <h1 class="text-h5 font-weight-bold mb-4">
      <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
      Pesquisar Conteúdo
    </h1>

    <search-filters />

    <!-- Estado vazio inicial -->
    <div v-if="!store.hasSearched && !store.loading" class="text-center py-12">
      <v-icon size="80" color="grey-lighten-1">mdi-movie-search-outline</v-icon>
      <p class="text-h6 text-medium-emphasis mt-4">
        Escolhe os teus filtros e clica em <strong>Pesquisar</strong>
      </p>
      <p class="text-body-2 text-medium-emphasis">
        Filtra por plataforma, idioma de áudio e legendas
      </p>
    </div>

    <!-- Erro -->
    <v-alert v-if="store.error" type="error" class="mb-4" closable @click:close="store.error = null">
      {{ store.error }}
    </v-alert>

    <!-- Resultados -->
    <div v-if="store.hasSearched && !store.loading">
      <p class="text-body-2 text-medium-emphasis mb-3">
        {{ store.results.length }} resultado{{ store.results.length !== 1 ? 's' : '' }} encontrado{{ store.results.length !== 1 ? 's' : '' }}
      </p>

      <div v-if="store.results.length === 0" class="text-center py-8">
        <v-icon size="60" color="grey-lighten-1">mdi-movie-off-outline</v-icon>
        <p class="text-h6 text-medium-emphasis mt-3">Nenhum resultado para estes filtros</p>
        <p class="text-body-2 text-medium-emphasis">Tenta mudar o país ou os idiomas</p>
      </div>

      <v-row>
        <v-col
          v-for="title in store.results"
          :key="title.id"
          cols="12" sm="6" md="4" lg="3" xl="2"
        >
          <title-card :title="title" />
        </v-col>
      </v-row>
    </div>

    <!-- Loading skeleton -->
    <v-row v-if="store.loading">
      <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-skeleton-loader type="card" rounded="lg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useSearchStore } from '../stores/search'
import SearchFilters from '../components/SearchFilters.vue'
import TitleCard from '../components/TitleCard.vue'

const store = useSearchStore()
</script>
