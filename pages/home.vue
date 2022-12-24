<script setup>
definePageMeta({
  layout: 'home',
})

const tags = ref([])
</script>

<template>
  <trip-filters v-model="tags" />
  <trip-list :tags="tags" />
</template>
