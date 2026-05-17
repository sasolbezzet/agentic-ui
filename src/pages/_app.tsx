import '@/styles/globals.css';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { wagmiConfig } from '@/lib/wagmi';

export default function App({ Component, pageProps }: any) {
  const { connectors } = getDefaultWallets({
    appName: 'Agentic Marketplace',
    chains: wagmiConfig.chains,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={wagmiConfig.chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
