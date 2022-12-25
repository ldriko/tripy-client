<script setup>
defineEmits(['click'])
const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  icon: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const colorClasses = computed(() => ({
  'bg-primary text-white': props.color === 'primary' && !props.outlined,
  'border border-2 border-primary text-primary':
    props.color === 'primary' && props.outlined,
  'bg-white border': props.color === 'white',
  'bg-green-100 text-green-700 border border-green-700':
    props.color === 'success',
  'rounded-full': props.icon,
  'rounded-lg': !props.icon,
  'p-4': !props.small,
  'p-3': props.small,
  // 'text-sm': !props.large,
}))
</script>

<template>
  <button
    :class="colorClasses"
    :type="props.type"
    class="font-medium cursor-pointer inline-flex items-center"
    @click="$emit('click')"
  >
    <loading-spinner v-if="props.loading" />
    <slot />
  </button>
</template>
