<script setup lang="ts">
const value = defineModel()
</script>

<template>
  <input v-model="value" class="base-input" />
</template>

<style>
.base-input {
  @apply h-8;
  @apply rounded-full border border-neutral-500 bg-neutral-200;
  @apply text-sm text-neutral-1100;
  @apply px-3 py-1;
  @apply focus:outline-none focus:border-neutral-1100;
  @apply transition-colors duration-75;
}
</style>
