<script setup lang="ts" generic="T extends Object">
const props = defineProps<{
  options: T[]
  optionLabel: keyof T
  optionValue: keyof T
}>()

const selected = defineModel<unknown>({ required: true })

const onSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  selected.value = target.value
}
</script>

<template>
  <select :value="selected" class="base-select" @change="onSelect">
    <option
      v-for="option in props.options"
      :key="`option-${option[props.optionValue]}`"
      :value="option[props.optionValue]"
      class="base-select__option"
    >
      {{ option[props.optionLabel] }}
    </option>
  </select>
</template>

<style>
.base-select {
  @apply h-8;
  @apply rounded-[4px] border border-neutral-500 bg-neutral-200;
  @apply text-sm text-neutral-1100;
  @apply px-3 py-1;
  @apply focus:outline-none focus:border-neutral-1100;
  @apply transition-colors duration-75;
}

.base-select__option {
  @apply px-2 py-1;
}
</style>
