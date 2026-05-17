import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Header() {
  const { address, isConnected } = useAccount();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Agentic Marketplace</h1>
      <div className="flex items-center gap-3">
        {isConnected && (
          <span className="text-sm">
            🟢 {address?.slice(0, 6)}…{address?.slice(-4)}
          </span>
        )}
        <ConnectButton />
      </div>
    </header>
  );
}
