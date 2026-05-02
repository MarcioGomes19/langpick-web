<template>
  <v-container fluid class="pa-4">
    <h1 class="text-h5 font-weight-bold mb-4">
      <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
      Pesquisar Conteúdo
    </h1>

    <search-filters />

    <!-- Banner de fetch em progresso -->
    <v-alert
      v-if="fetchStatus && fetchStatus.fetching"
      type="info"
      variant="tonal"
      class="mb-4"
      :icon="false"
    >
      <div class="d-flex align-center ga-3">
        <v-progress-circular indeterminate size="20" width="2" color="info" />
        <span>
          A carregar todos os títulos para esta plataforma…
          <strong>{{ fetchStatus.totalFetched }} carregados até agora.</strong>
          Pesquisa novamente em alguns segundos para ver mais resultados.
        </span>
      </div>
    </v-alert>

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
        {{ store.allResults.length }} de {{ store.total }} resultado{{ store.total !== 1 ? 's' : '' }}
        <span v-if="fetchStatus && !fetchStatus.complete" class="text-caption ml-1">
          (dados parciais — a carregar mais em background)
        </span>
      </p>

      <div v-if="store.allResults.length === 0" class="text-center py-8">
        <v-icon size="60" color="grey-lighten-1">mdi-movie-off-outline</v-icon>
        <p class="text-h6 text-medium-emphasis mt-3">Nenhum resultado para estes filtros</p>
        <p class="text-body-2 text-medium-emphasis">
          <span v-if="fetchStatus && fetchStatus.fetching">Os dados estão a ser carregados. Tenta de novo em breve.</span>
          <span v-else>Tenta mudar o país ou os idiomas</span>
        </p>
      </div>

      <v-row>
        <v-col
          v-for="title in store.allResults"
          :key="title.id"
          cols="12" sm="6" md="4" lg="3" xl="2"
        >
          <title-card :title="title" />
        </v-col>
      </v-row>

      <!-- Sentinel para infinite scroll -->
      <div ref="sentinel" class="py-4 text-center">
        <v-progress-circular v-if="store.loadingMore" indeterminate color="primary" size="32" />
        <p v-else-if="!store.hasMore && store.allResults.length > 0" class="text-caption text-medium-emphasis">
          Todos os resultados carregados
        </p>
      </div>
    </div>

    <!-- Loading skeleton inicial -->
    <v-row v-if="store.loading">
      <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-skeleton-loader type="card" rounded="lg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue'
import { useSearchStore } from '../stores/search'
import { titleService } from '../services/api'
import SearchFilters from '../components/SearchFilters.vue'
import TitleCard from '../components/TitleCard.vue'

const store = useSearchStore()
const fetchStatus = ref(null)
const sentinel = ref(null)
let pollInterval = null
let observer = null

async function checkFetchStatus() {
  const platform = store.filters.platform
  const country = store.filters.country
  if (!platform || !country) { fetchStatus.value = null; return }

  try {
    const { data } = await titleService.getFetchStatus(platform, country)
    fetchStatus.value = data
    if (data.complete) stopPolling()
  } catch {
    fetchStatus.value = null
  }
}

function startPolling() {
  stopPolling()
  pollInterval = setInterval(checkFetchStatus, 5000)
}

function stopPolling() {
  if (pollInterval) { clearInterval(pollInterval); pollInterval = null }
}

// Infinite scroll via IntersectionObserver
function setupObserver() {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && store.hasMore && !store.loadingMore) {
        store.loadMore()
      }
    },
    { rootMargin: '200px' }
  )
  if (sentinel.value) observer.observe(sentinel.value)
}

onMounted(setupObserver)

watch(() => store.hasSearched, (v) => {
  if (v) {
    checkFetchStatus().then(() => { if (fetchStatus.value?.fetching) startPolling() })
    // Re-attach observer after results render
    setTimeout(setupObserver, 100)
  }
})

watch(() => fetchStatus.value?.fetching, (fetching) => {
  if (fetching) startPolling()
  else stopPolling()
})

onUnmounted(() => {
  stopPolling()
  if (observer) observer.disconnect()
})
</script>
