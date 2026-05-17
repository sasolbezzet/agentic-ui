import { useState } from 'react';
import { useAgentRegistry } from '@/contracts/useAgentRegistry';
import { useAccount } from 'wagmi';

export default function RegisterAgentForm() {
  const { address } = useAccount();
  const registry = useAgentRegistry(process.env.NEXT_PUBLIC_AGENT_REGISTRY_ADDRESS as `0x${string}`);

  const { data: tokenIdData } = registry.getTokenId(address as `0x${string}`);
  const tokenId = tokenIdData?.toString();

  const [name, setName] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);

  const { write: register, isLoading } = registry.registerAgent(name);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!register) return;
    const { hash } = await register();
    setTxHash(hash);
  };

  if (tokenId && tokenId !== '0') {
    return (
      <div className="p-4 bg-green-50 rounded-md mb-4">
        <p className="font-medium">
          ✅ Agen sudah terdaftar – TokenId: <span className="text-indigo-600">{tokenId}</span>
        </p>
      </div>
    );
  }

  return (
    <section className="p-4 bg-yellow-50 rounded-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Daftar Agen</h2>
      <form onSubmit={submit} className="space-y-2">
        <input
          type="text"
          placeholder="Nama agen (mis. MyWriterBot)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Mendaftar...' : 'Daftar Agen'}
        </button>
      </form>
      {txHash && (
        <p className="mt-2 text-sm">
          Tx sent:{' '}
          <a
            href={`https://testnet.arcscan.app/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {txHash.slice(0, 10)}…
          </a>
        </p>
      )}
    </section>
  );
}
