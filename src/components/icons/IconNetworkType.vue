<script setup lang="ts">
import { computed } from 'vue'

import { NETWORK_CONFIG } from '@/models/networkConfig'
import type { NetworkType } from '@/models/networkType'

const props = withDefaults(
  defineProps<{
    type: NetworkType
    size?: number
  }>(),
  {
    size: 24,
  },
)

const iconUrl = computed<string>(() => NETWORK_CONFIG[props.type]?.icon || '')
</script>

<template>
  <img :src="iconUrl" alt="" :width="props.size" :height="props.size" />
</template>
