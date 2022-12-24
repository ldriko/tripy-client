<script setup>
const emit = defineEmits(['vote', 'empty', 'notEmpty'])
const props = defineProps({
  tags: {
    type: Array,
    default: [],
  },
  showVotes: {
    type: Boolean,
    default: false,
  },
  joined: {
    type: Boolean,
    default: false,
  },
  joinedType: {
    type: Number,
    default: null,
  },
  showPaid: {
    type: Boolean,
    default: false,
  },
})

const trips = ref([])
const searchQuery = useState('searchQuery')
const searchTimeout = ref(null)
const isLoading = ref(false)
const page = ref(1)
const limit = 10
const total = ref(null)
const url = props.joined ? '/trips/joined' : '/trips'

const search = async (replace = false) => {
  if (isLoading.value) return

  isLoading.value = true

  if (replace) trips.value = []

  const { data, error } = await useRequest(url, {
    params: {
      tags: props.tags,
      q: searchQuery.value,
      limit,
      page: page.value,
      type: props.joinedType,
    },
  })

  isLoading.value = false

  if (error.value) return

  total.value = data.value.count

  if (!data.value.trips.length) emit('empty')
  else emit('notEmpty')

  if (replace) return (trips.value = data.value.trips)

  trips.value.push(...data.value.trips)
}

const setSearchTimeout = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => search(true), 500)
}

watch(searchQuery, setSearchTimeout)
watch(props.tags, setSearchTimeout, { deep: true })
watch(page, setSearchTimeout)
watch(() => props.joinedType, setSearchTimeout)

onMounted(search)

defineExpose({ search })
</script>

<template>
  <div class="grid grid-cols-5 gap-8 justify-center">
    <trip-card
      v-for="(trip, key) in trips"
      :key="key"
      :trip="trip"
      :show-votes="props.showVotes"
      :show-paid="props.showPaid"
      @vote="(id) => $emit('vote', id)"
    />
  </div>
  <div class="flex justify-center">
    <loading-spinner
      v-if="isLoading"
      class="w-10 h-10 text-primary"
    />
  </div>
  <trip-list-pagination
    v-model="page"
    v-if="total"
    :total="total"
    :per-page="10"
    class="mt-10"
  />
</template>
