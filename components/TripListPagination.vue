<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    default: null,
  },
})

const page = ref(props.modelValue)
const pages = computed(() => Math.ceil(props.total / props.perPage))

const previous = () => {
  if (page.value === 1) return
  page.value -= 1
}

const next = () => {
  if (page.value === pages.value) return
  page.value += 1
}

const toPage = (_page) => {
  page.value = _page
}

watch(page, () => emit('update:modelValue', page.value))
</script>

<template>
  <div class="flex justify-center gap-4">
    <button
      class="w-14 h-14 border rounded-full transition hover:bg-primary hover:text-white font-medium flex justify-center items-center"
      @click="previous"
    >
      <app-icon name="arrow-left" />
    </button>
    <button
      v-for="n in pages"
      :class="{ 'bg-primary text-white': page === n }"
      class="w-14 h-14 border rounded-lg transition hover:bg-primary hover:text-white font-medium flex justify-center items-center"
      @click="toPage(n)"
    >
      {{ n }}
    </button>
    <button
      class="w-14 h-14 border rounded-full transition hover:bg-primary hover:text-white font-medium flex justify-center items-center"
      @click="next"
    >
      <app-icon name="arrow-right" />
    </button>
  </div>
</template>
