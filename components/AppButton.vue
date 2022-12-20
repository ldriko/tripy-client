<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  outlined: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const colorClasses = computed(() => ({
  'bg-primary text-white cursor-pointer': props.color === 'primary' && !props.outlined,
  'border border-2 border-primary text-primary cursor-pointer': props.color === 'primary' && props.outlined
}))
</script>

<template>
  <button :class="colorClasses" :type="props.type" class="p-4 font-medium rounded-lg">
    <slot/>
  </button>
</template>
