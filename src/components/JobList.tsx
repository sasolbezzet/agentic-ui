import { useEffect, useState } from 'react';
import { useJobContract } from '../contracts/useJobContract';
import { ethers } from 'ethers';

type Job = {
  jobId: bigint;
  employer: `0x${string}`;
  worker: `0x${string}`;
  payment: bigint;
};

export default function JobList() {
  const job = useJobContract(process.env.NEXT_PUBLIC_JOB_CONTRACT_ADDRESS as `0x${string}`);
  const [jobs, setJobs] = useState<Job[]>([]);

  const { data: events } = job.jobCreated;

  useEffect(() => {
    if (!events) return;
    const newJobs = events.map((e: typeof events[number]) => ({
      jobId: e.args?.jobId,
      employer: e.args?.employer,
      worker: e.args?.worker,
      payment: e.args?.payment,
    }));
    setJobs((prev) => [...prev, ...newJobs]);
  }, [events]);

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Jobs Terbaru</h2>
      {jobs.length === 0 && <p className="text-gray-500">Belum ada job.</p>}
      <ul className="space-y-2">
        {jobs.map((j) => (
          <li key={j.jobId.toString()} className="p-3 border rounded bg-white">
            <p>
              <strong>Job #{j.jobId.toString()}</strong> –{' '}
              {ethers.formatUnits(j.payment, 6)} USDC
            </p>
            <p>
              Employer: {j.employer.slice(0, 6)}…{j.employer.slice(-4)}<br />
              Worker: {j.worker.slice(0, 6)}…{j.worker.slice(-4)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
