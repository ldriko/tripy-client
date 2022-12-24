<script setup>
defineEmits(['vote'])
const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
  showVotes: {
    type: Boolean,
    default: false,
  },
  showPaid: {
    type: Boolean,
    default: false,
  },
})

const imageLoaded = ref(false)

const getMinimumVotes = (trip) => {
  return Math.floor(trip.user_capacity / 2)
}

const getCurrentVotes = (trip) => {
  const minimumVotes = getMinimumVotes()
  return Math.floor(trip.user_capacity / 5)
}

const getCurrentPercentage = (trip) => {
  const minimumVotes = getMinimumVotes(trip)
  const currentVotes = getCurrentVotes(trip)

  return (currentVotes / minimumVotes) * 100
}

const openTrip = (trip) => {
  navigateTo(`/trips/${trip.id}`)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      :class="{ 'animate-pulse': !imageLoaded }"
      class="rounded-xl h-48 bg-slate-200 transition hover:scale-105 cursor-pointer"
      @click="openTrip(props.trip)"
    >
      <img
        v-show="imageLoaded"
        :src="
          props.trip.pictures?.length
            ? `http://localhost:8000/storage/picture-event/${props.trip.pictures[0].images_name}`
            : 'https://picsum.photos/400/400'
        "
        alt="Trip"
        class="rounded-xl w-full h-full object-cover transition"
        @load="imageLoaded = true"
      />
    </div>
    <template v-if="props.showVotes">
      <div class="h-2 rounded-full bg-gray-100">
        <div class="h-2 rounded-full bg-primary w-[50%]"></div>
      </div>
      <div class="flex justify-between font-bold">
        <div>{{ Math.floor(props.trip.user_capacity / 4) }}</div>
        <div>{{ Math.floor(props.trip.user_capacity / 2) }}</div>
      </div>
    </template>
    <div class="flex gap-2">
      <div
        v-for="(tag, key) in props.trip.tags"
        :key="key"
        class="bg-primary bg-opacity-10 text-primary text-sm rounded-lg px-3 py-2"
      >
        {{ tag.name_tags }}
      </div>
      <template v-if="!props.trip.tags.length">
        <div
          class="bg-primary bg-opacity-10 text-primary text-sm rounded-lg px-3 py-2"
        >
          Pantai
        </div>
        <div
          class="bg-primary bg-opacity-10 text-primary text-sm rounded-lg px-3 py-2"
        >
          Sunset
        </div>
      </template>
    </div>
    <div class="mb-3">
      <div class="text-lg font-semibold">{{ props.trip.event_name }}</div>
      <div class="text-sm text-gray-700">3 Hari 2 Malam</div>
    </div>
    <app-button
      v-if="props.showVotes && !props.trip.voted"
      small
      @click="$emit('vote', props.trip.id)"
    >
      Vote
    </app-button>
    <app-button
      v-else-if="props.showVotes && props.trip.voted"
      color="success"
      small
    >
      Voted
    </app-button>
    <div
      v-if="
        props.showPaid &&
        trip.payments &&
        trip.payments[0].status_pembayaran == 1
      "
      class="py-3 px-4 bg-yellow-100 text-yellow-700"
    >
      Menunggu konfirmasi
    </div>
    <div
      v-if="
        props.showPaid &&
        trip.payments &&
        trip.payments[0].status_pembayaran == 2
      "
      class="py-3 px-4 bg-green-100 text-green-700 rounded-lg font-medium"
    >
      Telah dikonfirmasi
    </div>
  </div>
</template>
