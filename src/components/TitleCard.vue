<template>
  <v-card
    :to="`/title/${title.id}`"
    class="title-card h-100"
    elevation="2"
    rounded="lg"
  >
    <v-img
      :src="title.posterUrl || '/placeholder.png'"
      height="220"
      cover
      class="bg-grey-darken-3"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-icon size="64" color="grey">mdi-movie-outline</v-icon>
        </div>
      </template>
      <div class="card-overlay pa-2 d-flex flex-wrap ga-1">
        <v-chip
          size="x-small"
          :color="platformColor"
          class="font-weight-bold"
        >
          {{ title.platform?.toUpperCase() }}
        </v-chip>
        <v-chip v-if="title.contentType" size="x-small" color="black" variant="tonal">
          {{ title.contentType === 'movie' ? 'Filme' : 'Série' }}
        </v-chip>
      </div>
    </v-img>

    <v-card-title class="text-body-1 font-weight-bold pt-3 pb-1" style="line-height:1.3">
      {{ title.title }}
    </v-card-title>
    <v-card-subtitle v-if="title.releaseYear" class="pb-1">
      {{ title.releaseYear }}
    </v-card-subtitle>

    <v-card-text class="pt-1 pb-2">
      <!-- Idiomas de áudio -->
      <div v-if="title.audioLanguages?.length" class="mb-1">
        <span class="text-caption text-medium-emphasis">🔊 </span>
        <language-badge
          v-for="lang in title.audioLanguages.slice(0, 4)"
          :key="'a'+lang"
          :code="lang"
          color="primary"
        />
        <v-chip v-if="title.audioLanguages.length > 4" size="x-small" class="ml-1">
          +{{ title.audioLanguages.length - 4 }}
        </v-chip>
      </div>
      <!-- Legendas -->
      <div v-if="title.subtitleLanguages?.length">
        <span class="text-caption text-medium-emphasis">💬 </span>
        <language-badge
          v-for="lang in title.subtitleLanguages.slice(0, 4)"
          :key="'s'+lang"
          :code="lang"
          color="secondary"
        />
        <v-chip v-if="title.subtitleLanguages.length > 4" size="x-small" class="ml-1">
          +{{ title.subtitleLanguages.length - 4 }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { PLATFORMS } from '../services/api'
import LanguageBadge from './LanguageBadge.vue'

const props = defineProps({
  title: { type: Object, required: true }
})

const platformColor = computed(() => {
  return PLATFORMS.find(p => p.id === props.title.platform)?.color || '#888'
})
</script>

<style scoped>
.title-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.title-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2) !important;
}
.card-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%);
}
</style>
