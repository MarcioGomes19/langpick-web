import axios from 'axios'

// Em produção usa VITE_API_URL; em dev usa proxy Vite (/api → localhost:8080)
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const api = axios.create({
  baseURL,
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
  { id: 'netflix',  label: 'Netflix',       color: '#E50914', logo: '/platforms/netflix.svg'  },
  { id: 'disney',   label: 'Disney+',        color: '#0063E5', logo: '/platforms/disney.svg'   },
  { id: 'hbo',      label: 'Max (HBO)',       color: '#6200EE', logo: '/platforms/hbo.svg'      },
  { id: 'prime',    label: 'Amazon Prime',   color: '#00A8E1', logo: '/platforms/prime.svg'    },
  { id: 'apple',    label: 'Apple TV+',      color: '#555555', logo: '/platforms/apple.svg'    },
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

// Géneros com nomes em português
export const GENRES = [
  { id: 'action',      label: 'Ação' },
  { id: 'adventure',   label: 'Aventura' },
  { id: 'animation',   label: 'Animação' },
  { id: 'comedy',      label: 'Comédia' },
  { id: 'crime',       label: 'Crime' },
  { id: 'documentary', label: 'Documentário' },
  { id: 'drama',       label: 'Drama' },
  { id: 'family',      label: 'Família' },
  { id: 'fantasy',     label: 'Fantasia' },
  { id: 'history',     label: 'História' },
  { id: 'horror',      label: 'Terror' },
  { id: 'music',       label: 'Música' },
  { id: 'mystery',     label: 'Mistério' },
  { id: 'news',        label: 'Notícias' },
  { id: 'reality',     label: 'Reality Show' },
  { id: 'romance',     label: 'Romance' },
  { id: 'scifi',       label: 'Ficção Científica' },
  { id: 'talk',        label: 'Talk Show' },
  { id: 'thriller',    label: 'Thriller' },
  { id: 'war',         label: 'Guerra' },
  { id: 'western',     label: 'Faroeste' },
]

export const COUNTRIES = [
  { code: 'br', label: 'Brasil' },
  { code: 'us', label: 'Estados Unidos' },
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
