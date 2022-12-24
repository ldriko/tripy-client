<script setup>
const props = defineProps({
  modelValue: {
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  pill: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)

watch(model, () => emit('update:modelValue', model.value))
</script>

<template>
  <div :class="{ 'mb-4': props.label }">
    <label
      v-if="props.label"
      :class="{ 'text-lg': !props.small }"
      class="block mb-2 font-medium"
    >
      {{ label }}
    </label>
    <input
      v-model="model"
      :placeholder="props.placeholder"
      :required="props.required"
      :type="props.type"
      :class="{
        'rounded-lg px-4': !props.pill,
        'rounded-full px-6': props.pill,
        'py-3': props.small,
        'py-4': !props.small,
      }"
      class="w-full border bg-gray-100"
    />
  </div>
</template>
