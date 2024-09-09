import Stopwatch from "./Stopwatch"
export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-svh font-[family-name:var(--font-geist-mono)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Stopwatch />
      </main>
    </div>
  );
}
