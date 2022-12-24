<script setup>
definePageMeta({
  layout: 'home',
})

const tab = ref(0)
const trips = ref([])
const notFound = ref(false)
const isLoading = ref(false)
</script>

<template>
  <div class="py-8">
    <div class="flex justify-center gap-4 mb-16">
      <div
        :class="{
          'bg-primary text-white': tab === 0,
          'text-gray-500': tab !== 0,
        }"
        class="rounded-full py-3 px-5 font-medium transition hover:bg-primary hover:text-white cursor-pointer"
        @click="tab = 0"
      >
        Semua
      </div>
      <div
        :class="{
          'bg-primary text-white': tab === 1,
          'text-gray-500': tab !== 1,
        }"
        class="rounded-full py-3 px-5 font-medium transition hover:bg-primary hover:text-white cursor-pointer"
        @click="tab = 1"
      >
        Sedang Berlangsung
      </div>
      <div
        :class="{
          'bg-primary text-white': tab === 2,
          'text-gray-500': tab !== 2,
        }"
        class="rounded-full py-3 px-5 font-medium transition hover:bg-primary hover:text-white cursor-pointer"
        @click="tab = 2"
      >
        Telah Selesai
      </div>
    </div>
    <div
      v-if="notFound"
      class="flex flex-col items-center"
    >
      <app-icon
        name="404"
        class="w-78 mb-4"
      />
      <div class="text-2xl font-semibold mb-2">
        Sepertinya kamu belum join trip apapun
      </div>
      <p>
        Yuk! Mulai perjalananmu di Tripy sekarang juga dengan bergabung ke
        sebuah trip terlebih dahulu!
      </p>
    </div>
    <trip-list
      :joined-type="tab"
      joined
      show-paid
      @not-empty="notFound = false"
      @empty="notFound = true"
    />
  </div>
</template>
