import walletsData from '@/api/wallets.json'

import type { Wallet } from '@/models/wallet'

export enum WalletsOrderOption {
  CreatedAt = 'createAt',
  Name = 'name',
  Balance = 'totalUsdValue',
}

const useMockWallets = () => {
  const wallets: Wallet[] = walletsData as Wallet[]

  const FIELD_COMPARE_MAP = {
    [WalletsOrderOption.CreatedAt]: (a: Wallet, b: Wallet) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    [WalletsOrderOption.Name]: (a: Wallet, b: Wallet) => a.name.localeCompare(b.name),
    [WalletsOrderOption.Balance]: (a: Wallet, b: Wallet) => a.totalUsdValue - b.totalUsdValue,
  }

  const getWallets = (
    take: number,
    skip: number,
    options: {
      orderBy?: WalletsOrderOption
      orderByDesc?: boolean
      search?: string
    } = {},
  ): Promise<{ data: Wallet[]; total: number }> => {
    const { orderBy = WalletsOrderOption.CreatedAt, orderByDesc = true, search = '' } = options

    const filteredWallets = search
      ? wallets.filter((wallet) => wallet.name.toLowerCase().includes(search.toLowerCase()))
      : wallets

    const sortedWallets = filteredWallets.sort((a, b) => {
      const compareFn = FIELD_COMPARE_MAP[orderBy]
      return compareFn(a, b) * (orderByDesc ? -1 : 1)
    })

    return Promise.resolve({
      data: sortedWallets.slice(skip, skip + take),
      total: sortedWallets.length,
    })
  }

  return {
    getWallets,
  }
}

export default useMockWallets
