import { defineStore } from 'pinia'
import { ref } from 'vue'
import { titleService } from '../services/api'

export const useSearchStore = defineStore('search', () => {
  const allResults = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref(null)
  const hasSearched = ref(false)
  const page = ref(0)
  const pageSize = 50
  const total = ref(0)
  const hasMore = ref(false)

  // filtros activos
  const filters = ref({
    platform: null,
    country: 'us',
    audioLang: null,
    subtitleLang: null,
    showType: null,
    genre: null,
    maxAge: null,
    sortBy: 'title',
    sortDir: 'asc',
    query: null,
  })

  function buildParams(pageNum = 0) {
    const params = { page: pageNum, size: pageSize }
    if (filters.value.platform)        params.platform   = filters.value.platform
    if (filters.value.country)         params.country    = filters.value.country
    if (filters.value.audioLang)       params.audio      = filters.value.audioLang
    if (filters.value.subtitleLang)    params.subtitle   = filters.value.subtitleLang
    if (filters.value.showType)        params.type       = filters.value.showType
    if (filters.value.genre)           params.genre      = filters.value.genre
    if (filters.value.maxAge !== null && filters.value.maxAge !== undefined) params.maxAge = filters.value.maxAge
    if (filters.value.sortBy)          params.sortBy     = filters.value.sortBy
    if (filters.value.sortDir)         params.sortDir    = filters.value.sortDir
    if (filters.value.query?.trim())   params.query      = filters.value.query.trim()
    return params
  }

  async function search() {
    if (!filters.value.country) return
    loading.value = true
    error.value = null
    page.value = 0
    allResults.value = []
    try {
      const { data } = await titleService.search(buildParams(0))
      allResults.value = data.content ?? data
      total.value = data.total ?? allResults.value.length
      hasMore.value = data.hasNext ?? false
      page.value = 0
      hasSearched.value = true
    } catch (e) {
      error.value = e.response?.data?.message || 'Erro ao pesquisar'
      allResults.value = []
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (!hasMore.value || loadingMore.value || loading.value) return
    loadingMore.value = true
    try {
      const nextPage = page.value + 1
      const { data } = await titleService.search(buildParams(nextPage))
      allResults.value = [...allResults.value, ...(data.content ?? [])]
      hasMore.value = data.hasNext ?? false
      page.value = nextPage
    } catch (e) {
      // silent — não interrompe a UX
    } finally {
      loadingMore.value = false
    }
  }

  function reset() {
    allResults.value = []
    hasSearched.value = false
    error.value = null
    total.value = 0
    hasMore.value = false
    page.value = 0
  }

  return {
    allResults, loading, loadingMore, error, hasSearched,
    filters, total, hasMore, page,
    search, loadMore, reset,
  }
})
