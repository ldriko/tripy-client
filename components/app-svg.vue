<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: null
  }
})
</script>

<template>
  <img :alt="name" :height="height" :src="`/icons/${name}.svg`" :width="width">
</template>
