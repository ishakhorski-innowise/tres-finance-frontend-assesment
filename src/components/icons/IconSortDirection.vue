<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number
  }>(),
  {
    size: 24,
  },
)
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
