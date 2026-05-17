import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useContractWrite } from 'wagmi';
import jobAbi from '../abis/JobContract.json';

export default function CreateJobForm() {
  const { address } = useAccount();

  const [worker, setWorker] = useState('');
  const [amount, setAmount] = useState('0');
  const [desc, setDesc] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);

  const { write, isLoading } = useContractWrite({
    address: process.env.NEXT_PUBLIC_JOB_CONTRACT_ADDRESS as `0x${string}`,
    abi: jobAbi as any,
    functionName: 'createJob',
    args: [worker as `0x${string}`, ethers.parseUnits(amount || '0', 6), desc],
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!write) return;
    const { hash } = await write();
    setTxHash(hash);
    setWorker('');
    setAmount('0');
    setDesc('');
  };

  return (
    <section className="p-4 bg-gray-50 rounded-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Buat Job Baru</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          placeholder="Alamat worker (0x…)"
          value={worker}
          onChange={(e) => setWorker(e.target.value)}
          className="input"
          required
        />
        <input
          type="number"
          placeholder="USDC amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          min="0"
          required
        />
        <textarea
          placeholder="Deskripsi singkat"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="input"
          rows={3}
          required
        />
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Mengirim...' : 'Buat Job'}
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
