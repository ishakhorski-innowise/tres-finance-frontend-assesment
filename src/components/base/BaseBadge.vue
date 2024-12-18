<template>
  <span class="base-badge">
    <slot></slot>
  </span>
</template>

<style>
.base-badge {
  @apply inline-block;
  @apply text-xs;
  @apply rounded-[4px];
  @apply px-2 py-1;
}
</style>
