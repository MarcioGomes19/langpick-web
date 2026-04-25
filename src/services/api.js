import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// Injector do token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('langpick_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Catálogo de plataformas suportadas (hardcoded para UI)
export const PLATFORMS = [
  { id: 'netflix',  label: 'Netflix',       color: '#E50914' },
  { id: 'disney',   label: 'Disney+',        color: '#0063E5' },
  { id: 'prime',    label: 'Amazon Prime',   color: '#00A8E1' },
  { id: 'apple',    label: 'Apple TV+',      color: '#555555' },
  { id: 'hbo',      label: 'Max (HBO)',       color: '#002BE7' },
]

// Idiomas mais usados com código ISO 639-3
export const LANGUAGES = [
  { code: 'por', label: 'Português' },
  { code: 'eng', label: 'Inglês' },
  { code: 'spa', label: 'Espanhol' },
  { code: 'fra', label: 'Francês' },
  { code: 'deu', label: 'Alemão' },
  { code: 'ita', label: 'Italiano' },
  { code: 'jpn', label: 'Japonês' },
  { code: 'kor', label: 'Coreano' },
  { code: 'zho', label: 'Mandarim' },
  { code: 'ara', label: 'Árabe' },
]

export const COUNTRIES = [
  { code: 'br', label: 'Brasil' },
  { code: 'pt', label: 'Portugal' },
  { code: 'us', label: 'Estados Unidos' },
  { code: 'gb', label: 'Reino Unido' },
  { code: 'es', label: 'Espanha' },
  { code: 'fr', label: 'França' },
  { code: 'de', label: 'Alemanha' },
  { code: 'jp', label: 'Japão' },
]

export const titleService = {
  search(params) {
    return api.get('/titles', { params })
  },
  getById(id) {
    return api.get(`/titles/${id}`)
  },
  getFetchStatus(platform, country) {
    return api.get('/titles/fetch-status', { params: { platform, country } })
  },
}

export const authService = {
  login(email, password) {
    return api.post('/auth/login', { email, password })
  },
  register(name, email, password) {
    return api.post('/auth/register', { name, email, password })
  },
}

export const favoritesService = {
  getAll() {
    return api.get('/favorites')
  },
  add(titleId) {
    return api.post(`/favorites/${titleId}`)
  },
  remove(titleId) {
    return api.delete(`/favorites/${titleId}`)
  },
}

export default api
