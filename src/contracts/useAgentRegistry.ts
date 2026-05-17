import { useContractRead, useContractWrite } from 'wagmi';
import registryAbi from '../abis/AgentRegistry.json';
import type { Address } from 'viem';

export const useAgentRegistry = (address: Address) => {
  const getTokenId = (agent: Address) =>
    useContractRead({
      address,
      abi: registryAbi,
      functionName: 'getTokenId',
      args: [agent],
    });

  const registerAgent = (name: string) =>
    useContractWrite({
      address,
      abi: registryAbi,
      functionName: 'registerAgent',
      args: [name],
    });

  return { getTokenId, registerAgent };
};
