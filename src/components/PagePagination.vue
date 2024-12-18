<script setup lang="ts">
import { computed } from 'vue'

import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const props = defineProps<{
  total: number
}>()

const MAX_VISIBLE_PAGES = 6

const page = defineModel<number>('page', { required: true })
const size = defineModel<number>('size', { required: true })

const sizeOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
]

const pagesNumber = computed(() => Math.ceil(props.total / size.value))

const visiblePageNumbers = computed(() => {
  const totalPages = pagesNumber.value
  const currentPage = page.value
  const maxPages = MAX_VISIBLE_PAGES

  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages - 2 }, (_, i) => i + 2)
  }

  const pages = []

  if (currentPage > Math.floor(maxPages / 2) + 1) {
    pages.push('...')
  }

  const startPage = Math.max(2, currentPage - Math.floor((maxPages - 4) / 2))
  const endPage = Math.min(totalPages - 1, startPage + maxPages - 4)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (currentPage < totalPages - Math.floor(maxPages / 2)) {
    pages.push('...')
  }

  return pages
})

const isFirstPage = computed(() => page.value === 1)
const isLastPage = computed(() => page.value === pagesNumber.value)

const onSetPage = (newPage: number) => {
  if (newPage < 1 || newPage > pagesNumber.value) return
  page.value = newPage
}

const onNextPage = () => {
  onSetPage(page.value + 1)
}

const onPrevPage = () => {
  onSetPage(page.value - 1)
}
</script>

<template>
  <div class="page-pagination">
    <span class="flex items-center gap-2 text-sm text-neutral-800">
      View
      <BaseSelect v-model="size" :options="sizeOptions" option-value="value" option-label="label" />
      per page
    </span>

    <span class="text-sm text-neutral-800 ml-auto">
      Showing {{ total > size ? `${size * page - size + 1}-${size * page}` : total }} out of
      {{ total }} results
    </span>

    <div class="page-pagination__actions">
      <BaseButton :disabled="isFirstPage" @click="onPrevPage">
        <IconArrowRight :size="16" class="rotate-180" />
        <span class="sr-only">Previous page</span>
      </BaseButton>

      <BaseButton
        class="page-pagination__button"
        :class="{ 'page-pagination__button--active': page === 1 }"
        @click="onSetPage(1)"
      >
        1
      </BaseButton>

      <div v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
        <span v-if="typeof pageNumber === 'string'" class="text-neutral-800">...</span>
        <BaseButton
          v-else
          :key="pageNumber"
          class="page-pagination__button"
          :class="{ 'page-pagination__button--active': page === pageNumber }"
          @click="onSetPage(pageNumber)"
        >
          {{ pageNumber }}
        </BaseButton>
      </div>

      <BaseButton
        class="page-pagination__button"
        :class="{ 'page-pagination__button--active': page === pagesNumber }"
        @click="onSetPage(pagesNumber)"
      >
        {{ pagesNumber }}
      </BaseButton>

      <BaseButton :disabled="isLastPage" @click="onNextPage">
        <IconArrowRight :size="16" />
        <span class="sr-only">Next page</span>
      </BaseButton>
    </div>
  </div>
</template>

<style>
.page-pagination {
  @apply flex items-center gap-4;
}

.page-pagination__actions {
  @apply flex items-center gap-0.5;
}

.page-pagination__button {
  @apply text-sm px-1.5;
}

.page-pagination__button--active {
  @apply font-medium text-gray-950;
}
</style>
