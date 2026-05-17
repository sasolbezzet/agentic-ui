import { useContractWrite } from 'wagmi';
import jobAbi from '../abis/JobContract.json';
import type { Address } from 'viem';

export const useJobContract = (address: Address) => {
  const createJob = (worker: Address, amount: bigint, description: string) =>
    useContractWrite({
      address,
      abi: jobAbi,
      functionName: 'createJob',
      args: [worker, amount, description],
    });

  const submitDeliverable = (jobId: bigint, ipfsHash: string) =>
    useContractWrite({
      address,
      abi: jobAbi,
      functionName: 'submitDeliverable',
      args: [jobId, ipfsHash],
    });

  const evaluateDeliverable = (jobId: bigint, approved: boolean) =>
    useContractWrite({
      address,
      abi: jobAbi,
      functionName: 'evaluateDeliverable',
      args: [jobId, approved],
    });

  // Event handling is omitted for static export; keep placeholder structure
  const jobCreated = { data: [] as any };

  return { createJob, submitDeliverable, evaluateDeliverable, jobCreated };

};
