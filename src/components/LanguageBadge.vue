<template>
  <v-chip
    :color="color"
    size="x-small"
    variant="tonal"
    class="mr-1 mb-1 font-weight-medium"
    :title="label"
  >
    {{ code.toUpperCase() }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue'
import { LANGUAGES } from '../services/api'

const props = defineProps({
  code: { type: String, required: true },
  color: { type: String, default: 'primary' }
})

const label = computed(() => {
  return LANGUAGES.find(l => l.code === props.code)?.label || props.code
})
</script>
