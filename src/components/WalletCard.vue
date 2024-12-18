<script setup lang="ts">
import { computed } from 'vue'

import WalletAssetsTable from '@/components/WalletAssetsTable.vue'
import WalletNetworksList from '@/components/WalletNetworksList.vue'

import CopyTooltip from '@/components/CopyTooltip.vue'

import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseTooltip from '@/components/base/BaseTooltip.vue'
import IconHash from '@/components/icons/IconHash.vue'

import formatMoney from '@/utils/formatMoney'
import formatDate from '@/utils/formatDate'
import formatPlural from '@/utils/formatPlural'
import copyToClipboard from '@/utils/copyToClipboard'

import type { Wallet } from '@/models/wallet'
import type { WalletAsset } from '@/models/walletAsset'

const props = withDefaults(
  defineProps<{
    wallet: Wallet
    expanded?: boolean
  }>(),
  {
    expanded: false,
  },
)

const emit = defineEmits<{
  (event: 'update:expanded', walletId: string): void
}>()

const displayWalletName = computed(() => props.wallet.name)
const displayWalletAddress = computed(
  () => `${props.wallet.identifier.slice(0, 6)}...${props.wallet.identifier.slice(-6)}`,
)
const displayWalletCreatedAt = computed(() => formatDate(props.wallet.createdAt))

const walletAssets = computed<WalletAsset[]>(() => props.wallet.assets)
const walletNetworks = computed(() => props.wallet.assets.map((asset) => asset.asset.network))

const onToggleExpand = () => {
  emit('update:expanded', props.wallet.id)
}
</script>

<template>
  <div class="wallet-card">
    <div class="wallet-card__header" @click="onToggleExpand">
      <div class="flex items-center gap-3 pb-4">
        <WalletNetworksList :networks="walletNetworks" />

        <div class="flex flex-col">
          <button type="button" class="w-max" @click.stop="onToggleExpand">
            <h2 class="text-lg font-bold text-neutral-1100">
              {{ displayWalletName }}
            </h2>
          </button>
          <CopyTooltip
            :content="props.wallet.identifier"
            @copy="copyToClipboard(props.wallet.identifier)"
          >
            <span class="inline-flex items-center text-sm text-neutral-700">
              <IconHash :size="12" class="mr-1" />
              {{ displayWalletAddress }}
            </span>
          </CopyTooltip>
        </div>

        <BaseTooltip
          :content="`${formatMoney(props.wallet.totalUsdValue, 10)} USD`"
          class="ml-auto"
        >
          <p class="text-lg font-bold text-neutral-1100">
            {{ `${formatMoney(props.wallet.totalUsdValue)} USD` }}
          </p>
        </BaseTooltip>
      </div>

      <div class="flex items-center gap-3 border-t border-blue-300 pt-4">
        <span class="text-sm text-neutral-1100">Added: {{ displayWalletCreatedAt }}</span>

        <span class="w-[1px] h-5 bg-blue-300"></span>

        <BaseBadge class="bg-neutral-400">
          {{ walletAssets.length }} {{ formatPlural(walletAssets.length, 'asset', 'assets') }}
        </BaseBadge>
      </div>
    </div>

    <Transition name="slide-y">
      <div v-if="props.expanded" class="wallet-card__content">
        <WalletAssetsTable :assets="walletAssets" class="min-w-[800px]" />
      </div>
    </Transition>
  </div>
</template>

<style>
.wallet-card {
  @apply border border-blue-100;
  @apply rounded-[4px];
  @apply bg-white;
}

.wallet-card__header {
  @apply p-4;
  @apply cursor-pointer;
}

.wallet-card__header h3 {
  @apply text-lg font-medium;
}

.wallet-card__content {
  @apply overflow-x-auto;
}

.slide-y-enter-active,
.slide-y-leave-active {
  @apply overflow-y-hidden;
  @apply transition-[max-height] duration-300 ease-in-out;
}
.slide-y-enter-from,
.slide-y-leave-to {
  @apply max-h-0;
}
.slide-y-enter-to,
.slide-y-leave-from {
  @apply max-h-[100rem];
}
</style>
