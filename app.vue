<script setup>
const setViewHeight = () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--screen-height', `${vh}px`)
}

onMounted(setViewHeight)
</script>

<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>
