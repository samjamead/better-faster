import RealityCheck from "@/components/reality-check/reality-check";

export default async function Home() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Reality Check</h2>

      <RealityCheck />
    </div>
  );
}
