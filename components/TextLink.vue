<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <nuxt-link
    :to="props.to"
    class="text-primary font-semibold underline"
  >
    <slot />
  </nuxt-link>
</template>
