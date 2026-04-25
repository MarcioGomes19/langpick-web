import { defineStore } from 'pinia'
import { ref } from 'vue'
import { favoritesService } from '../services/api'

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const { data } = await favoritesService.getAll()
      items.value = data
    } catch (e) {
      error.value = 'Erro ao carregar favoritos'
    } finally {
      loading.value = false
    }
  }

  async function add(titleId) {
    await favoritesService.add(titleId)
    await fetchAll()
  }

  async function remove(titleId) {
    await favoritesService.remove(titleId)
    items.value = items.value.filter(t => t.id !== titleId)
  }

  return { items, loading, error, fetchAll, add, remove }
})
