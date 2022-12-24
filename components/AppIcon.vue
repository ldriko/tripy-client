<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  }
})
</script>

<template>
  <img :alt="name" :height="height" :src="`/icons/${name}.svg`" :width="width">
</template>
