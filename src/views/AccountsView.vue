<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'

import useMockWallets, { WalletsOrderOption } from '@/composables/useMockWallets'

import debounce from '@/utils/debounce'
import formatPlural from '@/utils/formatPlural'

import AppHeader from '@/components/app/AppHeader.vue'
import AppContainer from '@/components/app/AppContainer.vue'

import WalletCard from '@/components/WalletCard.vue'
import PagePagination from '@/components/PagePagination.vue'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconSortDirection from '@/components/icons/IconSortDirection.vue'

import type { Wallet } from '@/models/wallet'

const wallets = ref<Wallet[]>([])
const walletsTotal = ref(0)

const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useLocalStorage('wallets-list-size', 10, {
  serializer: { read: Number, write: String },
})

const search = ref<string>('')

const orderBy = ref<WalletsOrderOption>(WalletsOrderOption.CreatedAt)
const orderByDesc = ref<boolean>(true)
const orderByOptions: { value: WalletsOrderOption; label: string }[] = [
  { value: WalletsOrderOption.CreatedAt, label: 'Created' },
  { value: WalletsOrderOption.Name, label: 'Name' },
  { value: WalletsOrderOption.Balance, label: 'Balance' },
]

const onToggleSortDirection = () => {
  orderByDesc.value = !orderByDesc.value
}

const expandedWallets = reactive<{ [key: string]: boolean }>({})
const isAllExpanded = ref(false)
const onToggleWalletExpand = (walletId: string) => {
  if (expandedWallets[walletId]) {
    delete expandedWallets[walletId]
  } else {
    expandedWallets[walletId] = true
  }
}
const onToggleExpandAll = () => {
  if (isAllExpanded.value) {
    for (const wallet of wallets.value) {
      delete expandedWallets[wallet.id]
    }
  } else {
    for (const wallet of wallets.value) {
      expandedWallets[wallet.id] = true
    }
  }

  isAllExpanded.value = !isAllExpanded.value
}

const { getWallets } = useMockWallets()
const onFetchWallets = async () => {
  try {
    const { data, total } = await getWallets(pageSize.value, pageSize.value * (page.value - 1), {
      orderBy: orderBy.value,
      orderByDesc: orderByDesc.value,
      search: search.value,
    })

    wallets.value = data
    walletsTotal.value = total
  } catch (error) {
    console.error(error)
  }
}
const debouncedFetchWallets = debounce(onFetchWallets, 0)

watch([page, orderBy, orderByDesc], debouncedFetchWallets)
watch([pageSize, search], () => {
  page.value = 1
  debouncedFetchWallets()
})

onFetchWallets()
</script>

<template>
  <AppHeader> Accounts </AppHeader>

  <AppContainer>
    <div class="flex items-center justify-between gap-2 mb-4">
      <BaseInput v-model="search" placeholder="Search for wallets..." class="mr-auto" />

      <BaseSelect
        v-model="orderBy"
        id="order-by"
        :options="orderByOptions"
        option-value="value"
        option-label="label"
      />

      <BaseButton @click="onToggleSortDirection">
        <IconSortDirection
          :size="24"
          :class="{ 'rotate-180': orderByDesc }"
          class="transition-transform duration-75"
        />
        <span class="sr-only">Toggle sort direction</span>
      </BaseButton>
    </div>

    <div class="flex items-center justify-between mb-4">
      <BaseButton @click="onToggleExpandAll">
        <IconArrowRight
          :size="24"
          :class="{ 'transform rotate-90': isAllExpanded }"
          class="transition-transform duration-200 mr-1"
        />

        {{ isAllExpanded ? 'Collapse all' : 'Expand all' }}
      </BaseButton>

      <span class="text-xs text-neutral-800">
        {{ walletsTotal }} {{ formatPlural(walletsTotal, 'Wallet', 'Wallets') }}
      </span>
    </div>

    <div class="flex flex-col gap-2">
      <WalletCard
        v-for="wallet in wallets"
        :key="wallet.id"
        :wallet="wallet"
        :expanded="expandedWallets[wallet.id]"
        @update:expanded="onToggleWalletExpand"
      />
    </div>

    <PagePagination
      v-model:page="page"
      v-model:size="pageSize"
      :total="walletsTotal"
      class="mt-8"
    />
  </AppContainer>
</template>
