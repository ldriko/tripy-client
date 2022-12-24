<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
})

const selected = ref(props.modelValue)
const tags = ref([])

const getTags = async () => {
  const { data, error } = await useRequest('/tags')

  if (error.value) return

  tags.value.push(...data.value.data)
  tags.value.push(...data.value.data)
  tags.value.push(...data.value.data)
  tags.value.push(...data.value.data)
}

const handleClick = (tag) => {
  if (selected.value.includes(tag.id))
    return selected.value.splice(selected.value.indexOf(tag.id), 1)

  selected.value.push(tag.id)
}

watch(
  selected,
  () => {
    emit('update:modelValue', selected.value)
  },
  { deep: true }
)

onMounted(getTags)
</script>

<template>
  <div
    class="max-w-screen-2xl flex gap-10 mx-auto pt-4 pb-6 overflow-auto scrollbar-hide"
  >
    <div
      v-for="(tag, key) in tags"
      :key="key"
      :class="{
        'border-primary': selected.includes(tag.id),
        'border-transparent': !selected.includes(tag.id),
      }"
      class="flex flex-col items-center gap-2 cursor-pointer group border-b-2 transition hover:border-primary py-2 shrink-0"
      @click="handleClick(tag)"
    >
      <app-icon
        :name="tag.name_tags.toLowerCase()"
        class="w-10 h-10 group-hover:fill-primary"
      />
      <div
        :class="{
          'text-primary': selected.includes(tag.id),
        }"
        class="text-sm font-semibold group-hover:text-primary"
      >
        {{ tag.name_tags }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
