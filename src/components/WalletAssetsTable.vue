<script setup lang="ts">
import { computed } from 'vue'

import formatPlural from '@/utils/formatPlural'
import formatMoney from '@/utils/formatMoney'

import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseTooltip from '@/components/base/BaseTooltip.vue'
import IconNetworkType from '@/components/icons/IconNetworkType.vue'
import IconUSD from '@/components/icons/IconUSD.vue'

import type { WalletAsset } from '@/models/walletAsset'
import { NETWORK_CONFIG } from '@/models/networkConfig'

const props = defineProps<{
  assets: WalletAsset[]
}>()

const assetsTotalUsdValue = computed(() =>
  props.assets.reduce((acc, asset) => acc + (asset.assetUsdValue?.value || 0), 0),
)
</script>

<template>
  <table class="wallet-assets-table">
    <thead>
      <tr>
        <th>ASSET</th>
        <th>NETWORK</th>
        <th>CURRENT BALANCE</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="asset in props.assets" :key="asset.id">
        <td class="content-center">
          <div class="flex items-center gap-1 text-base font-bold text-neutral-1100">
            <IconNetworkType :type="asset.asset.network" :size="16" class="inline mr-1 mt-0.5" />
            <span class="break-all">{{ asset.name }}</span>
          </div>
        </td>

        <td class="content-center">
          <div class="flex items-center gap-1 text-base font-bold text-neutral-1100">
            <IconNetworkType :type="asset.asset.network" :size="16" class="inline mr-1 mt-0.5" />
            {{ NETWORK_CONFIG[asset.asset.network]?.name || asset.asset.network }}
          </div>
        </td>

        <td>
          <div class="flex flex-col gap-1">
            <BaseTooltip :content="`${formatMoney(asset.assetAmount, 10)} ${asset.asset.symbol}`">
              <span class="text-sm text-neutral-1100">{{
                `${formatMoney(asset.assetAmount)} ${asset.asset.symbol}`
              }}</span>
            </BaseTooltip>

            <BaseTooltip
              v-if="asset.assetUsdValue"
              :content="`${formatMoney(asset.assetUsdValue.value, 10)} USD`"
            >
              <span class="flex items-center text-sm text-neutral-700">
                <IconUSD :size="16" aria-hidden="true" class="mr-0.5" />
                {{ `${formatMoney(asset.assetUsdValue.value)} USD` }}
              </span>
            </BaseTooltip>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="flex items-center gap-2 py-2">
            <span class="font-medium">
              {{ props.assets.length }} {{ formatPlural(props.assets.length, 'asset', 'assets') }}
            </span>
            <BaseBadge class="bg-blue-50"> Summary </BaseBadge>
          </div>
        </td>

        <td>
          <div class="flex flex-wrap gap-0.5">
            <BaseTooltip
              v-for="asset in props.assets"
              :key="asset.id"
              :content="NETWORK_CONFIG[asset.asset.network]?.name || asset.asset.network"
            >
              <IconNetworkType :type="asset.asset.network" :size="16" class="inline mr-1" />
            </BaseTooltip>
          </div>
        </td>

        <td class="content-center">
          <BaseTooltip :content="`${formatMoney(assetsTotalUsdValue, 10)} USD`">
            <span class="flex items-center leading-4">
              <IconUSD :size="16" aria-hidden="true" class="inline mr-1 mt-0.5" />
              {{ `${formatMoney(assetsTotalUsdValue)} USD` }}
            </span>
          </BaseTooltip>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.wallet-assets-table {
  @apply w-full;
  @apply text-left;
  @apply border-t border-blue-100;
}

.wallet-assets-table th,
.wallet-assets-table td {
  @apply w-1/3;
  @apply px-4 py-2;
}

.wallet-assets-table th {
  @apply text-sm text-neutral-700;
}

.wallet-assets-table td {
  @apply border-t border-blue-100;
}
.wallet-assets-table td:not(:last-child),
.wallet-assets-table th:not(:last-child) {
  @apply border-r border-blue-100;
}
</style>
