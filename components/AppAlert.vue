<script setup>
const appAlert = useState('appAlert', () => null)
const classes = computed(() => ({
  'bg-blue-100 text-blue-600': appAlert.value?.type === 'info',
  'bg-red-100 text-red-600': appAlert.value?.type === 'error',
  'bg-green-100 text-green-600': appAlert.value?.type === 'success',
  'bg-yellow-100 text-yellow-600': appAlert.value?.type === 'warning',
}))
</script>

<template>
  <div
    v-if="appAlert"
    :class="classes"
    class="px-4 py-4 text-sm font-medium rounded-lg"
  >
    {{ appAlert.text }}
  </div>
</template>
