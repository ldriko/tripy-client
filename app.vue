<script setup>
useHead({
  title: 'Tripy',
})

const route = useRoute()
const alert = useState('alert', () => null)

const setViewHeight = () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--screen-height', `${vh}px`)
}

watch(route, () => (alert.value = null))

onMounted(setViewHeight)
</script>

<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>
