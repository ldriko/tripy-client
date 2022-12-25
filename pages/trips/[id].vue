<script setup>
import { onMounted } from 'vue'

definePageMeta({
  layout: 'home',
})

const route = useRoute()
const admin = useAdmin()

const isLoading = ref(false)
const trip = ref(null)
const activeImage = ref(1)
const orderDialog = ref(null)

const getTrip = async () => {
  if (isLoading.value) return

  isLoading.value = true

  const { data: _trip, error } = await useRequest(`/trips/${route.params.id}`)

  trip.value = _trip.value

  isLoading.value = false
}

const openOrderDialog = () => orderDialog.value.open(trip.value)

const upper = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

onMounted(getTrip)
</script>

<template>
  <div class="py-10 mx-auto max-w-screen-xl">
    <div
      v-if="isLoading"
      class="flex justify-center"
    >
      <loading-spinner class="text-primary w-10 h-10" />
    </div>
    <template v-if="trip">
      <div class="flex">
        <div class="grow">
          <div class="text-3xl font-bold mb-2">{{ trip.event_name }}</div>
          <div class="flex gap-4">
            <div class="flex justify-center items-center gap-2">
              <app-icon
                name="clock"
                class="w-4"
              />
              3 Hari 2 Malam
            </div>
            <div class="flex justify-center items-center gap-2">
              <app-icon
                name="star"
                class="w-4"
              />
              4.7
            </div>
            <div
              v-for="(tag, key) in trip.tags"
              :key="key"
              class="flex gap-2 justify-center items-center"
            >
              <div class="rounded-full h-2 w-2 bg-gray-300"></div>
              {{ tag.name_tags }}
            </div>
          </div>
        </div>
        <div class="shrink-0">
          <app-button
            large
            :color="trip.paid ? 'white' : 'primary'"
            @click="() => trip.paid ?? openOrderDialog()"
          >
            <template v-if="trip.paid">Tiket Telah Dipesan</template>
            <template v-else>Pesan Tiket</template>
          </app-button>
        </div>
      </div>
      <div class="grid grid-cols-5 gap-4 my-8">
        <div
          v-for="(picture, n) in trip.pictures"
          :class="{ 'col-span-2': activeImage === n }"
          class="h-96 transition-all cursor-pointer"
          @click="activeImage = n"
        >
          <img
            :src="`${admin.baseURL}/storage/picture-event/${picture.images_name}`"
            alt="Alt"
            class="object-cover h-full w-full transition-all rounded-lg"
          />
        </div>
      </div>
      <p
        v-html="trip.description"
        class="text-lg"
      ></p>
      <hr class="my-8" />
      <div class="text-xl font-bold mb-2">Rencana Perjalanan</div>
      <p
        v-html="trip.roadmap"
        class="text-lg"
      ></p>
      <hr class="my-8" />
      <div class="text-xl font-bold mb-2">Partnership</div>
      <hr class="my-8" />
      <div class="text-xl font-bold mb-4">Trip Organizer</div>
      <div class="flex gap-8">
        <div
          class="h-48 w-48 bg-gray-100 rounded-full flex justify-center items-center shrink-0"
        >
          <app-icon
            name="profile"
            class="w-10"
          />
        </div>
        <div class="grow">
          <div class="text-xl font-bold mb-2">{{ upper(trip.user.name) }}</div>
          <p class="text-lg">
            Halo namaku Heaven! Aku adalah seorang traveler yang senang
            berpergian dengan teman-teman. Aku telah mengadakan dan mengelola
            banyak Trip yang menyenangkan! Jangan lewatkan momen ini yuk!
          </p>
        </div>
      </div>
    </template>
  </div>
  <dialogs-order-dialog ref="orderDialog" />
</template>
