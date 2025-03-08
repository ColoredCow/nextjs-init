"use client";

import Button from "@/components/common/Button";
import Navbar from "@/components/layout/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-foreground">Welcome to MyApp</h1>
        <Button variant="primary" size="large">
          Get Started
        </Button>
      </main>
    </div>
  );
};

export default Home;
