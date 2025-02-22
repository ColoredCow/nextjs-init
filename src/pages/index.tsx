import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Next js Boilerplate</h1>
      </main>
    </div>
  );
}
