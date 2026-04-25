<template>
  <v-container class="pa-4">
    <h1 class="text-h5 font-weight-bold mb-6">
      <v-icon color="red" class="mr-2">mdi-heart</v-icon>
      Os Meus Favoritos
    </h1>

    <div v-if="store.loading" class="text-center py-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <v-alert v-else-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>

    <div v-else-if="store.items.length === 0" class="text-center py-12">
      <v-icon size="80" color="grey-lighten-1">mdi-heart-outline</v-icon>
      <p class="text-h6 text-medium-emphasis mt-4">Ainda não tens favoritos</p>
      <p class="text-body-2 text-medium-emphasis mb-4">Pesquisa conteúdo e guarda o que queres ver</p>
      <v-btn color="primary" to="/search" prepend-icon="mdi-magnify">Ir para Pesquisa</v-btn>
    </div>

    <v-row v-else>
      <v-col
        v-for="title in store.items"
        :key="title.id"
        cols="12" sm="6" md="4" lg="3" xl="2"
      >
        <v-card rounded="lg" elevation="2" class="h-100">
          <title-card :title="title" />
          <v-card-actions>
            <v-spacer />
            <v-btn
              icon="mdi-heart-off"
              color="error"
              variant="text"
              size="small"
              @click="remove(title.id)"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFavoritesStore } from '../stores/favorites'
import TitleCard from '../components/TitleCard.vue'

const store = useFavoritesStore()

onMounted(() => store.fetchAll())

async function remove(id) {
  await store.remove(id)
}
</script>
