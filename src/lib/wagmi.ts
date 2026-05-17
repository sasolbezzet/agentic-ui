import { createConfig, http } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import type { Chain } from 'wagmi';

export const arcTestnet: Chain = {
  id: 5042002,
  name: 'Arc Testnet',
  network: 'arc-testnet',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  // Fallback to testnet RPC if env var missing (GH Actions may not have .env.local)
  rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_ARC_RPC_URL || 'https://rpc.testnet.arc.network'] } },
  blockExplorers: {
    default: {
      name: 'Arc Explorer',
      url: 'https://explorer.testnet.arc.app',
    },
  },
};

export const wagmiConfig = createConfig({
  chains: [arcTestnet],
  transports: { [arcTestnet.id]: http() },
  // Use only MetaMask connector to avoid WalletConnect projectId requirement
  connectors: [metaMask()],
});
