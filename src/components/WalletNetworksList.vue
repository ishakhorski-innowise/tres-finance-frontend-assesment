<script setup lang="ts">
import { computed } from 'vue'

import IconNetworkType from '@/components/icons/IconNetworkType.vue'

import type { NetworkType } from '@/models/networkType'

const props = withDefaults(
  defineProps<{
    networks: NetworkType[]
    max?: number
  }>(),
  {
    max: 3,
  },
)

const visibleNetworks = computed(() =>
  props.networks.length > props.max ? props.networks.slice(0, props.max - 1) : props.networks,
)
</script>

<template>
  <div class="wallet-networks">
    <IconNetworkType
      v-for="(network, index) in visibleNetworks"
      :key="index"
      :type="network"
      :size="24"
      class="wallet-networks__item"
    />

    <div
      v-if="props.networks.length > 3"
      class="wallet-networks__item wallet-networks__item--count"
    >
      +{{ props.networks.length - 3 }}
    </div>
  </div>
</template>

<style>
.wallet-networks {
  @apply flex items-center;
}

.wallet-networks__item:not(:first-child) {
  @apply -ml-2;
}

.wallet-networks__item--count {
  @apply flex items-center justify-center;
  @apply w-6 h-6;
  @apply border border-blue-300;
  @apply rounded-full;
  @apply bg-white;
  @apply text-xs;
}
</style>
