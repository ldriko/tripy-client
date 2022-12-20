<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)

watch(model, () => emit('update:modelValue', model.value))
</script>

<template>
  <div class="mb-4">
    <label v-if="props.label" class="block mb-2 font-medium text-lg">{{ label }}</label>
    <input v-model="model"
           :placeholder="props.placeholder"
           :required="props.required"
           :type="props.type"
           class="w-full px-4 py-4 border bg-gray-100 rounded-lg">
  </div>
</template>
