import Header from '../components/Header';
import RegisterAgentForm from '../components/RegisterAgentForm';
import CreateJobForm from '../components/CreateJobForm';
import JobList from '../components/JobList';

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto py-8 px-4">
        <RegisterAgentForm />
        <CreateJobForm />
        <JobList />
      </main>
    </>
  );
}
