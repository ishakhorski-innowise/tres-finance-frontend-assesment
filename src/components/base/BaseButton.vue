<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    type: 'button',
    size: 'md',
  },
)
</script>

<template>
  <button :type="props.type" :class="['base-button', `base-button--${props.size}` + props.type]">
    <slot></slot>
  </button>
</template>

<style>
.base-button {
  @apply inline-flex items-center justify-center;
  @apply rounded-full;
  @apply text-neutral-800 hover:text-neutral-900 active:text-neutral-1100;
  @apply px-2 py-1;
  @apply transition-colors duration-75;
}

.base-button--sm {
  @apply h-6;
  @apply text-sm;
}

.base-button--md {
  @apply h-8;
  @apply text-sm;
}

.base-button--lg {
  @apply h-9;
  @apply text-base;
}
</style>
