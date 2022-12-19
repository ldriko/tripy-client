<script setup>
import AppSvg from '~/components/app-svg.vue'</script>

<template>
  <div class="min-h-screen flex">
    <div class="flex-grow bg-primary relative">
      <app-svg class="absolute w-1/2 bottom-0 right-0" name="login"/>
      <div class="bg-primary-variant rounded-full w-48 h-48 top-0 right-0"></div>
    </div>
    <div class="flex-shrink-0 max-w-xl w-full p-8">
      <slot/>
    </div>
  </div>
</template>
