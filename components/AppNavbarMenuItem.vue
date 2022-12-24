<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  hideRightBorder: {
    type: Boolean,
    default: false,
  },
})

const handleClick = () => {
  if (props.to) return navigateTo(props.to)
  emit('click')
}
</script>

<template>
  <div
    :class="{
      'text-primary': props.to === $route.path,
      'border-r-2': !props.hideRightBorder,
    }"
    class="px-6 hover:text-primary cursor-pointer transition"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
