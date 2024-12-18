<script setup lang="ts">
import BaseTooltip from '@/components/base/BaseTooltip.vue'
import BaseButton from '@/components/base/BaseButton.vue'

import IconCopy from '@/components/icons/IconCopy.vue'

const props = defineProps<{
  content?: string
}>()

const emit = defineEmits<{
  (event: 'copy'): void
}>()

const onCopy = () => {
  emit('copy')
}
</script>

<template>
  <BaseTooltip>
    <slot></slot>

    <template #content>
      <div class="flex items-center gap-2">
        <p class="text-sm">{{ props.content }}</p>

        <span class="w-[1px] h-2 bg-neutral-800"></span>

        <BaseButton size="sm" class="!text-white !p-0 hover:bg-neutral-800 active:bg-neutral-900" @click.stop="onCopy">
          <IconCopy :size="20" aria-hidden="true" />
          <span class="sr-only">copy</span>
        </BaseButton>
      </div>
    </template>
  </BaseTooltip>
</template>
