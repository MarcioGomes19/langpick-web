import { defineStore } from 'pinia'
import { ref } from 'vue'
import { titleService } from '../services/api'

export const useSearchStore = defineStore('search', () => {
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)
  const hasSearched = ref(false)

  // filtros activos
  const filters = ref({
    platform: null,
    country: 'br',
    audioLang: null,
    subtitleLang: null,
    showType: null,
  })

  async function search() {
    const params = {}
    if (filters.value.platform)    params.platform    = filters.value.platform
    if (filters.value.country)     params.country     = filters.value.country
    if (filters.value.audioLang)    params.audio    = filters.value.audioLang
    if (filters.value.subtitleLang) params.subtitle = filters.value.subtitleLang
    if (filters.value.showType)    params.type        = filters.value.showType

    loading.value = true
    error.value = null
    try {
      const { data } = await titleService.search(params)
      results.value = data
      hasSearched.value = true
    } catch (e) {
      error.value = e.response?.data?.message || 'Erro ao pesquisar'
      results.value = []
    } finally {
      loading.value = false
    }
  }

  function reset() {
    results.value = []
    hasSearched.value = false
    error.value = null
  }

  return { results, loading, error, hasSearched, filters, search, reset }
})
