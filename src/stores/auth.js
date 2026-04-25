import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/api'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('langpick_token') || null)
  const userName = ref(localStorage.getItem('langpick_name') || '')
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(email, password) {
    loading.value = true
    error.value = null
    try {
      const { data } = await authService.login(email, password)
      token.value = data.token
      userName.value = data.name
      localStorage.setItem('langpick_token', data.token)
      localStorage.setItem('langpick_name', data.name)
      const redirect = router.currentRoute.value.query.redirect || '/search'
      router.push(redirect)
    } catch (e) {
      error.value = e.response?.data?.message || 'Email ou password incorrectos'
    } finally {
      loading.value = false
    }
  }

  async function register(name, email, password) {
    loading.value = true
    error.value = null
    try {
      const { data } = await authService.register(name, email, password)
      token.value = data.token
      userName.value = data.name
      localStorage.setItem('langpick_token', data.token)
      localStorage.setItem('langpick_name', data.name)
      router.push('/search')
    } catch (e) {
      error.value = e.response?.data?.message || 'Erro ao criar conta'
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    userName.value = ''
    localStorage.removeItem('langpick_token')
    localStorage.removeItem('langpick_name')
    router.push('/search')
  }

  return { token, userName, isLoggedIn, loading, error, login, register, logout }
})
