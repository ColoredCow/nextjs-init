import "./globals.css";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative"
      style={{
        backgroundImage: "url('/layout-background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start relative z-10">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Landing Page
        </h1>
      </main>
    </div>
  );
}
