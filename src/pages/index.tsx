import Navbar from "@/components/Navbar";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-foreground">Welcome to MyApp</h1>
        <Button variant="primary" size="large">Get Started</Button>
      </main>
    </div>
  );
}
