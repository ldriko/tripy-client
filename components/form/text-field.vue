<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)

watch(model, () => emit('update:modelValue', model.value))
</script>

<template>
  <input v-model="model" :type="props.type" class="w-full px-3 py-4 border bg-gray-100 rounded-lg">
</template>
