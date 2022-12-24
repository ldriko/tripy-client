<script setup>
definePageMeta({
  layout: 'home-no-spaces',
})

const sessionStore = useSessionStore()

console.log(sessionStore)
</script>

<template>
  <img
    class="h-48 w-full object-cover"
    src="/img/profile-banner.jpg"
  />
  <div class="max-w-screen-2xl xl:px-4 mx-auto pb-16">
    <div class="flex">
      <img
        src=""
        alt=""
      />
    </div>
  </div>
</template>
