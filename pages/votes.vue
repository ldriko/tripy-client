<script setup>
definePageMeta({
  layout: 'home',
})

const voteDialog = ref(null)
const tags = ref([])
const list = ref(null)
</script>

<template>
  <trip-filters v-model="tags" />
  <trip-list
    ref="list"
    :tags="tags"
    show-votes
    @vote="(id) => voteDialog.open(id)"
  />
  <dialogs-vote-dialog
    ref="voteDialog"
    @submitted="list.search(true)"
  />
</template>
