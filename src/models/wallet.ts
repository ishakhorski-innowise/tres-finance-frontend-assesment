import type { WalletAsset } from './walletAsset'

interface Wallet {
  id: string
  identifier: string
  name: string
  createdAt: string
  totalUsdValue: number
  assets: WalletAsset[]
}

export type { Wallet }
