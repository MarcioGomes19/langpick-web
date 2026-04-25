<template>
  <v-container class="d-flex align-center justify-center" style="min-height: calc(100vh - 64px)">
    <v-card width="440" rounded="xl" elevation="4" class="pa-2">
      <v-card-title class="text-h5 font-weight-bold text-center pt-6 pb-2">
        🎬 LangPick
      </v-card-title>
      <v-card-subtitle class="text-center pb-4">
        {{ isLogin ? 'Bem-vindo de volta!' : 'Cria a tua conta' }}
      </v-card-subtitle>

      <!-- Tabs Login / Registo -->
      <v-tabs v-model="tab" color="primary" grow class="mb-4">
        <v-tab value="login">Entrar</v-tab>
        <v-tab value="register">Criar Conta</v-tab>
      </v-tabs>

      <v-card-text class="px-6">
        <v-alert v-if="store.error" type="error" class="mb-4" closable @click:close="store.error = null">
          {{ store.error }}
        </v-alert>

        <v-window v-model="tab">
          <!-- LOGIN -->
          <v-window-item value="login">
            <v-form @submit.prevent="submitLogin">
              <v-text-field
                v-model="loginForm.email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                class="mb-3"
                required
              />
              <v-text-field
                v-model="loginForm.password"
                label="Password"
                :type="showPass ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPass = !showPass"
                variant="outlined"
                class="mb-4"
                required
              />
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                :loading="store.loading"
              >
                Entrar
              </v-btn>
            </v-form>
          </v-window-item>

          <!-- REGISTO -->
          <v-window-item value="register">
            <v-form @submit.prevent="submitRegister">
              <v-text-field
                v-model="registerForm.name"
                label="Nome"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                class="mb-3"
                required
              />
              <v-text-field
                v-model="registerForm.email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                class="mb-3"
                required
              />
              <v-text-field
                v-model="registerForm.password"
                label="Password"
                :type="showPass ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPass = !showPass"
                variant="outlined"
                hint="Mínimo 6 caracteres"
                class="mb-4"
                required
              />
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                :loading="store.loading"
              >
                Criar Conta
              </v-btn>
            </v-form>
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-card-text class="text-center text-caption text-medium-emphasis pb-6">
        Ao entrar, aceitas os termos de serviço da LangPick.
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const store = useAuthStore()
const tab = ref('login')
const showPass = ref(false)

const isLogin = computed(() => tab.value === 'login')

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ name: '', email: '', password: '' })

function submitLogin() {
  store.login(loginForm.value.email, loginForm.value.password)
}

function submitRegister() {
  store.register(registerForm.value.name, registerForm.value.email, registerForm.value.password)
}
</script>
