<script setup>
const showSearchField = useState('showSearchField', () => false)
const searchQuery = useState('searchQuery', '')
</script>

<template>
  <app-navbar />
  <div
    v-if="showSearchField"
    class="pt-4"
  >
    <form-text-field
      v-model="searchQuery"
      class="max-w-sm mx-auto"
      placeholder="Pencarian"
      pill
    ></form-text-field>
  </div>
  <div class="max-w-screen-2xl xl:px-4 mx-auto pb-16">
    <slot />
  </div>
</template>
