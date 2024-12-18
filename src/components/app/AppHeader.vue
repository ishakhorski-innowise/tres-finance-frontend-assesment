<template>
  <header class="app-header">
    <h1 class="app-header__title">
      <slot></slot>
    </h1>
  </header>
</template>

<style>
.app-header {
  @apply h-14;
  @apply flex items-center;
  @apply border-b border-blue-300;
  @apply py-3 px-6;
}

.app-header__title {
  @apply text-base font-bold text-neutral-1100;
}
</style>
