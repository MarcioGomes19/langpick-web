<template>
  <v-container v-if="loading" class="text-center py-16">
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-container>

  <v-alert v-else-if="error" type="error" class="ma-4">{{ error }}</v-alert>

  <div v-else-if="title">
    <!-- Hero com poster -->
    <div class="detail-hero" :style="heroStyle">
      <div class="hero-overlay d-flex align-end pa-6">
        <v-img
          :src="title.posterUrl || '/placeholder.png'"
          max-width="160"
          rounded="lg"
          elevation="8"
          class="flex-shrink-0"
        />
        <div class="ml-6 text-white">
          <v-chip :color="platformColor" size="small" class="mb-2 font-weight-bold">
            {{ title.platform?.toUpperCase() }}
          </v-chip>
          <h1 class="text-h4 font-weight-bold">{{ title.title }}</h1>
          <p v-if="title.originalTitle !== title.title" class="text-subtitle-1 opacity-70">
            {{ title.originalTitle }}
          </p>
          <div class="d-flex align-center gap-2 mt-1 flex-wrap">
            <v-chip size="small" variant="outlined" color="white" v-if="title.releaseYear">
              {{ title.releaseYear }}
            </v-chip>
            <v-chip size="small" variant="outlined" color="white" v-if="title.contentType">
              {{ title.contentType === 'movie' ? 'Filme' : 'Série' }}
            </v-chip>
          </div>
        </div>
      </div>
    </div>

    <v-container class="py-6">
      <!-- Acções -->
      <div class="d-flex ga-2 mb-6 flex-wrap">
        <v-btn
          v-if="authStore.isLoggedIn"
          color="primary"
          prepend-icon="mdi-heart"
          @click="addFavorite"
          :loading="favoriteLoading"
        >
          Guardar nos Favoritos
        </v-btn>
        <v-btn variant="outlined" prepend-icon="mdi-arrow-left" @click="$router.back()">
          Voltar
        </v-btn>
      </div>

      <v-row>
        <!-- Info principal -->
        <v-col cols="12" md="8">
          <v-card flat rounded="lg" class="mb-4 pa-4" color="surface-variant">
            <h2 class="text-h6 font-weight-bold mb-2">Sinopse</h2>
            <p class="text-body-1">{{ title.overview || 'Sem descrição disponível.' }}</p>
          </v-card>
        </v-col>

        <!-- Idiomas -->
        <v-col cols="12" md="4">
          <v-card flat rounded="lg" class="pa-4 mb-4" color="surface-variant">
            <h2 class="text-h6 font-weight-bold mb-3">🔊 Áudio disponível</h2>
            <div v-if="title.audioLanguages?.length" class="d-flex flex-wrap">
              <language-badge
                v-for="lang in title.audioLanguages"
                :key="lang"
                :code="lang"
                color="primary"
              />
            </div>
            <p v-else class="text-medium-emphasis text-body-2">Não disponível</p>

            <v-divider class="my-4" />

            <h2 class="text-h6 font-weight-bold mb-3">💬 Legendas disponíveis</h2>
            <div v-if="title.subtitleLanguages?.length" class="d-flex flex-wrap">
              <language-badge
                v-for="lang in title.subtitleLanguages"
                :key="lang"
                :code="lang"
                color="secondary"
              />
            </div>
            <p v-else class="text-medium-emphasis text-body-2">Não disponível</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { titleService } from '../services/api'
import { useAuthStore } from '../stores/auth'
import { useFavoritesStore } from '../stores/favorites'
import { PLATFORMS } from '../services/api'
import LanguageBadge from '../components/LanguageBadge.vue'

const route = useRoute()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

const title = ref(null)
const loading = ref(true)
const error = ref(null)
const favoriteLoading = ref(false)

const platformColor = computed(() => {
  return PLATFORMS.find(p => p.id === title.value?.platform)?.color || '#888'
})

const heroStyle = computed(() => ({
  background: title.value?.posterUrl
    ? `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(${title.value.posterUrl}) center/cover`
    : 'linear-gradient(135deg, #6750A4, #21005D)',
  minHeight: '320px',
}))

onMounted(async () => {
  try {
    const { data } = await titleService.getById(route.params.id)
    title.value = data
  } catch {
    error.value = 'Título não encontrado'
  } finally {
    loading.value = false
  }
})

async function addFavorite() {
  favoriteLoading.value = true
  try {
    await favoritesStore.add(title.value.id)
  } finally {
    favoriteLoading.value = false
  }
}
</script>

<style scoped>
.detail-hero {
  min-height: 320px;
  display: flex;
  align-items: flex-end;
}
.hero-overlay {
  width: 100%;
  background: inherit;
  min-height: 320px;
}
</style>
