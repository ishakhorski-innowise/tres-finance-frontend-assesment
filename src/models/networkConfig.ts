import { NetworkType } from './networkType'

import IconBinance from '@/assets/images/binance.png'
import IconBitcoin from '@/assets/images/bitcoin.png'
import IconEthereum from '@/assets/images/ethereum.png'
import IconSolana from '@/assets/images/solana.png'
import IconAvalanche from '@/assets/images/avalanche.webp'
import IconCardano from '@/assets/images/cardano.png'

interface NetworkConfig {
  name: string
  icon: string
}

const NETWORK_CONFIG: Record<NetworkType, NetworkConfig> = {
  [NetworkType.Binance]: {
    name: 'Binance',
    icon: IconBinance,
  },
  [NetworkType.Bitcoin]: {
    name: 'Bitcoin',
    icon: IconBitcoin,
  },
  [NetworkType.Ethereum]: {
    name: 'Ethereum',
    icon: IconEthereum,
  },
  [NetworkType.Solana]: {
    name: 'Solana',
    icon: IconSolana,
  },
  [NetworkType.Avalanche]: {
    name: 'Avalanche',
    icon: IconAvalanche,
  },
  [NetworkType.Cardano]: {
    name: 'Cardano',
    icon: IconCardano,
  },
}

export { NETWORK_CONFIG }
export type { NetworkConfig }
